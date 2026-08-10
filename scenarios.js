export const SCENARIOS = {
  coffee: {
    name: "Ordering a coffee",

    role:
      "You are a German-speaking café employee/barista. The user is a customer ordering something.",

    situation:
      "Run a realistic, polite café interaction in Germany. Ask natural follow-up questions when useful, such as size, milk, takeaway, or anything else that fits the order.",

    opening:
      "Guten Tag! Was darf es für Sie sein?",

    openingReplyWords: [
      {
        surface: "Guten",
        lookup: "gut",
        pos: "adj",
      },
      {
        surface: "Tag",
        lookup: "Tag",
        pos: "noun",
      },
      {
        surface: "Was",
        lookup: "was",
        pos: "pron",
      },
      {
        surface: "darf",
        lookup: "dürfen",
        pos: "verb",
      },
      {
        surface: "es",
        lookup: "es",
        pos: "pron",
      },
      {
        surface: "für",
        lookup: "für",
        pos: "prep",
      },
      {
        surface: "Sie",
        lookup: "Sie",
        pos: "pron",
      },
      {
        surface: "sein",
        lookup: "sein",
        pos: "verb",
      },
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

    openingReplyWords: [
      {
        surface: "Guten",
        lookup: "gut",
        pos: "adj",
      },
      {
        surface: "Morgen",
        lookup: "Morgen",
        pos: "noun",
      },
      {
        surface: "Wie",
        lookup: "wie",
        pos: "adv",
      },
      {
        surface: "war",
        lookup: "sein",
        pos: "verb",
      },
      {
        surface: "dein",
        lookup: "dein",
        pos: "det",
      },
      {
        surface: "Wochenende",
        lookup: "Wochenende",
        pos: "noun",
      },
      {
        surface: "Hast",
        lookup: "haben",
        pos: "verb",
      },
      {
        surface: "du",
        lookup: "du",
        pos: "pron",
      },
      {
        surface: "etwas",
        lookup: "etwas",
        pos: "pron",
      },
      {
        surface: "Schönes",
        lookup: "schön",
        pos: "adj",
      },
      {
        surface: "gemacht",
        lookup: "machen",
        pos: "verb",
      },
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

    openingReplyWords: [
      {
        surface: "Entschuldigung",
        lookup: "Entschuldigung",
        pos: "noun",
      },
      {
        surface: "können",
        lookup: "können",
        pos: "verb",
      },
      {
        surface: "Sie",
        lookup: "Sie",
        pos: "pron",
      },
      {
        surface: "mir",
        lookup: "mir",
        pos: "pron",
      },
      {
        surface: "sagen",
        lookup: "sagen",
        pos: "verb",
      },
      {
        surface: "wie",
        lookup: "wie",
        pos: "adv",
      },
      {
        surface: "ich",
        lookup: "ich",
        pos: "pron",
      },
      {
        surface: "zum",
        lookup: "zum",
        pos: "prep",
      },
      {
        surface: "Bahnhof",
        lookup: "Bahnhof",
        pos: "noun",
      },
      {
        surface: "komme",
        lookup: "kommen",
        pos: "verb",
      },
    ],
  },
};
