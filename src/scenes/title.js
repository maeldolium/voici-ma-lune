import { canvas } from "../screen.js";
import { playScene } from "./play.js";

export const playTitle = {
    draw(ctx) {
        ctx.fillStyle = "rgb(25,35,60)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgb(223, 223, 223)";
        ctx.font = "24px Pixelify Sans";
        ctx.textAlign = "center"
        ctx.fillText("Voici ma lune", canvas.width/2, 96);

        ctx.font = "12px Pixelify Sans";
        ctx.fillText("Touche pour commencer", canvas.width/2, 170);
    },
    onTap(){
        return playScene;
    }
}