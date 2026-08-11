import {
  mkdir,
  rm,
  stat,
  copyFile,
  rename
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


const CACHE_VERSION =
  process.env.DICTIONARY_CACHE_VERSION ||
  "v2-sense-tags";


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


const FORCE_REBUILD =
  process.env.REBUILD_DICTIONARIES ===
  "1";


const MAX_SENSES =
  5;


const MAX_MEANING_LENGTH =
  240;


const COMMIT_EVERY =
  25000;


function languageHasDictionary(
  language
) {

  return Boolean(
    language?.dictionary?.sourceUrl &&
    language?.dictionary?.path &&
    language?.wiktionaryLanguageCode
  );

}


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


const HIDDEN_SENSE_TAGS =
  new Set([
    "form-of",
    "masculine",
    "feminine",
    "neuter",
    "common-gender",
    "singular",
    "plural",
    "dual",
    "countable",
    "uncountable",
    "first-person",
    "second-person",
    "third-person",
    "present",
    "past",
    "future",
    "preterite",
    "imperfect",
    "perfect",
    "pluperfect",
    "imperative",
    "indicative",
    "subjunctive",
    "conditional",
    "infinitive",
    "participle",
    "gerund",
    "comparative",
    "superlative",
    "positive",
    "attributive",
    "predicative",
    "definite",
    "indefinite",
    "nominative",
    "accusative",
    "dative",
    "genitive",
    "vocative",
    "instrumental",
    "locative",
    "ablative",
    "animate",
    "inanimate",
  ]);


// ---------------------------------------------------------
// Helpers
// ---------------------------------------------------------

function normalizeWord(
  value,
  locale
) {

  return value
    .normalize(
      "NFC"
    )
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
    )
  ];

}


function cleanSenseTags(
  tags
) {

  return uniqueStrings(

    (
      Array.isArray(
        tags
      )
        ? tags
        : []
    )
      .filter(
        (
          tag
        ) =>
          typeof tag ===
          "string"
      )
      .map(
        (
          tag
        ) =>
          tag.trim()
      )
      .filter(
        (
          tag
        ) =>
          tag &&
          !HIDDEN_SENSE_TAGS.has(
            tag
          )
      )

  ).slice(
    0,
    8
  );

}


// ---------------------------------------------------------
// Reduce dictionary entry
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
      .normalize(
        "NFC"
      )
      .trim();


  if (
    !word ||
    /\s/u.test(
      word
    ) ||
    word.length >
      80
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


  const senses =
    [];


  const senseKeys =
    new Set();


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
      formOf.length >
        0 ||
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
              .normalize(
                "NFC"
              )
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
      !Array.isArray(
        sense?.glosses
      ) ||
      sense.glosses.length ===
        0
    ) {

      continue;

    }


    const meaning =
      cleanText(
        sense.glosses[
          sense.glosses.length -
          1
        ]
      );


    if (
      !meaning
    ) {

      continue;

    }


    const tags =
      cleanSenseTags(
        sense.tags
      );


    const key =
      `${meaning}\u0000${tags.join("|")}`;


    if (
      senseKeys.has(
        key
      )
    ) {

      continue;

    }


    senseKeys.add(
      key
    );


    senses.push({
      meaning,
      tags,
    });


    if (
      senses.length >=
      MAX_SENSES
    ) {

      break;

    }

  }


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
    senses.length ===
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

    senses,

    lemmas:
      uniqueLemmas,

    grammar:
      uniqueGrammarTags,

  };

}


// ---------------------------------------------------------
// Inflected forms
// ---------------------------------------------------------

function extractInflectedForms(
  rawEntry,
  lemmaEntry,
  language
) {

  if (
    !lemmaEntry ||
    lemmaEntry.senses.length ===
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
        .normalize(
          "NFC"
        )
        .trim();


    if (
      !form ||
      form ===
        "-" ||
      form ===
        lemmaEntry.word ||
      /\s/u.test(
        form
      ) ||
      form.length >
        80
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
        )
          .filter(
            (
              tag
            ) =>
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

      senses:
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
// Build targets
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
    ).filter(
      languageHasDictionary
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


  if (
    !languageHasDictionary(
      language
    )
  ) {

    throw new Error(
      `${language.name} does not use a local Kaikki/Wiktionary dictionary in this version of the app.`
    );

  }


  return [
    language
  ];

}


// ---------------------------------------------------------
// Source stream
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
        ) ||
        "",

      lastModified:
        response.headers.get(
          "last-modified"
        ) ||
        "",

    },

  };

}


// ---------------------------------------------------------
// Cache
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


    const languageRow =
      db
        .prepare(
          "SELECT value FROM metadata WHERE key = 'language_id' LIMIT 1"
        )
        .get();


    const formatRow =
      db
        .prepare(
          "SELECT value FROM metadata WHERE key = 'dictionary_format' LIMIT 1"
        )
        .get();


    db.close();


    return (
      languageRow?.value ===
        language.id &&
      formatRow?.value ===
        "sense-tags-v2"
    );

  } catch {

    return false;

  }

}


// ---------------------------------------------------------
// Build one dictionary
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

          item.senses.length
            ? JSON.stringify(
                item.senses
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
      "dictionary_format",
      "sense-tags-v2"
    );


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
      "Reduced to single-token lexical entries. Meanings are stored as individual English senses with learner-useful Wiktextract sense tags; grammatical-only sense tags are omitted from the display list. Form-of lemma links, grammatical form tags, and inflected forms are retained."
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
// Prepare dictionary
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


  console.log(
    `${language.name}: no usable cached dictionary found. Building now.`
  );


  await buildDictionary(
    language,
    outputPath
  );


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
// Main
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


  console.log(
    `Dictionary-backed languages: ${targets.map(
      (
        language
      ) =>
        language.name
    ).join(", ")}`
  );


  for (
    const language
    of targets
  ) {

    console.log(
      "\n========================================"
    );


    console.log(
      `Preparing ${language.name}`
    );


    console.log(
      "========================================"
    );


    await prepareDictionary(
      language
    );

  }


  console.log(
    "\nAll configured local dictionaries are ready."
  );

}


main().catch(
  (
    error
  ) => {

    console.error(
      "Dictionary build failed:",
      error.message
    );


    process.exit(
      1
    );

  }
);
