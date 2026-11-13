import { initScreen, ctx, canvas } from './screen.js';
import { loadAssets } from './assets.js';
import { changeScene, drawScene, tapScene } from './scenes.js';
import { playScene } from './scenes/play.js';
import { playTitle } from './scenes/title.js';

initScreen();

loadAssets().then(() => {
    changeScene(playTitle);

    function loop(timestamp) {
        drawScene(ctx);
        requestAnimationFrame(loop);
    }

    canvas.addEventListener("pointerdown", tapScene);

    requestAnimationFrame(loop);
});
