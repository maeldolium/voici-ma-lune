import { fondTitre, luneTitre, morceauTitre1, morceauTitre2, morceauTitre3, morceauTitre4, morceauTitre5 } from '../assets.js';
import { GAME_SIZE } from '../config.js';
import { END_THANKS, END_PRESENTATION, END_CREDITS } from '../data/texts.js';
import { wrapText, drawContinueHint, setFont } from '../text.js';

const PIECES = [morceauTitre1, morceauTitre2, morceauTitre3, morceauTitre4, morceauTitre5];

const PIECE_DELAY = 0.5;                                     // un morceau toutes les 0,5 s
const MOON_REPAIRED_AT = PIECES.length * PIECE_DELAY + 0.5;  // puis la lune entière
const MOON_HOLD = 5;              // temps passé sur "lune réparée + merci" avant la présentation
const PRESENTATION_HOLD = 16;     // temps passé sur la présentation avant les remerciements
const MIN_BEFORE_SKIP = 1;        // un tap passe à l'écran suivant, mais pas avant 1 s

const BLUE = "rgb(25, 35, 60)";
const TEXT_COLOR = "rgb(223, 223, 223)";

// Étapes : "moon" → "presentation" → "credits" (reste affiché)
let phase = "moon";
let phaseTime = 0;

function goTo(next) {
    phase = next;
    phaseTime = 0;
}

// Un titre centré, puis des paragraphes centrés avec retour à la ligne automatique
function drawTextPage(ctx, page) {
    ctx.fillStyle = BLUE;
    ctx.fillRect(0, 0, GAME_SIZE, GAME_SIZE);

    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = TEXT_COLOR;

    setFont(ctx, 14);
    ctx.fillText(page.title, GAME_SIZE / 2, 16);

    setFont(ctx, 10);
    let y = 44;
    for (const paragraph of page.paragraphs) {
        for (const row of wrapText(ctx, paragraph, 168)) {
            ctx.fillText(row, GAME_SIZE / 2, y);
            y += 13;
        }
        y += 6; // espace entre deux paragraphes
    }
}

function drawMoonPhase(ctx) {
    ctx.drawImage(fondTitre, 0, 0);

    if (phaseTime < MOON_REPAIRED_AT) {
        // Les morceaux se posent un par un
        const shown = Math.min(PIECES.length, Math.floor(phaseTime / PIECE_DELAY));
        for (let i = 0; i < shown; i++) {
            ctx.drawImage(PIECES[i], 0, 0);
        }
        return;
    }

    ctx.drawImage(luneTitre, 0, 0);

    setFont(ctx, 12);
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = TEXT_COLOR;
    for (let i = 0; i < END_THANKS.length; i++) {
        ctx.fillText(END_THANKS[i], GAME_SIZE / 2, 110 + i * 18);
    }
    drawContinueHint(ctx);
}

export const endScene = {
    enter() {
        goTo("moon");
    },

    update(dt) {
        phaseTime += dt;
        if (phase === "moon" && phaseTime >= MOON_REPAIRED_AT + MOON_HOLD) {
            goTo("presentation");
        } else if (phase === "presentation" && phaseTime >= PRESENTATION_HOLD) {
            goTo("credits");
        }
    },

    draw(ctx) {
        if (phase === "moon") {
            drawMoonPhase(ctx);
        } else if (phase === "presentation") {
            drawTextPage(ctx, END_PRESENTATION);
            drawContinueHint(ctx);
        } else {
            drawTextPage(ctx, END_CREDITS);
        }
    },

    // Un tap permet d'avancer sans attendre la fin du délai
    onTap() {
        if (phase === "moon" && phaseTime >= MOON_REPAIRED_AT + MIN_BEFORE_SKIP) {
            goTo("presentation");
        } else if (phase === "presentation" && phaseTime >= MIN_BEFORE_SKIP) {
            goTo("credits");
        }
    },
};
