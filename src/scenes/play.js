import { canvas } from '../screen.js';
import { background } from '../assets.js';
import { drawDialogue, openDialogue, isDialogueOpen, nextLines } from '../dialogue.js';
import { INTRO } from '../data/texts.js';
import { drawPlayer, setPlayerTarget, updatePlayer } from '../player.js';

export const playScene = {
    draw(ctx) {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        drawPlayer(ctx);
        drawDialogue(ctx);
    },
    enter(){
        openDialogue(INTRO);
    },
    onTap(x, y){
        if (isDialogueOpen()){
            nextLines();
        } else {
            setPlayerTarget(x, y);
        }
    },
    update(dt){
        updatePlayer(dt);
    }
};