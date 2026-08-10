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


      italian: {
        reply:
          "Buongiorno! Cosa desidera ordinare?",

        replyWords: [
          {
            surface: "Buongiorno",
            lookup: "buongiorno",
            pos: "interj",
          },
          {
            surface: "Cosa",
            lookup: "cosa",
            pos: "pron",
          },
          {
            surface: "desidera",
            lookup: "desiderare",
            pos: "verb",
          },
          {
            surface: "ordinare",
            lookup: "ordinare",
            pos: "verb",
          },
        ],
      },


      spanish: {
        reply:
          "¡Buenos días! ¿Qué desea pedir?",

        replyWords: [
          {
            surface: "Buenos",
            lookup: "bueno",
            pos: "adj",
          },
          {
            surface: "días",
            lookup: "día",
            pos: "noun",
          },
          {
            surface: "Qué",
            lookup: "qué",
            pos: "pron",
          },
          {
            surface: "desea",
            lookup: "desear",
            pos: "verb",
          },
          {
            surface: "pedir",
            lookup: "pedir",
            pos: "verb",
          },
        ],
      },


      afrikaans: {
        reply:
          "Goeiedag! Wat wil u graag bestel?",

        replyWords: [
          {
            surface: "Goeiedag",
            lookup: "goeiedag",
            pos: "interj",
          },
          {
            surface: "Wat",
            lookup: "wat",
            pos: "pron",
          },
          {
            surface: "wil",
            lookup: "wil",
            pos: "verb",
          },
          {
            surface: "u",
            lookup: "u",
            pos: "pron",
          },
          {
            surface: "graag",
            lookup: "graag",
            pos: "adv",
          },
          {
            surface: "bestel",
            lookup: "bestel",
            pos: "verb",
          },
        ],
      },


      french: {
        reply:
          "Bonjour ! Qu'est-ce que vous désirez commander ?",

        replyWords: [
          {
            surface: "Bonjour",
            lookup: "bonjour",
            pos: "interj",
          },
          {
            surface: "Qu'est-ce",
            lookup: "qu'est-ce",
            pos: "pron",
          },
          {
            surface: "que",
            lookup: "que",
            pos: "pron",
          },
          {
            surface: "vous",
            lookup: "vous",
            pos: "pron",
          },
          {
            surface: "désirez",
            lookup: "désirer",
            pos: "verb",
          },
          {
            surface: "commander",
            lookup: "commander",
            pos: "verb",
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


      italian: {
        reply:
          "Buongiorno! Com'è stato il tuo fine settimana? Hai fatto qualcosa di bello?",

        replyWords: [
          {
            surface: "Buongiorno",
            lookup: "buongiorno",
            pos: "interj",
          },
          {
            surface: "Com'è",
            lookup: "come",
            pos: "adv",
          },
          {
            surface: "stato",
            lookup: "essere",
            pos: "verb",
          },
          {
            surface: "il",
            lookup: "il",
            pos: "det",
          },
          {
            surface: "tuo",
            lookup: "tuo",
            pos: "det",
          },
          {
            surface: "fine",
            lookup: "fine",
            pos: "noun",
          },
          {
            surface: "settimana",
            lookup: "settimana",
            pos: "noun",
          },
          {
            surface: "Hai",
            lookup: "avere",
            pos: "verb",
          },
          {
            surface: "fatto",
            lookup: "fare",
            pos: "verb",
          },
          {
            surface: "qualcosa",
            lookup: "qualcosa",
            pos: "pron",
          },
          {
            surface: "di",
            lookup: "di",
            pos: "prep",
          },
          {
            surface: "bello",
            lookup: "bello",
            pos: "adj",
          },
        ],
      },


      spanish: {
        reply:
          "¡Buenos días! ¿Qué tal tu fin de semana? ¿Hiciste algo divertido?",

        replyWords: [
          {
            surface: "Buenos",
            lookup: "bueno",
            pos: "adj",
          },
          {
            surface: "días",
            lookup: "día",
            pos: "noun",
          },
          {
            surface: "Qué",
            lookup: "qué",
            pos: "pron",
          },
          {
            surface: "tal",
            lookup: "tal",
            pos: "adv",
          },
          {
            surface: "tu",
            lookup: "tu",
            pos: "det",
          },
          {
            surface: "fin",
            lookup: "fin",
            pos: "noun",
          },
          {
            surface: "de",
            lookup: "de",
            pos: "prep",
          },
          {
            surface: "semana",
            lookup: "semana",
            pos: "noun",
          },
          {
            surface: "Hiciste",
            lookup: "hacer",
            pos: "verb",
          },
          {
            surface: "algo",
            lookup: "algo",
            pos: "pron",
          },
          {
            surface: "divertido",
            lookup: "divertido",
            pos: "adj",
          },
        ],
      },


      afrikaans: {
        reply:
          "Goeiemôre! Hoe was jou naweek? Het jy iets lekker gedoen?",

        replyWords: [
          {
            surface: "Goeiemôre",
            lookup: "goeiemôre",
            pos: "interj",
          },
          {
            surface: "Hoe",
            lookup: "hoe",
            pos: "adv",
          },
          {
            surface: "was",
            lookup: "wees",
            pos: "verb",
          },
          {
            surface: "jou",
            lookup: "jou",
            pos: "det",
          },
          {
            surface: "naweek",
            lookup: "naweek",
            pos: "noun",
          },
          {
            surface: "Het",
            lookup: "het",
            pos: "verb",
          },
          {
            surface: "jy",
            lookup: "jy",
            pos: "pron",
          },
          {
            surface: "iets",
            lookup: "iets",
            pos: "pron",
          },
          {
            surface: "lekker",
            lookup: "lekker",
            pos: "adj",
          },
          {
            surface: "gedoen",
            lookup: "doen",
            pos: "verb",
          },
        ],
      },


      french: {
        reply:
          "Bonjour ! Comment s'est passé ton week-end ? Tu as fait quelque chose de sympa ?",

        replyWords: [
          {
            surface: "Bonjour",
            lookup: "bonjour",
            pos: "interj",
          },
          {
            surface: "Comment",
            lookup: "comment",
            pos: "adv",
          },
          {
            surface: "s'est",
            lookup: "se",
            pos: "pron",
          },
          {
            surface: "passé",
            lookup: "passer",
            pos: "verb",
          },
          {
            surface: "ton",
            lookup: "ton",
            pos: "det",
          },
          {
            surface: "week-end",
            lookup: "week-end",
            pos: "noun",
          },
          {
            surface: "Tu",
            lookup: "tu",
            pos: "pron",
          },
          {
            surface: "as",
            lookup: "avoir",
            pos: "verb",
          },
          {
            surface: "fait",
            lookup: "faire",
            pos: "verb",
          },
          {
            surface: "quelque",
            lookup: "quelque",
            pos: "det",
          },
          {
            surface: "chose",
            lookup: "chose",
            pos: "noun",
          },
          {
            surface: "de",
            lookup: "de",
            pos: "prep",
          },
          {
            surface: "sympa",
            lookup: "sympa",
            pos: "adj",
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


      italian: {
        reply:
          "Mi scusi, può dirmi come arrivare alla stazione?",

        replyWords: [
          {
            surface: "Mi",
            lookup: "mi",
            pos: "pron",
          },
          {
            surface: "scusi",
            lookup: "scusare",
            pos: "verb",
          },
          {
            surface: "può",
            lookup: "potere",
            pos: "verb",
          },
          {
            surface: "dirmi",
            lookup: "dire",
            pos: "verb",
          },
          {
            surface: "come",
            lookup: "come",
            pos: "adv",
          },
          {
            surface: "arrivare",
            lookup: "arrivare",
            pos: "verb",
          },
          {
            surface: "alla",
            lookup: "alla",
            pos: "prep",
          },
          {
            surface: "stazione",
            lookup: "stazione",
            pos: "noun",
          },
        ],
      },


      spanish: {
        reply:
          "Disculpe, ¿puede decirme cómo llegar a la estación?",

        replyWords: [
          {
            surface: "Disculpe",
            lookup: "disculpar",
            pos: "verb",
          },
          {
            surface: "puede",
            lookup: "poder",
            pos: "verb",
          },
          {
            surface: "decirme",
            lookup: "decir",
            pos: "verb",
          },
          {
            surface: "cómo",
            lookup: "cómo",
            pos: "adv",
          },
          {
            surface: "llegar",
            lookup: "llegar",
            pos: "verb",
          },
          {
            surface: "a",
            lookup: "a",
            pos: "prep",
          },
          {
            surface: "la",
            lookup: "la",
            pos: "det",
          },
          {
            surface: "estación",
            lookup: "estación",
            pos: "noun",
          },
        ],
      },


      afrikaans: {
        reply:
          "Verskoon my, kan u vir my sê hoe ek by die treinstasie kom?",

        replyWords: [
          {
            surface: "Verskoon",
            lookup: "verskoon",
            pos: "verb",
          },
          {
            surface: "my",
            lookup: "my",
            pos: "pron",
          },
          {
            surface: "kan",
            lookup: "kan",
            pos: "verb",
          },
          {
            surface: "u",
            lookup: "u",
            pos: "pron",
          },
          {
            surface: "vir",
            lookup: "vir",
            pos: "prep",
          },
          {
            surface: "my",
            lookup: "my",
            pos: "pron",
          },
          {
            surface: "sê",
            lookup: "sê",
            pos: "verb",
          },
          {
            surface: "hoe",
            lookup: "hoe",
            pos: "adv",
          },
          {
            surface: "ek",
            lookup: "ek",
            pos: "pron",
          },
          {
            surface: "by",
            lookup: "by",
            pos: "prep",
          },
          {
            surface: "die",
            lookup: "die",
            pos: "det",
          },
          {
            surface: "treinstasie",
            lookup: "treinstasie",
            pos: "noun",
          },
          {
            surface: "kom",
            lookup: "kom",
            pos: "verb",
          },
        ],
      },


      french: {
        reply:
          "Excusez-moi, pouvez-vous me dire comment aller à la gare ?",

        replyWords: [
          {
            surface: "Excusez-moi",
            lookup: "excuser",
            pos: "verb",
          },
          {
            surface: "pouvez-vous",
            lookup: "pouvoir",
            pos: "verb",
          },
          {
            surface: "me",
            lookup: "me",
            pos: "pron",
          },
          {
            surface: "dire",
            lookup: "dire",
            pos: "verb",
          },
          {
            surface: "comment",
            lookup: "comment",
            pos: "adv",
          },
          {
            surface: "aller",
            lookup: "aller",
            pos: "verb",
          },
          {
            surface: "à",
            lookup: "à",
            pos: "prep",
          },
          {
            surface: "la",
            lookup: "la",
            pos: "det",
          },
          {
            surface: "gare",
            lookup: "gare",
            pos: "noun",
          },
        ],
      },

    },
  },

};
