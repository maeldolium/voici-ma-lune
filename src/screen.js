import { GAME_SIZE } from './config.js';

export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

function resizeGame() {
    // 1. Taille d'affichage : le plus grand multiple entier de 192 qui tient dans la fenêtre
    const scaleX = Math.floor(window.innerWidth / GAME_SIZE);
    const scaleY = Math.floor(window.innerHeight / GAME_SIZE);
    const scale = Math.max(1, Math.min(scaleX, scaleY));

    canvas.style.width = `${GAME_SIZE * scale}px`;
    canvas.style.height = `${GAME_SIZE * scale}px`;

    // 2. Résolution interne = vrais pixels de l'écran (devicePixelRatio = 2 ou 3 sur la plupart des téléphones)
    //    Le texte est ainsi tracé en haute définition au lieu d'être agrandi (et flouté).
    const ratio = scale * (window.devicePixelRatio || 1);
    canvas.width = Math.round(GAME_SIZE * ratio);
    canvas.height = Math.round(GAME_SIZE * ratio);

    // 3. On garde un repère de 192x192 pour tout le reste du code :
    //    chaque unité du jeu est multipliée par "ratio" au moment du dessin.
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    // Redimensionner un canvas réinitialise ses réglages : on remet le rendu pixel net pour les images
    ctx.imageSmoothingEnabled = false;
}

export function initScreen() {
    window.addEventListener('resize', resizeGame);
    resizeGame();
}
