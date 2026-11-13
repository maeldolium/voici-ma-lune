import { canvas } from '../screen.js';
import { background } from '../assets.js';
import { drawDialogue, openDialogue, isDialogueOpen, nextLines } from '../dialogue.js';
import { INTRO } from '../data/texts.js';

export const playScene = {
    draw(ctx) {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        drawDialogue(ctx)
    },
    enter(){
        openDialogue(INTRO);
    },
    onTap(){
        if (isDialogueOpen()){
            nextLines();
        }
    }
};
