export const LANGUAGES = {
  german: {
    id: "german",
    name: "German",
    locale: "de-DE",
    aiLanguageName: "German",
    direction: "ltr",
    specialCharacters: ["ä", "ö", "ü", "ß"],
    wiktionaryLanguageCode: "de",
    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/German/kaikki.org-dictionary-German.jsonl",
      compressed: false,
      path: "data/german.sqlite",
    },
    openings: {
      coffee: "Guten Tag! Was möchten Sie bestellen?",
      weekend: "Hallo! Wie war dein Wochenende?",
      directions:
        "Entschuldigung, können Sie mir sagen, wie ich zum Bahnhof komme?",
    },
  },

  italian: {
    id: "italian",
    name: "Italian",
    locale: "it-IT",
    aiLanguageName: "Italian",
    direction: "ltr",
    specialCharacters: ["à", "è", "é", "ì", "ò", "ù"],
    wiktionaryLanguageCode: "it",
    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/Italian/kaikki.org-dictionary-Italian.jsonl",
      compressed: false,
      path: "data/italian.sqlite",
    },
    openings: {
      coffee: "Buongiorno! Cosa desidera ordinare?",
      weekend: "Ciao! Com'è andato il tuo fine settimana?",
      directions: "Mi scusi, può dirmi come si arriva alla stazione?",
    },
  },

  spanish: {
    id: "spanish",
    name: "Spanish",
    locale: "es-ES",
    aiLanguageName: "Spanish",
    direction: "ltr",
    specialCharacters: [
      "á",
      "é",
      "í",
      "ó",
      "ú",
      "ü",
      "ñ",
      "¿",
      "¡",
    ],
    wiktionaryLanguageCode: "es",
    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/Spanish/kaikki.org-dictionary-Spanish.jsonl",
      compressed: false,
      path: "data/spanish.sqlite",
    },
    openings: {
      coffee: "¡Buenos días! ¿Qué desea pedir?",
      weekend: "¡Hola! ¿Qué tal tu fin de semana?",
      directions:
        "Disculpe, ¿puede decirme cómo llegar a la estación?",
    },
  },

  portuguese: {
    id: "portuguese",
    name: "Portuguese",
    locale: "pt-PT",
    aiLanguageName: "Portuguese",
    direction: "ltr",
    specialCharacters: [
      "á",
      "à",
      "â",
      "ã",
      "ç",
      "é",
      "ê",
      "í",
      "ó",
      "ô",
      "õ",
      "ú",
    ],
    wiktionaryLanguageCode: "pt",
    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/Portuguese/kaikki.org-dictionary-Portuguese.jsonl",
      compressed: false,
      path: "data/portuguese.sqlite",
    },
    openings: {
      coffee:
        "Bom dia! O que gostaria de pedir?",
      weekend:
        "Olá! Como foi o seu fim de semana?",
      directions:
        "Desculpe, pode dizer-me como chegar à estação?",
    },
  },

  afrikaans: {
    id: "afrikaans",
    name: "Afrikaans",
    locale: "af-ZA",
    aiLanguageName: "Afrikaans",
    direction: "ltr",
    specialCharacters: ["ê", "ë", "ï", "ô", "û"],
    wiktionaryLanguageCode: "af",
    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/Afrikaans/kaikki.org-dictionary-Afrikaans.jsonl",
      compressed: false,
      path: "data/afrikaans.sqlite",
    },
    openings: {
      coffee: "Goeiedag! Wat wil u bestel?",
      weekend: "Hallo! Hoe was jou naweek?",
      directions:
        "Verskoon my, kan u my sê hoe ek by die stasie kom?",
    },
  },

  french: {
    id: "french",
    name: "French",
    locale: "fr-FR",
    aiLanguageName: "French",
    direction: "ltr",
    specialCharacters: [
      "à",
      "â",
      "æ",
      "ç",
      "é",
      "è",
      "ê",
      "ë",
      "î",
      "ï",
      "ô",
      "œ",
      "ù",
      "û",
      "ü",
      "ÿ",
    ],
    wiktionaryLanguageCode: "fr",
    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/French/kaikki.org-dictionary-French.jsonl",
      compressed: false,
      path: "data/french.sqlite",
    },
    openings: {
      coffee: "Bonjour ! Que souhaitez-vous commander ?",
      weekend: "Salut ! Comment s'est passé ton week-end ?",
      directions:
        "Excusez-moi, pouvez-vous me dire comment aller à la gare ?",
    },
  },

  welsh: {
    id: "welsh",
    name: "Welsh",
    locale: "cy-GB",
    aiLanguageName: "Welsh",
    direction: "ltr",
    specialCharacters: [
      "â",
      "ê",
      "î",
      "ô",
      "û",
      "ŵ",
      "ŷ",
      "ï",
    ],
    wiktionaryLanguageCode: "cy",
    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/Welsh/kaikki.org-dictionary-Welsh.jsonl",
      compressed: false,
      path: "data/welsh.sqlite",
    },
    openings: {
      coffee:
        "Bore da! Beth hoffech chi ei archebu?",
      weekend:
        "Helo! Sut oedd dy benwythnos?",
      directions:
        "Esgusodwch fi, allwch chi ddweud wrthyf sut i gyrraedd yr orsaf?",
    },
    outputInstructions: `
- Write all target-language dialogue in natural modern Welsh.
- Keep the language appropriate to the learner's selected CEFR level.
- When correcting the learner, keep the corrected version in Welsh.`,
  },

  russian: {
    id: "russian",
    name: "Russian",
    locale: "ru-RU",
    aiLanguageName: "Russian",
    direction: "ltr",
    specialCharacters: [
      "а",
      "б",
      "в",
      "г",
      "д",
      "е",
      "ё",
      "ж",
      "з",
      "и",
      "й",
      "к",
      "л",
      "м",
      "н",
      "о",
      "п",
      "р",
      "с",
      "т",
      "у",
      "ф",
      "х",
      "ц",
      "ч",
      "ш",
      "щ",
      "ъ",
      "ы",
      "ь",
      "э",
      "ю",
      "я",
    ],
    wiktionaryLanguageCode: "ru",
    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/Russian/kaikki.org-dictionary-Russian.jsonl",
      compressed: false,
      path: "data/russian.sqlite",
    },
    openings: {
      coffee:
        "Здравствуйте! Что вы хотели бы заказать?",
      weekend:
        "Привет! Как прошли твои выходные?",
      directions:
        "Извините, вы не подскажете, как пройти к вокзалу?",
    },
  },

  persian: {
    id: "persian",
    name: "Persian (Farsi)",
    locale: "fa-IR",
    aiLanguageName: "Persian (Farsi)",
    direction: "rtl",
    specialCharacters: [
      "ا",
      "آ",
      "ب",
      "پ",
      "ت",
      "ث",
      "ج",
      "چ",
      "ح",
      "خ",
      "د",
      "ذ",
      "ر",
      "ز",
      "ژ",
      "س",
      "ش",
      "ص",
      "ض",
      "ط",
      "ظ",
      "ع",
      "غ",
      "ف",
      "ق",
      "ک",
      "گ",
      "ل",
      "م",
      "ن",
      "و",
      "ه",
      "ی",
      "ء",
      "ؤ",
      "ئ",
    ],
    wiktionaryLanguageCode: "fa",
    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/Persian/kaikki.org-dictionary-Persian.jsonl",
      compressed: false,
      path: "data/persian.sqlite",
    },
    openings: {
      coffee:
        "سلام! چه چیزی میل دارید سفارش بدهید؟",
      weekend:
        "سلام! آخر هفته شما چطور بود؟",
      directions:
        "ببخشید، می‌توانید به من بگویید چطور به ایستگاه قطار بروم؟",
    },
    outputInstructions: `
- Write all target-language dialogue in natural contemporary Iranian Persian (Farsi).
- Use Persian script, not transliteration.
- Keep the language appropriate to the learner's selected CEFR level.
- When correcting the learner, keep the corrected version in Persian script.`,
  },

  arabic: {
    id: "arabic",
    name: "Arabic",
    locale: "ar",
    aiLanguageName: "Arabic",
    direction: "rtl",
    specialCharacters: [
      "ا",
      "ب",
      "ت",
      "ث",
      "ج",
      "ح",
      "خ",
      "د",
      "ذ",
      "ر",
      "ز",
      "س",
      "ش",
      "ص",
      "ض",
      "ط",
      "ظ",
      "ع",
      "غ",
      "ف",
      "ق",
      "ك",
      "ل",
      "م",
      "ن",
      "ه",
      "و",
      "ي",
      "ء",
      "أ",
      "إ",
      "آ",
      "ؤ",
      "ئ",
      "ة",
      "ى",
    ],
    wiktionaryLanguageCode: "ar",
    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/Arabic/kaikki.org-dictionary-Arabic.jsonl",
      compressed: false,
      path: "data/arabic.sqlite",
    },
    openings: {
      coffee:
        "مرحبًا! ماذا تود أن تطلب؟",
      weekend:
        "مرحبًا! كيف كانت عطلة نهاية الأسبوع؟",
      directions:
        "عذرًا، هل يمكنك أن تخبرني كيف أصل إلى محطة القطار؟",
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
    direction: "ltr",
    specialCharacters: [
      "ç",
      "ğ",
      "ı",
      "İ",
      "ö",
      "ş",
      "ü",
    ],
    wiktionaryLanguageCode: "tr",
    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/Turkish/kaikki.org-dictionary-Turkish.jsonl",
      compressed: false,
      path: "data/turkish.sqlite",
    },
    openings: {
      coffee:
        "Merhaba! Ne sipariş etmek istersiniz?",
      weekend:
        "Merhaba! Hafta sonun nasıldı?",
      directions:
        "Affedersiniz, tren istasyonuna nasıl gidebileceğimi söyleyebilir misiniz?",
    },
  },

  greek: {
    id: "greek",
    name: "Greek",
    locale: "el-GR",
    aiLanguageName: "Modern Greek",
    direction: "ltr",
    specialCharacters: [
      "α",
      "β",
      "γ",
      "δ",
      "ε",
      "ζ",
      "η",
      "θ",
      "ι",
      "κ",
      "λ",
      "μ",
      "ν",
      "ξ",
      "ο",
      "π",
      "ρ",
      "σ",
      "ς",
      "τ",
      "υ",
      "φ",
      "χ",
      "ψ",
      "ω",
      "ά",
      "έ",
      "ή",
      "ί",
      "ό",
      "ύ",
      "ώ",
      "ϊ",
      "ΐ",
      "ϋ",
      "ΰ",
    ],
    wiktionaryLanguageCode: "el",
    dictionary: {
      sourceUrl:
        "https://kaikki.org/dictionary/Greek/kaikki.org-dictionary-Greek.jsonl",
      compressed: false,
      path: "data/greek.sqlite",
    },
    openings: {
      coffee:
        "Γεια σας! Τι θα θέλατε να παραγγείλετε;",
      weekend:
        "Γεια! Πώς ήταν το Σαββατοκύριακό σου;",
      directions:
        "Συγγνώμη, μπορείτε να μου πείτε πώς θα πάω στον σταθμό;",
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
    direction: "ltr",
    specialCharacters: [
      "ā",
      "á",
      "ǎ",
      "à",
      "ē",
      "é",
      "ě",
      "è",
      "ī",
      "í",
      "ǐ",
      "ì",
      "ō",
      "ó",
      "ǒ",
      "ò",
      "ū",
      "ú",
      "ǔ",
      "ù",
      "ǖ",
      "ǘ",
      "ǚ",
      "ǜ",
      "ü",
    ],
    wiktionaryLanguageCode: null,
    dictionary: null,
    openings: {
      coffee:
        "Nǐ hǎo! Nǐ xiǎng diǎn shénme?",
      weekend:
        "Nǐ hǎo! Nǐ zhōumò guò de zěnmeyàng?",
      directions:
        "Bù hǎoyìsi, qǐngwèn huǒchēzhàn zěnme zǒu?",
    },
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
    direction: "ltr",
    specialCharacters: [
      "ā",
      "ī",
      "ū",
      "ē",
      "ō",
    ],
    wiktionaryLanguageCode: null,
    dictionary: null,
    openings: {
      coffee:
        "Konnichiwa! Nani o chūmon shimasu ka?",
      weekend:
        "Konnichiwa! Shūmatsu wa dō deshita ka?",
      directions:
        "Sumimasen, eki made dō yatte ikeba ii desu ka?",
    },
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
