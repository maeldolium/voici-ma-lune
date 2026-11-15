import { GAME_SIZE } from "./config.js";
import { wrapText, drawContinueHint, setFont } from "./text.js";

// Une réplique est soit une chaîne de caractères,
// soit un objet { text, image } : l'image s'affiche alors en grand au-dessus de la boîte.
let lines = null;
let index = 0;
let onEnd = null;
// Effet machine à écrire : nombre de caractères déjà affichés de la réplique courante
let charsShown = 0;
const CHARS_PER_SECOND = 40;

const BOX = { x: 4, y: 136, width: 184, height: 52 };
const TEXT_X = 10;
const TEXT_Y = 142;
const LINE_HEIGHT = 14;
const MAX_TEXT_WIDTH = 172;

export function openDialogue(newLines, callback = null) {
    lines = newLines;
    index = 0;
    onEnd = callback;
    charsShown = 0;
}

export function isDialogueOpen() {
    return lines !== null;
}

// La réplique courante est-elle entièrement affichée ?
function isLineComplete() {
    return charsShown >= getText(lines[index]).length;
}

// À appeler à chaque image (depuis le update de la scène)
export function updateDialogue(dt) {
    if (lines === null) return;
    charsShown += CHARS_PER_SECOND * dt;
}

// Au tap : si le texte s'écrit encore, on l'affiche d'un coup ;
// s'il est complet, on passe à la réplique suivante.
export function nextLines() {
    if (!isLineComplete()) {
        charsShown = Infinity;
        return;
    }
    index++;
    charsShown = 0;
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
    setFont(ctx, 10);
    ctx.fillStyle = "rgb(223, 223, 223)";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    // On découpe le texte complet (pour que les mots ne sautent pas de ligne en cours d'écriture),
    // puis on n'affiche que les charsShown premiers caractères.
    const rows = wrapText(ctx, getText(line), MAX_TEXT_WIDTH);
    let remaining = Math.floor(charsShown);
    for (let i = 0; i < rows.length; i++) {
        if (remaining <= 0) break;
        ctx.fillText(rows[i].slice(0, remaining), TEXT_X, TEXT_Y + i * LINE_HEIGHT);
        remaining -= rows[i].length;
    }

    // Le triangle n'apparaît que quand la réplique est entièrement écrite
    if (isLineComplete()) {
        drawContinueHint(ctx);
    }
}
