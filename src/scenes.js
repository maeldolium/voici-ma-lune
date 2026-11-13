let currentScene = null;

export function changeScene(scene) {
    currentScene = scene;
    currentScene.enter?.();
}

export function drawScene(ctx) {
    currentScene.draw(ctx);
}

export function tapScene(ctx) {
    const nextScene = currentScene?.onTap?.();
    if(nextScene){
        changeScene(nextScene);
    }
}
