let currentScene = null;

export function changeScene(scene) {
    currentScene = scene;
}

export function drawScene(ctx) {
    currentScene.draw(ctx);
}
