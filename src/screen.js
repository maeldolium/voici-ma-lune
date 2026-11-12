import { GAME_SIZE } from './config.js';

export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

function resizeGame() {

    const scaleX = Math.floor(window.innerWidth / GAME_SIZE);
    const scaleY = Math.floor(window.innerHeight / GAME_SIZE);

    const scale = Math.max(1, Math.min(scaleX, scaleY));

    canvas.style.width = `${GAME_SIZE * scale}px`;
    canvas.style.height = `${GAME_SIZE * scale}px`;
}

export function initScreen() {

    ctx.imageSmoothingEnabled = false;

    window.addEventListener('resize', resizeGame);

    resizeGame();
}
