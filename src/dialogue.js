import { GAME_SIZE } from "./config.js";
import { wrapText, drawContinueHint } from "./text.js";

// Une réplique est soit une chaîne de caractères,
// soit un objet { text, image } : l'image s'affiche alors en grand au-dessus de la boîte.
let lines = null;
let index = 0;
let onEnd = null;

const BOX = { x: 4, y: 136, width: 184, height: 52 };
const TEXT_X = 10;
const TEXT_Y = 142;
const LINE_HEIGHT = 14;
const MAX_TEXT_WIDTH = 172;

export function openDialogue(newLines, callback = null) {
    lines = newLines;
    index = 0;
    onEnd = callback;
}

export function isDialogueOpen() {
    return lines !== null;
}

export function nextLines() {
    index++;
    if (index >= lines.length) {
        lines = null;
        // même astuce que pour onArrive : on met le callback de côté avant de l'appeler
        const callback = onEnd;
        onEnd = null;
        callback?.();
    }
}

function getText(line) {
    return typeof line === "string" ? line : line.text;
}

export function drawDialogue(ctx) {
    if (lines === null) return;

    const line = lines[index];

    // Image mise en avant (ex : le morceau de lune trouvé)
    if (line.image) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
        ctx.fillRect(0, 0, GAME_SIZE, GAME_SIZE);
        const size = 64;
        ctx.drawImage(line.image, (GAME_SIZE - size) / 2, 62, size, size);
    }

    // Boîte
    ctx.fillStyle = "rgba(35, 25, 60, 0.85)";
    ctx.fillRect(BOX.x, BOX.y, BOX.width, BOX.height);
    ctx.strokeStyle = "rgb(223, 223, 223)";
    ctx.lineWidth = 1;
    ctx.strokeRect(BOX.x + 0.5, BOX.y + 0.5, BOX.width - 1, BOX.height - 1);

    // Texte (la police doit être réglée AVANT wrapText, car measureText en dépend)
    ctx.font = "10px Pixelify Sans";
    ctx.fillStyle = "rgb(223, 223, 223)";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    const rows = wrapText(ctx, getText(line), MAX_TEXT_WIDTH);
    for (let i = 0; i < rows.length; i++) {
        ctx.fillText(rows[i], TEXT_X, TEXT_Y + i * LINE_HEIGHT);
    }

    drawContinueHint(ctx);
}
