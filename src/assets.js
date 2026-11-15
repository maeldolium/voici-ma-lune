// --- Chambre et personnage ---
export const background = new Image();
export const playerFace = new Image();
export const playerIdleRight = new Image();
export const playerIdleLeft = new Image();
export const playerWalkRight = new Image();
export const playerWalkLeft = new Image();

// --- Objets interactifs ---
export const ordinateur = new Image();
export const rio = new Image();
export const chaussures = new Image();
export const bibliotheque = new Image();
// (pas "console" : ce nom masquerait l'objet global console.log)
export const meubleTele = new Image();

// --- Écran titre et fin (images 192x192 à superposer) ---
export const titre = new Image();
export const luneBrisee = new Image();
export const luneTitre = new Image();
export const fondTitre = new Image();
export const morceauTitre1 = new Image();
export const morceauTitre2 = new Image();
export const morceauTitre3 = new Image();
export const morceauTitre4 = new Image();
export const morceauTitre5 = new Image();

// --- Petite lune (32x32) : morceaux seuls et étapes d'assemblage ---
export const morceauLune1 = new Image();
export const morceauLune2 = new Image();
export const morceauLune3 = new Image();
export const morceauLune4 = new Image();
export const morceauLune5 = new Image();
export const ensembleLune1 = new Image();
export const ensembleLune2 = new Image();
export const ensembleLune3 = new Image();
export const luneEntiere = new Image();

export function loadAssets() {
    return Promise.all([
        loadImage(background, "style/assets/chambre.png"),
        loadImage(playerFace, "style/assets/Posture_Face.png"),
        loadImage(playerIdleLeft, "style/assets/Fixe_G.png"),
        loadImage(playerIdleRight, "style/assets/Fixe_D.png"),
        loadImage(playerWalkLeft, "style/assets/Marche_G.png"),
        loadImage(playerWalkRight, "style/assets/Marche_D.png"),

        loadImage(ordinateur, "style/assets/ordinateur.png"),
        loadImage(rio, "style/assets/rio.png"),
        loadImage(chaussures, "style/assets/Chaussures_Course.png"),
        loadImage(bibliotheque, "style/assets/bibliotheque.png"),
        loadImage(meubleTele, "style/assets/console.png"),

        loadImage(titre, "style/assets/titre.png"),
        loadImage(luneBrisee, "style/assets/lune_brisee.png"),
        loadImage(luneTitre, "style/assets/lune_titre.png"),
        loadImage(fondTitre, "style/assets/fond_titre.png"),
        loadImage(morceauTitre1, "style/assets/morceau1_titre.png"),
        loadImage(morceauTitre2, "style/assets/morceau2_titre.png"),
        loadImage(morceauTitre3, "style/assets/morceau3_titre.png"),
        loadImage(morceauTitre4, "style/assets/morceau4_titre.png"),
        loadImage(morceauTitre5, "style/assets/morceau5_titre.png"),

        loadImage(morceauLune1, "style/assets/Premier_Morceau.png"),
        loadImage(morceauLune2, "style/assets/Deuxieme_Morceau.png"),
        loadImage(morceauLune3, "style/assets/Troisieme_Morceau.png"),
        loadImage(morceauLune4, "style/assets/Quatrieme_Morceau.png"),
        loadImage(morceauLune5, "style/assets/Cinquieme_Morceau.png"),
        loadImage(ensembleLune1, "style/assets/Premier_Ensemble.png"),
        loadImage(ensembleLune2, "style/assets/Deuxieme_Ensemble_.png"),
        loadImage(ensembleLune3, "style/assets/Troisieme_Ensemble.png"),
        loadImage(luneEntiere, "style/assets/Lune_Entiere.png"),
    ]);
}

export function loadImage(img, src) {
    return new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject("Image introuvable : " + src);
        img.src = src;
    });
}
