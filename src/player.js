import { playerFace, playerIdleLeft, playerIdleRight, playerWalkLeft, playerWalkRight } from "./assets.js"
import { FLOOR, PLAYER_SCALE, PLAYER_SPEED } from "./config.js";

export const player = {
    x: 80,
    y: 72,
    width: 16 * PLAYER_SCALE,
    heigth: 24 * PLAYER_SCALE,
    targetX: null,
    targetY: null,
    direction: "face",
    animTimer: 0,
}

export function drawPlayer(ctx) {
    ctx.drawImage(getPlayerImage(), Math.round(player.x), Math.round(player.y), player.width, player.heigth);
}

export function setPlayerTarget(x, y){
    y = Math.max(FLOOR.top, Math.min(FLOOR.bottom, y));
    x = Math.max(FLOOR.left + player.width / 2, Math.min(FLOOR.right - player.width / 2, x));
    player.targetX = x - player.width / 2;
    player.targetY = y - player.heigth;
}

export function updatePlayer(dt) {
    if (player.targetX == null) {
        return;
    }
    let dx = player.targetX - player.x;
    let dy = player.targetY - player.y;

    let dist = Math.hypot(dx, dy);

    let step = PLAYER_SPEED * dt;

    if (dist <= step) {
        player.x = player.targetX;
        player.y = player.targetY;

        player.targetX = null;
        player.targetY = null;
        player.animTimer = 0;
    } else {

        if (dx > 0.5) {
            player.direction = "right";
        } else if (dx < -0.5) {
            player.direction = "left";
        }

        player.animTimer += dt;

        player.x += dx / dist * step;
        player.y += dy / dist * step;
    }
}

export function getPlayerImage(){
    if (player.direction === "face") {
        return playerFace;
    } else if (player.targetX === null){
        if (player.direction === "right"){
            return playerIdleRight;
        } else {
            return playerIdleLeft;
        }
    } else {
        const frame = Math.floor(player.animTimer / 0.2) % 2;
        if (frame === 0){
            if (player.direction === "right") {
                return playerIdleRight;
            } else {
                return playerIdleLeft;
            }
        } else {
            if (player.direction === "right") {
                return playerWalkRight;
            } else {
                return playerWalkLeft;
            }
        }
    }
}