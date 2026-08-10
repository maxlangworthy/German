import {
  mkdir,
  rm,
  stat,
  copyFile,
  rename,
} from "node:fs/promises";

import {
  createReadStream,
} from "node:fs";

import {
  dirname,
  resolve,
} from "node:path";

import {
  Readable,
} from "node:stream";

import {
  createGunzip,
} from "node:zlib";

import readline
  from "node:readline";

import {
  DatabaseSync,
} from "node:sqlite";

import {
  LANGUAGES,
  getLanguage,
} from "./languages.js";


// ---------------------------------------------------------
// BUILD SETTINGS
// ---------------------------------------------------------

const REQUESTED_LANGUAGE =
  process.env.DICTIONARY_LANGUAGE ||
  "all";


const SOURCE_URL_OVERRIDE =
  process.env.DICTIONARY_SOURCE_URL ||
  null;


const SOURCE_FILE_OVERRIDE =
  process.env.DICTIONARY_SOURCE_FILE ||
  null;


const OUTPUT_PATH_OVERRIDE =
  process.env.DICTIONARY_OUTPUT_PATH ||
  null;


/*
  Render preserves XDG_CACHE_HOME
  between builds.

  We store our finished SQLite
  dictionaries there.

  If we ever change the database format
  significantly, we can change v1 to v2
  and Render will rebuild them.
*/

const CACHE_VERSION =
  process.env.DICTIONARY_CACHE_VERSION ||
  "v1";


const CACHE_ROOT =
  process.env.XDG_CACHE_HOME
    ? resolve(
        process.env.XDG_CACHE_HOME,
        "language-learning-dictionaries",
        CACHE_VERSION
      )
    : resolve(
        ".dictionary-cache",
        CACHE_VERSION
      );


/*
  Set REBUILD_DICTIONARIES=1 in Render
  only if we deliberately want to ignore
  the cache and rebuild every dictionary.
*/

const FORCE_REBUILD =
  process.env.REBUILD_DICTIONARIES ===
  "1";


const MAX_MEANINGS =
  3;


const MAX_MEANING_LENGTH =
  240;


const COMMIT_EVERY =
  25000;


const NON_WORD_POS =
  new Set([
    "character",
    "circumfix",
    "infix",
    "interfix",
    "prefix",
    "punct",
    "punctuation",
    "suffix",
    "symbol",
  ]);


// ---------------------------------------------------------
// NORMALISATION
// ---------------------------------------------------------

function normalizeWord(
  value,
  locale
) {
  return value
    .normalize("NFC")
    .toLocaleLowerCase(
      locale
    );
}


function cleanText(
  value
) {
  return String(
    value
  )
    .replace(
      /\s+/g,
      " "
    )
    .trim()
    .slice(
      0,
      MAX_MEANING_LENGTH
    );
}


function uniqueStrings(
  values
) {
  return [
    ...new Set(
      values.filter(
        Boolean
      )
    ),
  ];
}


// ---------------------------------------------------------
// REDUCE ONE WIKTIONARY ENTRY
// ---------------------------------------------------------

function extractLeanEntry(
  entry,
  language
) {
  if (
    !entry ||
    entry.lang_code !==
      language.wiktionaryLanguageCode ||
    typeof entry.word !==
      "string"
  ) {
    return null;
  }


  const word =
    entry.word
      .normalize("NFC")
      .trim();


  if (
    !word ||
    /\s/u.test(
      word
    ) ||
    word.length > 80
  ) {
    return null;
  }


  const pos =
    typeof entry.pos ===
      "string"
      ? entry.pos
      : "unknown";


  if (
    NON_WORD_POS.has(
      pos
    )
  ) {
    return null;
  }


  const meanings =
    [];


  const lemmas =
    [];


  const grammarTags =
    [];


  for (
    const sense
    of Array.isArray(
      entry.senses
    )
      ? entry.senses
      : []
  ) {
    const formOf =
      Array.isArray(
        sense?.form_of
      )
        ? sense.form_of
        : [];


    const isFormSense =
      formOf.length > 0 ||
      sense?.tags?.includes(
        "form-of"
      );


    if (
      isFormSense
    ) {
      for (
        const relation
        of formOf
      ) {
        if (
          typeof relation?.word ===
            "string" &&
          relation.word.trim()
        ) {
          lemmas.push(
            relation.word
              .normalize("NFC")
              .trim()
          );
        }
      }


      for (
        const tag
        of Array.isArray(
          sense?.tags
        )
          ? sense.tags
          : []
      ) {
        if (
          tag !==
            "form-of" &&
          typeof tag ===
            "string"
        ) {
          grammarTags.push(
            tag
          );
        }
      }


      continue;
    }


    if (
      Array.isArray(
        sense?.glosses
      ) &&
      sense.glosses.length >
        0
    ) {
      const gloss =
        cleanText(
          sense.glosses[
            sense.glosses.length -
            1
          ]
        );


      if (
        gloss
      ) {
        meanings.push(
          gloss
        );
      }
    }
  }


  const uniqueMeanings =
    uniqueStrings(
      meanings
    ).slice(
      0,
      MAX_MEANINGS
    );


  const uniqueLemmas =
    uniqueStrings(
      lemmas
    ).slice(
      0,
      4
    );


  const uniqueGrammarTags =
    uniqueStrings(
      grammarTags
    ).slice(
      0,
      16
    );


  if (
    uniqueMeanings.length ===
      0 &&
    uniqueLemmas.length ===
      0
  ) {
    return null;
  }


  return {
    word,

    normalized:
      normalizeWord(
        word,
        language.locale
      ),

    pos,

    meanings:
      uniqueMeanings,

    lemmas:
      uniqueLemmas,

    grammar:
      uniqueGrammarTags,
  };
}


// ---------------------------------------------------------
// EXPAND INFLECTED FORMS
// ---------------------------------------------------------

function extractInflectedForms(
  rawEntry,
  lemmaEntry,
  language
) {
  if (
    !lemmaEntry ||
    lemmaEntry.meanings.length ===
      0 ||
    !Array.isArray(
      rawEntry?.forms
    )
  ) {
    return [];
  }


  const results =
    [];


  const seen =
    new Set();


  for (
    const formEntry
    of rawEntry.forms
  ) {
    if (
      typeof formEntry?.form !==
        "string"
    ) {
      continue;
    }


    const form =
      formEntry.form
        .normalize("NFC")
        .trim();


    if (
      !form ||
      form === "-" ||
      form ===
        lemmaEntry.word ||
      /\s/u.test(
        form
      ) ||
      form.length > 80
    ) {
      continue;
    }


    const grammar =
      uniqueStrings(
        (
          Array.isArray(
            formEntry.tags
          )
            ? formEntry.tags
            : []
        ).filter(
          (tag) =>
            typeof tag ===
            "string"
        )
      ).slice(
        0,
        16
      );


    const key =
      `${normalizeWord(
        form,
        language.locale
      )}|${grammar.join("|")}`;


    if (
      seen.has(
        key
      )
    ) {
      continue;
    }


    seen.add(
      key
    );


    results.push({
      word:
        form,

      normalized:
        normalizeWord(
          form,
          language.locale
        ),

      pos:
        lemmaEntry.pos,

      meanings:
        [],

      lemmas: [
        lemmaEntry.word
      ],

      grammar,
    });
  }


  return results;
}


// ---------------------------------------------------------
// WHICH LANGUAGES SHOULD WE BUILD?
// ---------------------------------------------------------

function resolveBuildTargets() {
  if (
    REQUESTED_LANGUAGE ===
      "all"
  ) {
    if (
      SOURCE_URL_OVERRIDE ||
      SOURCE_FILE_OVERRIDE ||
      OUTPUT_PATH_OVERRIDE
    ) {
      throw new Error(
        "Dictionary source/output overrides can only be used when DICTIONARY_LANGUAGE names one specific language."
      );
    }


    return Object.values(
      LANGUAGES
    );
  }


  const language =
    getLanguage(
      REQUESTED_LANGUAGE
    );


  if (
    !language
  ) {
    throw new Error(
      `Unknown DICTIONARY_LANGUAGE '${REQUESTED_LANGUAGE}'. Supported: ${Object.keys(
        LANGUAGES
      ).join(", ")}, all.`
    );
  }


  return [
    language
  ];
}


// ---------------------------------------------------------
// GET KAIKKI SOURCE STREAM
//
// Supports both:
//
// .jsonl
// .jsonl.gz
// ---------------------------------------------------------

async function getSourceStream(
  language
) {
  if (
    SOURCE_FILE_OVERRIDE
  ) {
    console.log(
      `Reading ${language.name} dictionary source from ${SOURCE_FILE_OVERRIDE}`
    );


    const fileStream =
      createReadStream(
        SOURCE_FILE_OVERRIDE
      );


    const isCompressed =
      SOURCE_FILE_OVERRIDE
        .toLowerCase()
        .endsWith(
          ".gz"
        );


    return {
      stream:
        isCompressed
          ? fileStream.pipe(
              createGunzip()
            )
          : fileStream,

      metadata: {
        source:
          SOURCE_FILE_OVERRIDE,

        etag:
          "",

        lastModified:
          "",
      },
    };
  }


  const sourceUrl =
    SOURCE_URL_OVERRIDE ||
    language
      .dictionary
      .sourceUrl;


  console.log(
    `Downloading current ${language.name} dictionary data from ${sourceUrl}`
  );


  const response =
    await fetch(
      sourceUrl,
      {
        headers: {
          "User-Agent":
            "AI-Language-Learning-MVP/1.0 (dictionary build)",
        },
      }
    );


  if (
    !response.ok ||
    !response.body
  ) {
    throw new Error(
      `${language.name} dictionary download failed with HTTP ${response.status}`
    );
  }


  const downloadedStream =
    Readable.fromWeb(
      response.body
    );


  const isCompressed =
    language
      .dictionary
      .compressed ===
        true ||
    sourceUrl
      .toLowerCase()
      .endsWith(
        ".gz"
      );


  return {
    stream:
      isCompressed
        ? downloadedStream.pipe(
            createGunzip()
          )
        : downloadedStream,

    metadata: {
      source:
        sourceUrl,

      etag:
        response.headers.get(
          "etag"
        ) || "",

      lastModified:
        response.headers.get(
          "last-modified"
        ) || "",
    },
  };
}


// ---------------------------------------------------------
// CHECK A CACHED SQLITE DICTIONARY
// ---------------------------------------------------------

async function cachedDictionaryIsValid(
  cachePath,
  language
) {
  try {
    const fileStats =
      await stat(
        cachePath
      );


    if (
      fileStats.size <
      10000
    ) {
      return false;
    }


    const db =
      new DatabaseSync(
        cachePath,
        {
          readOnly:
            true,
        }
      );


    const statement =
      db.prepare(`
        SELECT value
        FROM metadata
        WHERE key = 'language_id'
        LIMIT 1
      `);


    const row =
      statement.get();


    db.close();


    return (
      row?.value ===
      language.id
    );

  } catch {
    return false;
  }
}


// ---------------------------------------------------------
// BUILD ONE SQLITE DATABASE
// ---------------------------------------------------------

async function buildDictionary(
  language,
  outputPath
) {
  await mkdir(
    dirname(
      outputPath
    ),
    {
      recursive:
        true,
    }
  );


  await rm(
    outputPath,
    {
      force:
        true,
    }
  );


  await rm(
    `${outputPath}-shm`,
    {
      force:
        true,
    }
  );


  await rm(
    `${outputPath}-wal`,
    {
      force:
        true,
    }
  );


  const db =
    new DatabaseSync(
      outputPath
    );


  db.exec(`
    PRAGMA journal_mode = OFF;
    PRAGMA synchronous = OFF;
    PRAGMA temp_store = MEMORY;

    CREATE TABLE lexicon (
      id INTEGER PRIMARY KEY,
      word TEXT NOT NULL,
      normalized TEXT NOT NULL,
      pos TEXT NOT NULL,
      meanings TEXT,
      lemmas TEXT,
      grammar TEXT
    ) STRICT;

    CREATE TABLE metadata (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    ) STRICT;
  `);


  const insertLexicon =
    db.prepare(`
      INSERT INTO lexicon (
        word,
        normalized,
        pos,
        meanings,
        lemmas,
        grammar
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `);


  const insertMetadata =
    db.prepare(`
      INSERT OR REPLACE
      INTO metadata (
        key,
        value
      )
      VALUES (?, ?)
    `);


  const {
    stream:
      source,

    metadata,
  } =
    await getSourceStream(
      language
    );


  const lines =
    readline.createInterface({
      input:
        source,

      crlfDelay:
        Infinity,
    });


  let sourceLines =
    0;


  let keptEntries =
    0;


  let generatedInflectedForms =
    0;


  let skippedEntries =
    0;


  let transactionCount =
    0;


  db.exec(
    "BEGIN"
  );


  try {
    for await (
      const line
      of lines
    ) {
      sourceLines +=
        1;


      if (
        !line.trim()
      ) {
        continue;
      }


      let rawEntry;


      try {
        rawEntry =
          JSON.parse(
            line
          );

      } catch {
        skippedEntries +=
          1;

        continue;
      }


      const entry =
        extractLeanEntry(
          rawEntry,
          language
        );


      if (
        !entry
      ) {
        skippedEntries +=
          1;

        continue;
      }


      const entriesToInsert = [
        entry,

        ...extractInflectedForms(
          rawEntry,
          entry,
          language
        ),
      ];


      for (
        const item
        of entriesToInsert
      ) {
        insertLexicon.run(
          item.word,

          item.normalized,

          item.pos,

          item.meanings.length
            ? JSON.stringify(
                item.meanings
              )
            : null,

          item.lemmas.length
            ? JSON.stringify(
                item.lemmas
              )
            : null,

          item.grammar.length
            ? JSON.stringify(
                item.grammar
              )
            : null
        );


        keptEntries +=
          1;


        transactionCount +=
          1;


        if (
          item !==
          entry
        ) {
          generatedInflectedForms +=
            1;
        }


        if (
          transactionCount >=
          COMMIT_EVERY
        ) {
          db.exec(
            "COMMIT; BEGIN"
          );


          transactionCount =
            0;


          console.log(
            `${language.name}: indexed ${keptEntries.toLocaleString()} entries...`
          );
        }
      }
    }


    db.exec(
      "COMMIT"
    );


    console.log(
      `${language.name}: creating lookup index...`
    );


    db.exec(`
      CREATE INDEX idx_lexicon_normalized
      ON lexicon(normalized);

      ANALYZE;
    `);


    insertMetadata.run(
      "language_id",
      language.id
    );


    insertMetadata.run(
      "language_name",
      language.name
    );


    insertMetadata.run(
      "wiktionary_language_code",
      language
        .wiktionaryLanguageCode
    );


    insertMetadata.run(
      "source",
      metadata.source
    );


    insertMetadata.run(
      "source_etag",
      metadata.etag
    );


    insertMetadata.run(
      "source_last_modified",
      metadata.lastModified
    );


    insertMetadata.run(
      "built_at",
      new Date()
        .toISOString()
    );


    insertMetadata.run(
      "source_lines",
      String(
        sourceLines
      )
    );


    insertMetadata.run(
      "kept_entries",
      String(
        keptEntries
      )
    );


    insertMetadata.run(
      "generated_inflected_forms",
      String(
        generatedInflectedForms
      )
    );


    insertMetadata.run(
      "skipped_entries",
      String(
        skippedEntries
      )
    );


    insertMetadata.run(
      "license",
      "CC BY-SA 4.0; upstream also available under GFDL"
    );


    insertMetadata.run(
      "modifications",
      "Reduced to single-token lexical entries with word, normalized lookup key, part of speech, up to three English glosses, form-of lemma links, selected grammatical tags, and inflected forms expanded from Wiktextract conjugation/declension tables."
    );


    db.close();


    const fileStats =
      await stat(
        outputPath
      );


    console.log(
      `${language.name} dictionary build complete.`
    );


    console.log(
      `Source lines: ${sourceLines.toLocaleString()}`
    );


    console.log(
      `Kept entries: ${keptEntries.toLocaleString()}`
    );


    console.log(
      `Generated inflected-form rows: ${generatedInflectedForms.toLocaleString()}`
    );


    console.log(
      `Skipped entries: ${skippedEntries.toLocaleString()}`
    );


    console.log(
      `SQLite size: ${(fileStats.size / 1024 / 1024).toFixed(1)} MiB`
    );


    console.log(
      `Output: ${outputPath}`
    );

  } catch (
    error
  ) {
    try {
      db.exec(
        "ROLLBACK"
      );

    } catch {
      // Ignore rollback failure.
    }


    db.close();


    await rm(
      outputPath,
      {
        force:
          true,
      }
    );


    throw error;
  }
}


// ---------------------------------------------------------
// RESTORE FROM CACHE OR BUILD
// ---------------------------------------------------------

async function prepareDictionary(
  language
) {
  const outputPath =
    resolve(
      OUTPUT_PATH_OVERRIDE ||
      language
        .dictionary
        .path
    );


  const cachePath =
    resolve(
      CACHE_ROOT,
      `${language.id}.sqlite`
    );


  await mkdir(
    dirname(
      outputPath
    ),
    {
      recursive:
        true,
    }
  );


  await mkdir(
    CACHE_ROOT,
    {
      recursive:
        true,
    }
  );


  /*
    If Render already has a valid cached
    dictionary, simply copy it into the
    current deployment.
  */

  if (
    !FORCE_REBUILD &&
    await cachedDictionaryIsValid(
      cachePath,
      language
    )
  ) {
    console.log(
      `${language.name}: restoring dictionary from build cache.`
    );


    await copyFile(
      cachePath,
      outputPath
    );


    const fileStats =
      await stat(
        outputPath
      );


    console.log(
      `${language.name}: restored ${(fileStats.size / 1024 / 1024).toFixed(1)} MiB.`
    );


    return;
  }


  /*
    No usable cache exists.

    Download Kaikki and build it once.
  */

  console.log(
    `${language.name}: no usable cached dictionary found. Building now.`
  );


  await buildDictionary(
    language,
    outputPath
  );


  /*
    Save completed DB into Render's
    build cache.

    Write to a temporary cache file
    first, so a failed copy never leaves
    a corrupt file that looks valid.
  */

  const temporaryCachePath =
    `${cachePath}.tmp`;


  await rm(
    temporaryCachePath,
    {
      force:
        true,
    }
  );


  await copyFile(
    outputPath,
    temporaryCachePath
  );


  await rm(
    cachePath,
    {
      force:
        true,
    }
  );


  await rename(
    temporaryCachePath,
    cachePath
  );


  console.log(
    `${language.name}: saved completed dictionary to Render build cache.`
  );
}


// ---------------------------------------------------------
// MAIN
// ---------------------------------------------------------

async function main() {
  const targets =
    resolveBuildTargets();


  console.log(
    `Dictionary cache directory: ${CACHE_ROOT}`
  );


  console.log(
    `Dictionary cache version: ${CACHE_VERSION}`
  );


  for (
    const language
    of targets
  ) {
    console.log(
      `\n========================================`
    );


    console.log(
      `Preparing ${language.name}`
    );


    console.log(
      `========================================`
    );


    await prepareDictionary(
      language
    );
  }


  console.log(
    "\nAll configured dictionaries are ready."
  );
}


main().catch(
  (error) => {
    console.error(
      "Dictionary build failed:",
      error.message
    );


    process.exit(
      1
    );
  }
);
