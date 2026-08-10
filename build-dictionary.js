import {
  mkdir,
  rm,
  stat
} from "node:fs/promises";

import {
  createReadStream
} from "node:fs";

import {
  dirname,
  resolve
} from "node:path";

import {
  Readable
} from "node:stream";

import {
  createGunzip
} from "node:zlib";

import readline
  from "node:readline";

import {
  DatabaseSync
} from "node:sqlite";

import {
  LANGUAGES,
  getLanguage
} from "./languages.js";


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
// General language-aware word handling
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
  return String(value)
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
      values.filter(Boolean)
    )
  ];
}


// ---------------------------------------------------------
// Reduce a Wiktionary entry
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
    /\s/u.test(word) ||
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


  const meanings = [];
  const lemmas = [];
  const grammarTags = [];


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


    if (isFormSense) {
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


      if (gloss) {
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
// Expand inflected forms
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


  const results = [];

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
      /\s/u.test(form) ||
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
      seen.has(key)
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

      meanings: [],

      lemmas: [
        lemmaEntry.word
      ],

      grammar,
    });
  }


  return results;
}


// ---------------------------------------------------------
// Work out which dictionaries to build
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


  if (!language) {
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
// Get compressed dictionary source
// ---------------------------------------------------------

async function getCompressedSourceStream(
  language
) {
  if (
    SOURCE_FILE_OVERRIDE
  ) {
    console.log(
      `Reading ${language.name} dictionary source from ${SOURCE_FILE_OVERRIDE}`
    );


    return {
      stream:
        createReadStream(
          SOURCE_FILE_OVERRIDE
        ),

      metadata: {
        source:
          SOURCE_FILE_OVERRIDE,

        etag: "",

        lastModified: "",
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


  return {
    stream:
      Readable.fromWeb(
        response.body
      ),

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
// Build one language dictionary
// ---------------------------------------------------------

async function buildDictionary(
  language
) {
  const outputPath =
    resolve(
      OUTPUT_PATH_OVERRIDE ||
      language
        .dictionary
        .path
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
      compressedStream,

    metadata,
  } =
    await getCompressedSourceStream(
      language
    );


  const gunzip =
    createGunzip();


  const source =
    compressedStream.pipe(
      gunzip
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


      if (!entry) {
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

  } catch (error) {
    try {
      db.exec(
        "ROLLBACK"
      );

    } catch {
      // Ignore rollback failure.
    }


    db.close();

    throw error;
  }
}


// ---------------------------------------------------------
// Build every configured language
// ---------------------------------------------------------

async function main() {
  const targets =
    resolveBuildTargets();


  for (
    const language
    of targets
  ) {
    await buildDictionary(
      language
    );
  }
}


main().catch(
  (error) => {
    console.error(
      "Dictionary build failed:",
      error.message
    );


    process.exit(1);
  }
);
