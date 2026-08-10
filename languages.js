export const LANGUAGES = {

  german: {
    id: "german",
    name: "German",

    locale:
      "de-DE",

    wiktionaryLanguageCode:
      "de",

    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/German/kaikki.org-dictionary-German.jsonl",

      compressed:
        false,

      path:
        "data/german.sqlite",
    },
  },


  italian: {
    id: "italian",
    name: "Italian",

    locale:
      "it-IT",

    wiktionaryLanguageCode:
      "it",

    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/Italian/kaikki.org-dictionary-Italian.jsonl",

      compressed:
        false,

      path:
        "data/italian.sqlite",
    },
  },


  spanish: {
    id: "spanish",
    name: "Spanish",

    locale:
      "es-ES",

    wiktionaryLanguageCode:
      "es",

    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/Spanish/kaikki.org-dictionary-Spanish.jsonl",

      compressed:
        false,

      path:
        "data/spanish.sqlite",
    },
  },


  afrikaans: {
    id: "afrikaans",
    name: "Afrikaans",

    locale:
      "af-ZA",

    wiktionaryLanguageCode:
      "af",

    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/Afrikaans/kaikki.org-dictionary-Afrikaans.jsonl",

      compressed:
        false,

      path:
        "data/afrikaans.sqlite",
    },
  },


  french: {
    id: "french",
    name: "French",

    locale:
      "fr-FR",

    wiktionaryLanguageCode:
      "fr",

    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/French/kaikki.org-dictionary-French.jsonl",

      compressed:
        false,

      path:
        "data/french.sqlite",
    },
  },

};


export function getLanguage(
  languageId
) {

  return (
    LANGUAGES[
      languageId
    ] ||
    null
  );

}
