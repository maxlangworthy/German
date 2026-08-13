export const LANGUAGES = {
  german: {
    id: "german",
    name: "German",
    locale: "de-DE",
    aiLanguageName: "German",
    wiktionaryLanguageCode: "de",
    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/German/kaikki.org-dictionary-German.jsonl",
      compressed: false,
      path: "data/german.sqlite",
    },
  },

  italian: {
    id: "italian",
    name: "Italian",
    locale: "it-IT",
    aiLanguageName: "Italian",
    wiktionaryLanguageCode: "it",
    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/Italian/kaikki.org-dictionary-Italian.jsonl",
      compressed: false,
      path: "data/italian.sqlite",
    },
  },

  spanish: {
    id: "spanish",
    name: "Spanish",
    locale: "es-ES",
    aiLanguageName: "Spanish",
    wiktionaryLanguageCode: "es",
    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/Spanish/kaikki.org-dictionary-Spanish.jsonl",
      compressed: false,
      path: "data/spanish.sqlite",
    },
  },

  afrikaans: {
    id: "afrikaans",
    name: "Afrikaans",
    locale: "af-ZA",
    aiLanguageName: "Afrikaans",
    wiktionaryLanguageCode: "af",
    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/Afrikaans/kaikki.org-dictionary-Afrikaans.jsonl",
      compressed: false,
      path: "data/afrikaans.sqlite",
    },
  },

  french: {
    id: "french",
    name: "French",
    locale: "fr-FR",
    aiLanguageName: "French",
    wiktionaryLanguageCode: "fr",
    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/French/kaikki.org-dictionary-French.jsonl",
      compressed: false,
      path: "data/french.sqlite",
    },
  },

  russian: {
    id: "russian",
    name: "Russian",
    locale: "ru-RU",
    aiLanguageName: "Russian",
    wiktionaryLanguageCode: "ru",
    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/Russian/kaikki.org-dictionary-Russian.jsonl",
      compressed: false,
      path: "data/russian.sqlite",
    },
  },

  arabic: {
    id: "arabic",
    name: "Arabic",
    locale: "ar",
    aiLanguageName: "Arabic",
    wiktionaryLanguageCode: "ar",
    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/Arabic/kaikki.org-dictionary-Arabic.jsonl",
      compressed: false,
      path: "data/arabic.sqlite",
    },
    outputInstructions: `
- Write all target-language dialogue in clear, natural Modern Standard Arabic unless the scenario specifically requires another variety.
- Use Arabic script, not transliteration.
- Keep the language appropriate to the learner's selected CEFR level.
- When correcting the learner, keep the corrected version in Arabic script.`,
  },

  turkish: {
    id: "turkish",
    name: "Turkish",
    locale: "tr-TR",
    aiLanguageName: "Turkish",
    wiktionaryLanguageCode: "tr",
    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/Turkish/kaikki.org-dictionary-Turkish.jsonl",
      compressed: false,
      path: "data/turkish.sqlite",
    },
  },

  greek: {
    id: "greek",
    name: "Greek",
    locale: "el-GR",
    aiLanguageName: "Modern Greek",
    wiktionaryLanguageCode: "el",
    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/Greek/kaikki.org-dictionary-Greek.jsonl",
      compressed: false,
      path: "data/greek.sqlite",
    },
    outputInstructions: `
- Write all target-language dialogue in natural Modern Greek.
- Use the Greek alphabet, not Latin transliteration.
- Keep the language appropriate to the learner's selected CEFR level.
- When correcting the learner, keep the corrected version in Greek script.`,
  },

  mandarin_pinyin: {
    id: "mandarin_pinyin",
    name: "Mandarin Chinese (Pinyin)",
    locale: "zh-CN",
    aiLanguageName: "Mandarin Chinese",
    wiktionaryLanguageCode: null,
    dictionary: null,
    outputInstructions: `
- Write all target-language dialogue in standard Hanyu Pinyin using Latin letters.
- Use tone marks on vowels, for example: nǐ hǎo, xiǎng, kāfēi.
- Do not use Chinese characters anywhere in the target-language dialogue.
- Use normal spacing between Pinyin words/syllable groups so an English-keyboard learner can read and type the conversation easily.
- When correcting the learner, keep the corrected version in Pinyin rather than Chinese characters.`,
  },

  japanese_romaji: {
    id: "japanese_romaji",
    name: "Japanese (Romaji)",
    locale: "ja-JP",
    aiLanguageName: "Japanese",
    wiktionaryLanguageCode: null,
    dictionary: null,
    outputInstructions: `
- Write all target-language dialogue in Hepburn-style rōmaji using Latin letters.
- Do not use hiragana, katakana or kanji anywhere in the target-language dialogue.
- Use macrons for long vowels where appropriate, for example: Tōkyō, kōhī, shūmatsu.
- Keep spacing learner-friendly and readable rather than imitating unspaced Japanese script.
- When correcting the learner, keep the corrected version in rōmaji rather than Japanese script.`,
  },
};

export function getLanguage(languageId) {
  return LANGUAGES[languageId] || null;
}

export function languageHasDictionary(language) {
  return Boolean(
    language?.dictionary?.sourceUrl &&
      language?.dictionary?.path &&
      language?.wiktionaryLanguageCode
  );
}
