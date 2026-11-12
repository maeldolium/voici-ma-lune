import { initScreen, ctx } from './screen.js';
import { loadAssets } from './assets.js';
import { changeScene, drawScene } from './scenes.js';
import { playScene } from './scenes/play.js';

initScreen();

loadAssets().then(() => {
    changeScene(playScene);
    drawScene(ctx);
});
