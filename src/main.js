import { initScreen, ctx, canvas } from './screen.js';
import { loadAssets } from './assets.js';
import { changeScene, drawScene, tapScene, updateScene } from './scenes.js';
import { playScene } from './scenes/play.js';
import { playTitle } from './scenes/title.js';



initScreen();

loadAssets().then(() => {

    changeScene(playTitle);
    
    let lastTime = null;

    function loop(timestamp) {

        if (!lastTime) {
            lastTime = timestamp;
        }

        const dt = Math.min((timestamp - lastTime) / 1000, 0.1);
        lastTime = timestamp

        updateScene(dt);
        drawScene(ctx);

        requestAnimationFrame(loop);
    }

    canvas.addEventListener("pointerdown", tapScene);

    requestAnimationFrame(loop);

}).catch((error) => {
    console.error(error);
});
