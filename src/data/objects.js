import { ordinateur, rio, meubleTele, bibliotheque, chaussures } from "../assets.js";

export const OBJECTS = [
    { id: "ordinateur", image: ordinateur, x: 167, y: 96, width: 32, height: 32,
        standX:160, standY: 140, 
        lines: [
            "Mon fidèle outil. Je peux passer\ndes heures à développer dessus...",
            "Un jour je sortirai mes\npropres jeux...",
        ]
    },
    { id: "rio", image: rio, x: 40, y: 130, width: 32 , height: 48,
        standX: 85, standY: 170,
        lines: [
            "Lui, c'est Rio, mon chien.",
            "C'est mon meilleur ami, toujours là\npour moi.",
            "Il aime autant que moi la montagne.",
        ],
    },
    { id: "bibliotheque", image: bibliotheque, x: 4, y: 24, width: 32, height: 48,
        standX: 35, standY: 80,
        lines: [
            "Ma bibliothèque… elle déborde un peu.",
            "J'adore lire : de la science-fiction,\ndes thrillers…",
            "…et un peu de fantasy quand\nj'ai envie de m'évader encore\nplus loin.",
        ],
    },
    { id: "console", image: meubleTele, x: 0, y: 80, width: 32, height: 48,
        standX: 50, standY: 120,
        lines: [
            "Ma console, mon billet pour\nd'autres mondes.",
            "J'aime tous les jeux, tant qu'ils\nme font découvrir un univers.",
            "Et oui… j'avoue, je cours un peu\naprès les trophées.",
        ],
    },
    { id: "chaussures", image: chaussures, x: 96, y: 160, width: 32, height: 32,
        standX: 100, standY: 165,
        lines: [
            "Mes chaussures de course.",
            "Courir, ça me vide la tête et ça\nme pousse à me surpasser.",
            "Le sport, c'est ma façon de souffler.",
        ],
    }
]