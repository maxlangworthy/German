# German dictionary data: attribution and licence

The German word-lookup feature uses data derived from the English-language edition of Wiktionary and extracted/processed by Wiktextract / Kaikki.org.

## Source

- English Wiktionary contributors: https://en.wiktionary.org/
- Kaikki.org German machine-readable dictionary: https://kaikki.org/dictionary/German/
- Build source used by this project: https://kaikki.org/dictionary/German/kaikki.org-dictionary-German.jsonl.gz
- Wiktextract project: https://github.com/tatuylonen/wiktextract

The build script downloads the current Kaikki German export at deployment time, so the exact upstream dump date can change between deployments. Kaikki publishes the dump/extraction vintage on its German dictionary page.

## Modifications made by this project

The source data is transformed into a reduced SQLite lookup database for language-learning word tooltips. The transformation:

- keeps German (`de`) entries only;
- keeps single-token lexical entries suitable for per-word lookup;
- removes non-word items such as punctuation, symbols, prefixes and suffixes;
- keeps the surface word and part of speech;
- keeps up to three English glosses per lexical entry;
- keeps `form_of` lemma links for inflected forms;
- expands additional conjugated/declined single-word forms from Wiktextract `forms` tables and links them back to their lemma;
- keeps a limited set of grammatical tags for inflected forms;
- discards material not needed by the MVP, including audio, etymology, quotations, categories, links, examples and most other metadata;
- normalises an additional lower-case lookup key for efficient matching.

This reduced database is therefore a modified/adapted form of the source dictionary data.

## Licence

Kaikki.org states that its extracted data is made available under the same licences as Wiktionary: Creative Commons Attribution-ShareAlike and the GNU Free Documentation License (GFDL). The current English Wiktionary copyright page identifies its text licence as Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0), alongside the GFDL.

For this project, the reduced dictionary data and dictionary-derived outputs are provided under **CC BY-SA 4.0**. This notice does not apply that licence to the application's independently written source code, interface, branding, prompts or other original material unless explicitly stated.

- CC BY-SA 4.0: https://creativecommons.org/licenses/by-sa/4.0/
- Wiktionary copyright information: https://en.wiktionary.org/wiki/Wiktionary:Copyrights
- Kaikki.org licence statement: https://kaikki.org/dictionary/

Attribution must not imply that Wiktionary contributors, Wikimedia, Wiktextract or Kaikki.org endorse this application.

## Commercial use note

CC BY-SA 4.0 permits commercial reuse provided its terms are followed, including attribution and ShareAlike obligations for adaptations. This file and the visible attribution in the frontend are intended to preserve the relevant source, licence and modification notices. They are not legal advice; before a commercial launch, the product owner should review the applicable licence terms and obtain legal advice if needed.
