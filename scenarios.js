export const SCENARIOS = {
  coffee: {
    name: "Ordering a coffee",

    role:
      "You are a German-speaking café employee/barista. The user is a customer ordering something.",

    situation:
      "Run a realistic, polite café interaction in Germany. Ask natural follow-up questions when useful, such as size, milk, takeaway, or anything else that fits the order.",

    opening:
      "Guten Tag! Was darf es für Sie sein?",

    // One dictionary lookup form for each word
    // in the opening, in the same order.
    openingLookupForms: [
      "gut",
      "Tag",
      "was",
      "dürfen",
      "es",
      "für",
      "Sie",
      "sein"
    ],

    // Very coarse part-of-speech tags.
    openingPartsOfSpeech: [
      "adj",
      "noun",
      "pron",
      "verb",
      "pron",
      "prep",
      "pron",
      "verb"
    ],
  },


  weekend: {
    name:
      "Talking about your weekend with a colleague",

    role:
      "You are the user's German-speaking colleague. Use informal German (du).",

    situation:
      "Have a normal, friendly workplace conversation about what the user did at the weekend. React naturally and ask relevant follow-up questions without turning the conversation into a lesson.",

    opening:
      "Guten Morgen! Wie war dein Wochenende? Hast du etwas Schönes gemacht?",

    openingLookupForms: [
      "gut",
      "Morgen",
      "wie",
      "sein",
      "dein",
      "Wochenende",
      "haben",
      "du",
      "etwas",
      "schön",
      "machen"
    ],

    openingPartsOfSpeech: [
      "adj",
      "noun",
      "adv",
      "verb",
      "det",
      "noun",
      "verb",
      "pron",
      "pron",
      "adj",
      "verb"
    ],
  },


  directions: {
    name:
      "Giving a stranger directions",

    role:
      "You are a German-speaking stranger who needs directions from the user. Use polite German (Sie).",

    situation:
      "You are trying to reach the train station and need the user to explain how to get there. Ask sensible clarification questions if the directions are incomplete or unclear.",

    opening:
      "Entschuldigung, können Sie mir sagen, wie ich zum Bahnhof komme?",

    openingLookupForms: [
      "Entschuldigung",
      "können",
      "Sie",
      "mir",
      "sagen",
      "wie",
      "ich",
      "zum",
      "Bahnhof",
      "kommen"
    ],

    openingPartsOfSpeech: [
      "noun",
      "verb",
      "pron",
      "pron",
      "verb",
      "adv",
      "pron",
      "prep",
      "noun",
      "verb"
    ],
  },
};
