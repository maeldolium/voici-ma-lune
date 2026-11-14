import { GAME_SIZE } from "./config.js";
import { canvas } from "./screen.js";


export function toGameCoords(event) {
    let rect = canvas.getBoundingClientRect();
    
    let tap_x = (event.clientX - rect.left) / rect.width * GAME_SIZE;
    
    let tap_y = (event.clientY - rect.top) / rect.height * GAME_SIZE;

    return {x: tap_x, y: tap_y};
}