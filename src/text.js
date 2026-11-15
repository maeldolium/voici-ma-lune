import { FONT_FAMILY, FONT_SCALE } from "./config.js";

// Règle la police du jeu. size = taille "de base" (celle qu'on utilisait avec Pixelify Sans).
export function setFont(ctx, size) {
    ctx.font = `${Math.round(size * FONT_SCALE)}px "${FONT_FAMILY}"`;
}

// Outils de texte partagés (dialogue, écran de fin…)

// Découpe un texte en lignes qui tiennent dans maxWidth.
// Les \n restent possibles pour forcer un retour à la ligne.
// Attention : régler la police (setFont) AVANT d'appeler cette fonction (measureText en dépend).
export function wrapText(ctx, text, maxWidth) {
    const rows = [];
    for (const paragraph of text.split("\n")) {
        let current = "";
        for (const word of paragraph.trim().split(" ")) {
            const test = current ? current + " " + word : word;
            if (current && ctx.measureText(test).width > maxWidth) {
                rows.push(current);
                current = word;
            } else {
                current = test;
            }
        }
        rows.push(current);
    }
    return rows;
}

// Petit triangle clignotant en bas à droite : "touche pour continuer"
export function drawContinueHint(ctx) {
    if (Math.floor(performance.now() / 400) % 2 !== 0) return;
    ctx.fillStyle = "rgb(223, 223, 223)";
    ctx.beginPath();
    ctx.moveTo(176, 178);
    ctx.lineTo(184, 178);
    ctx.lineTo(180, 182);
    ctx.closePath();
    ctx.fill();
}
