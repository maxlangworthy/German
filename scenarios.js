export const SCENARIOS = {

  coffee: {
    name:
      "Ordering a coffee",

    role:
      "You are a café employee/barista. The user is a customer ordering something. Use the normal polite form of address for the selected language.",

    situation:
      "Run a realistic, polite café interaction. Ask natural follow-up questions when useful, such as size, milk, takeaway, or anything else that fits the order.",


    openings: {

      german: {
        reply:
          "Guten Tag! Was darf es für Sie sein?",

        replyWords: [
          {
            surface:
              "Guten",

            lookup:
              "gut",

            pos:
              "adj",
          },

          {
            surface:
              "Tag",

            lookup:
              "Tag",

            pos:
              "noun",
          },

          {
            surface:
              "Was",

            lookup:
              "was",

            pos:
              "pron",
          },

          {
            surface:
              "darf",

            lookup:
              "dürfen",

            pos:
              "verb",
          },

          {
            surface:
              "es",

            lookup:
              "es",

            pos:
              "pron",
          },

          {
            surface:
              "für",

            lookup:
              "für",

            pos:
              "prep",
          },

          {
            surface:
              "Sie",

            lookup:
              "Sie",

            pos:
              "pron",
          },

          {
            surface:
              "sein",

            lookup:
              "sein",

            pos:
              "verb",
          },
        ],
      },

    },
  },


  weekend: {
    name:
      "Talking about your weekend with a colleague",

    role:
      "You are the user's colleague. Use the normal informal form of address for the selected language.",

    situation:
      "Have a normal, friendly workplace conversation about what the user did at the weekend. React naturally and ask relevant follow-up questions without turning the conversation into a lesson.",


    openings: {

      german: {
        reply:
          "Guten Morgen! Wie war dein Wochenende? Hast du etwas Schönes gemacht?",

        replyWords: [
          {
            surface:
              "Guten",

            lookup:
              "gut",

            pos:
              "adj",
          },

          {
            surface:
              "Morgen",

            lookup:
              "Morgen",

            pos:
              "noun",
          },

          {
            surface:
              "Wie",

            lookup:
              "wie",

            pos:
              "adv",
          },

          {
            surface:
              "war",

            lookup:
              "sein",

            pos:
              "verb",
          },

          {
            surface:
              "dein",

            lookup:
              "dein",

            pos:
              "det",
          },

          {
            surface:
              "Wochenende",

            lookup:
              "Wochenende",

            pos:
              "noun",
          },

          {
            surface:
              "Hast",

            lookup:
              "haben",

            pos:
              "verb",
          },

          {
            surface:
              "du",

            lookup:
              "du",

            pos:
              "pron",
          },

          {
            surface:
              "etwas",

            lookup:
              "etwas",

            pos:
              "pron",
          },

          {
            surface:
              "Schönes",

            lookup:
              "schön",

            pos:
              "adj",
          },

          {
            surface:
              "gemacht",

            lookup:
              "machen",

            pos:
              "verb",
          },
        ],
      },

    },
  },


  directions: {
    name:
      "Giving a stranger directions",

    role:
      "You are a stranger who needs directions from the user. Use the normal polite form of address for the selected language.",

    situation:
      "You are trying to reach the train station and need the user to explain how to get there. Ask sensible clarification questions if the directions are incomplete or unclear.",


    openings: {

      german: {
        reply:
          "Entschuldigung, können Sie mir sagen, wie ich zum Bahnhof komme?",

        replyWords: [
          {
            surface:
              "Entschuldigung",

            lookup:
              "Entschuldigung",

            pos:
              "noun",
          },

          {
            surface:
              "können",

            lookup:
              "können",

            pos:
              "verb",
          },

          {
            surface:
              "Sie",

            lookup:
              "Sie",

            pos:
              "pron",
          },

          {
            surface:
              "mir",

            lookup:
              "mir",

            pos:
              "pron",
          },

          {
            surface:
              "sagen",

            lookup:
              "sagen",

            pos:
              "verb",
          },

          {
            surface:
              "wie",

            lookup:
              "wie",

            pos:
              "adv",
          },

          {
            surface:
              "ich",

            lookup:
              "ich",

            pos:
              "pron",
          },

          {
            surface:
              "zum",

            lookup:
              "zum",

            pos:
              "prep",
          },

          {
            surface:
              "Bahnhof",

            lookup:
              "Bahnhof",

            pos:
              "noun",
          },

          {
            surface:
              "komme",

            lookup:
              "kommen",

            pos:
              "verb",
          },
        ],
      },

    },
  },

};
