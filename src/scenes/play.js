import { canvas } from '../screen.js';
import { background } from '../assets.js';

export const playScene = {
    draw(ctx) {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    },
};
