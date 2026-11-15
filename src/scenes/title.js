import { setFont } from '../text.js';
import {
    fondTitre, luneTitre, luneBrisee, titre,
    morceauTitre1, morceauTitre2, morceauTitre3, morceauTitre4, morceauTitre5,
} from "../assets.js";
import { GAME_SIZE } from "../config.js";
import { changeScene } from "../scenes.js";
import { playScene } from "./play.js";

// Les morceaux sont des images 192x192 : chacun est dessiné à sa place dans la lune.
// cx / cy = centre approximatif du morceau, pour le faire tourner sur lui-même.
const PIECES = [
    { img: morceauTitre1, cx: 95, cy: 60 },
    { img: morceauTitre2, cx: 117, cy: 57 },
    { img: morceauTitre3, cx: 80, cy: 52 },
    { img: morceauTitre4, cx: 80, cy: 25 },
    { img: morceauTitre5, cx: 111, cy: 27 },
];
const MOON_CENTER = { x: 98, y: 43 };

const CRACK_DURATION = 0.7;   // la lune fissurée tremble
const EXPLODE_DURATION = 1.6; // les morceaux volent puis tombent
const GRAVITY = 260;          // en pixels par seconde²

// Étapes : "idle" (lune entière) → "cracked" (lune fissurée) → "exploding" (morceaux) → chambre
let phase = "idle";
let phaseTime = 0;
let flying = [];

function startExplosion() {
    flying = PIECES.map((piece) => {
        // Chaque morceau part dans la direction "centre de la lune → centre du morceau"
        const dx = piece.cx - MOON_CENTER.x;
        const dy = piece.cy - MOON_CENTER.y;
        const len = Math.hypot(dx, dy) || 1;
        const speed = 50 + Math.random() * 40;
        return {
            ...piece,
            offsetX: 0,
            offsetY: 0,
            vx: (dx / len) * speed,
            vy: (dy / len) * speed - 70, // petite impulsion vers le haut avant de retomber
            angle: 0,
            spin: (Math.random() - 0.5) * 8,
        };
    });
}

function drawPrompt(ctx) {
    if (Math.floor(performance.now() / 600) % 2 !== 0) return;
    setFont(ctx, 10);
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = "rgb(223, 223, 223)";
    ctx.fillText("Touche pour commencer", GAME_SIZE / 2, 160);
}

export const playTitle = {
    enter() {
        phase = "idle";
        phaseTime = 0;
        flying = [];
    },

    update(dt) {
        phaseTime += dt;

        if (phase === "cracked" && phaseTime >= CRACK_DURATION) {
            phase = "exploding";
            phaseTime = 0;
            startExplosion();
        } else if (phase === "exploding") {
            for (const p of flying) {
                p.vy += GRAVITY * dt;
                p.offsetX += p.vx * dt;
                p.offsetY += p.vy * dt;
                p.angle += p.spin * dt;
            }
            if (phaseTime >= EXPLODE_DURATION) {
                changeScene(playScene);
            }
        }
    },

    draw(ctx) {
        ctx.drawImage(fondTitre, 0, 0);

        if (phase === "idle") {
            ctx.drawImage(luneTitre, 0, 0);
            ctx.drawImage(titre, 0, 0);
            drawPrompt(ctx);
        } else if (phase === "cracked") {
            // Tremblement : décalage aléatoire d'un pixel
            const shakeX = Math.round((Math.random() - 0.5) * 2);
            const shakeY = Math.round((Math.random() - 0.5) * 2);
            ctx.drawImage(luneBrisee, shakeX, shakeY);
            ctx.drawImage(titre, 0, 0);
        } else if (phase === "exploding") {
            for (const p of flying) {
                // On se place au centre du morceau, on tourne, puis on dessine l'image décalée
                ctx.save();
                ctx.translate(Math.round(p.cx + p.offsetX), Math.round(p.cy + p.offsetY));
                ctx.rotate(p.angle);
                ctx.drawImage(p.img, -p.cx, -p.cy);
                ctx.restore();
            }
            ctx.drawImage(titre, 0, 0);
        }
    },

    onTap() {
        // On ne lance l'animation qu'une fois ; les taps suivants sont ignorés
        if (phase === "idle") {
            phase = "cracked";
            phaseTime = 0;
        }
    },
};
