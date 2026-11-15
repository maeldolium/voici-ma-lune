import { toGameCoords } from "./input.js";

let currentScene = null;

export function changeScene(scene) {
    currentScene = scene;
    currentScene.enter?.();
}

export function updateScene(dt) {
    currentScene.update?.(dt);
}

export function drawScene(ctx) {
    currentScene.draw(ctx);
}

export function tapScene(event) {
    let pos = toGameCoords(event);
    const nextScene = currentScene?.onTap?.(pos.x, pos.y);
    if(nextScene){
        changeScene(nextScene);
    }
}
