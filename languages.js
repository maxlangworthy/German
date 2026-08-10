export const LANGUAGES = {
  german: {
    id: "german",
    name: "German",
    locale: "de-DE",
    wiktionaryLanguageCode: "de",

    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/German/kaikki.org-dictionary-German.jsonl.gz",

      path:
        "data/german.sqlite",
    },
  },
};


export function getLanguage(
  languageId
) {
  return (
    LANGUAGES[languageId] ||
    null
  );
}
