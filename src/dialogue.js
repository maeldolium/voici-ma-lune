let lines = null;
let index = 0;

function onEnd(){

}

export function openDialogue(newLines) {
    lines = newLines;
    index = 0;
}

export function isDialogueOpen() {
    if(lines) { return true; }
    else { return false ;}
}

export function nextLines() {
    index++;
    if (index >= lines.length) {
        lines = null;
        onEnd();
    }
}

export function drawDialogue(ctx) {
    if(lines === null) return;
    
    ctx.fillStyle = "rgba(35, 25, 60, 0.85)";
    ctx.fillRect(4, 136, 184, 52);
    ctx.strokeStyle = "rgb(223, 223, 223)"
    ctx.lineWidth = 1;
    ctx.strokeRect(4.5, 136.5, 183, 51);

    const text = lines[index];
    let rows = text.split('\n');

    ctx.font = "10px Pixelify Sans";
    ctx.fillStyle = "rgb(223, 223, 223)";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    for (let i = 0; i < rows.length; i++) {
        ctx.fillText(rows[i], 10, 142 + i * 14);
    }
}