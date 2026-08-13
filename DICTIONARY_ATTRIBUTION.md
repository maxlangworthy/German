# Dictionary data: attribution and licence

The word-lookup feature uses dictionary data derived from the English-language edition of Wiktionary and extracted/processed by Wiktextract / Kaikki.org.

## Languages currently using local dictionary data

- German (`de`)
- Italian (`it`)
- Spanish (`es`)
- Afrikaans (`af`)
- French (`fr`)
- Russian (`ru`)
- Arabic (`ar`)
- Turkish (`tr`)
- Greek (`el`)

Mandarin Chinese (Pinyin) and Japanese (Romaji) currently do not use the local Kaikki dictionary lookup feature.

## Sources

- English Wiktionary contributors: https://en.wiktionary.org/
- Wiktextract: https://github.com/tatuylonen/wiktextract
- Kaikki.org machine-readable dictionaries: https://kaikki.org/dictionary/
- German: https://kaikki.org/dictionary/German/
- Italian: https://kaikki.org/dictionary/Italian/
- Spanish: https://kaikki.org/dictionary/Spanish/
- Afrikaans: https://kaikki.org/dictionary/Afrikaans/
- French: https://kaikki.org/dictionary/French/
- Russian: https://kaikki.org/dictionary/Russian/
- Arabic: https://kaikki.org/dictionary/Arabic/
- Turkish: https://kaikki.org/dictionary/Turkish/
- Greek: https://kaikki.org/dictionary/Greek/

The build script downloads the configured Kaikki exports at deployment time, so the exact upstream extraction/dump date can change between deployments.

## Modifications made by this project

The source data is transformed into reduced SQLite lookup databases for language-learning word tooltips. Depending on the source entry, the transformation can:

- keep entries for the configured target language only;
- keep single-token lexical entries suitable for per-word lookup;
- remove non-word items such as punctuation, symbols, prefixes and suffixes;
- keep the surface word and part of speech;
- keep a limited number of English glosses/senses and selected sense tags;
- keep `form_of` lemma links for inflected forms;
- expand additional conjugated/declined single-word forms from Wiktextract `forms` tables and link them back to their lemma;
- keep a limited set of grammatical tags for inflected forms;
- discard material not needed by the app, including audio, etymology, quotations, categories, links, examples and most other metadata;
- normalise an additional lower-case lookup key for efficient matching.

The generated SQLite databases are therefore modified/adapted forms of the source dictionary data.

## Licence

Kaikki.org states that its extracted data is made available under the same licences as Wiktionary. The English Wiktionary copyright information identifies its text licensing, including Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0), alongside GFDL terms where applicable.

For this project, dictionary-derived data and dictionary-derived outputs are provided under **CC BY-SA 4.0**. This notice does not apply that licence to the application's independently written source code, interface, branding, prompts or other original material unless explicitly stated.

- CC BY-SA 4.0: https://creativecommons.org/licenses/by-sa/4.0/
- Wiktionary copyright information: https://en.wiktionary.org/wiki/Wiktionary:Copyrights
- Kaikki.org licence information: https://kaikki.org/dictionary/

Attribution must not imply that Wiktionary contributors, Wikimedia, Wiktextract or Kaikki.org endorse this application.

## Commercial use note

CC BY-SA 4.0 permits commercial reuse provided its terms are followed, including attribution and ShareAlike obligations for adaptations. This file and the visible attribution in the frontend are intended to preserve the relevant source, licence and modification notices. They are not legal advice; before a commercial launch, the product owner should review the applicable licence terms and obtain legal advice if needed.
