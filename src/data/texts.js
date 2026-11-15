export const INTRO = [
    "Oh non…\nLa lune s'est brisée !",
    "Ses 5 morceaux sont tombés\nau milieu de mes affaires.",
    "Aide-moi à les retrouver :\nchacun te dévoilera un petit\nsecret sur moi.",
];

// Ajoutée automatiquement quand on trouve un morceau.
// {n} et {total} sont remplacés par les bons nombres.
export const FRAGMENT_FOUND = "Tu as trouvé un morceau de lune ! ({n}/{total})";

// Après le dernier morceau, juste avant l'écran de fin.
export const ALL_FOUND = [
    "Tous les morceaux sont réunis !",
    "Levons les yeux vers le ciel…",
];

// --- Écran de fin ---

// 1. Sous la lune réparée (une ligne par élément)
export const END_THANKS = [
    "Ma lune est réparée !",
    "Merci de m'avoir aidé.",
];

// 2. Présentation (retour à la ligne automatique)
export const END_PRESENTATION = {
    title: "Moi, c'est Maël",
    paragraphs: [
        "Étudiant ingénieur et dev, j'aide Lou sur le Zine : idées, relecture, corrections…",
        "Quand je ne code pas, je lis, je joue, je cours… et je passe du temps avec Rio.",
        "Ce petit jeu est mon premier pas vers un rêve : créer mes propres jeux vidéo.",
    ],
};

// 3. Remerciements (reste affiché à la fin)
export const END_CREDITS = {
    title: "Merci !",
    paragraphs: [
        "À Lou, pour ce Zine et pour m'y avoir fait une place.",
        "À Léa, pour tous les dessins du jeu, réalisés en un temps record.",
        "Et à toi, d'avoir joué jusqu'au bout !",
    ],
};
