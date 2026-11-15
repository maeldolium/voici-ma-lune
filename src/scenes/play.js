import { setFont } from '../text.js';
import { GAME_SIZE } from '../config.js';
import {
    background,
    morceauLune1, morceauLune2, morceauLune3, morceauLune4, morceauLune5,
    ensembleLune1, ensembleLune2, ensembleLune3, luneEntiere,
} from '../assets.js';
import { drawDialogue, openDialogue, isDialogueOpen, nextLines, updateDialogue } from '../dialogue.js';
import { INTRO, FRAGMENT_FOUND, ALL_FOUND } from '../data/texts.js';
import { OBJECTS } from '../data/objects.js';
import { drawPlayer, setPlayerTarget, updatePlayer } from '../player.js';
import { game } from '../game.js';
import { changeScene } from '../scenes.js';
import { endScene } from './end.js';

// Le n-ième morceau trouvé, quel que soit l'objet (pour que la lune s'assemble toujours dans le même ordre)
const PIECES = [morceauLune1, morceauLune2, morceauLune3, morceauLune4, morceauLune5];

// La lune dans la fenêtre selon le nombre de morceaux trouvés (index 0 = aucun morceau)
const MOON_STAGES = [null, morceauLune1, ensembleLune1, ensembleLune2, ensembleLune3, luneEntiere];
const MOON_POS = { x: 80, y: 18 }; // centrée dans la fenêtre de la chambre

function findObjectAt(x, y) {
    for (const obj of OBJECTS) {
        if (x >= obj.x && x <= obj.x + obj.width && y >= obj.y && y <= obj.y + obj.height) {
            return obj;
        }
    }
    return null;
}

// Appelée quand le perso arrive devant un objet
function interact(obj) {
    // Morceau déjà récupéré : on relit juste le texte
    if (game.found.includes(obj.id)) {
        openDialogue(obj.lines);
        return;
    }

    const n = game.found.length + 1;
    const total = OBJECTS.length;

    // [...obj.lines] crée une copie du tableau, pour ne pas modifier les données d'origine
    const lines = [...obj.lines];
    lines.push({
        text: FRAGMENT_FOUND.replace("{n}", n).replace("{total}", total),
        image: PIECES[n - 1],
    });

    // Le morceau n'est ajouté (et la lune mise à jour) qu'une fois le dialogue fermé
    openDialogue(lines, () => {
        game.found.push(obj.id);
        if (game.found.length === total) {
            // Dernier morceau : la lune est complète dans la fenêtre, puis écran de fin
            openDialogue(ALL_FOUND, () => changeScene(endScene));
        }
    });
}

function drawMoonProgress(ctx) {
    const stage = MOON_STAGES[game.found.length];
    if (stage) {
        ctx.drawImage(stage, MOON_POS.x, MOON_POS.y);
    }

    // Compteur en haut à droite
    setFont(ctx, 10);
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillText(`${game.found.length}/${OBJECTS.length}`, 189, 4);
    ctx.fillStyle = "rgb(223, 223, 223)";
    ctx.fillText(`${game.found.length}/${OBJECTS.length}`, 188, 3);
}

export const playScene = {
    enter() {
        game.found = [];
        openDialogue(INTRO);
    },

    update(dt) {
        updatePlayer(dt);
        updateDialogue(dt);
    },

    draw(ctx) {
        ctx.drawImage(background, 0, 0, GAME_SIZE, GAME_SIZE);
        drawMoonProgress(ctx);

        for (const obj of OBJECTS) {
            ctx.drawImage(obj.image, obj.x, obj.y);
        }

        drawPlayer(ctx);
        drawDialogue(ctx);
    },

    onTap(x, y) {
        if (isDialogueOpen()) {
            nextLines();
            return;
        }
        const obj = findObjectAt(x, y);
        if (obj) {
            setPlayerTarget(obj.standX, obj.standY, () => interact(obj));
        } else {
            setPlayerTarget(x, y);
        }
    },
};
