import { canvas } from '../screen.js';
import { background } from '../assets.js';
import { drawDialogue, openDialogue, isDialogueOpen, nextLines } from '../dialogue.js';
import { INTRO } from '../data/texts.js';
import { OBJECTS } from '../data/objects.js';
import { drawPlayer, setPlayerTarget, updatePlayer } from '../player.js';

function findObjectAt(x, y){
    for (const obj of OBJECTS){
        if (x >= obj.x && x <= obj.x + obj.width && y >= obj.y && y <= obj.y + obj.height){
            return obj;
        }
    }
    return null;
}

export const playScene = {
    draw(ctx) {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        for(const obj of OBJECTS){
            ctx.drawImage(obj.image, obj.x, obj.y);
        }

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
            let obj = findObjectAt(x, y);
            if (obj){
                setPlayerTarget(obj.standX, obj.standY, () => openDialogue(obj.lines));
            } else {
                setPlayerTarget(x, y);
            }
        }
    },
    update(dt){
        updatePlayer(dt);
    }

};