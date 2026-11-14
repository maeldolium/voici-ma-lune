export const background = new Image();
export const playerFace = new Image();
export const playerIdleRight = new Image();
export const playerIdleLeft = new Image();
export const playerWalkRight = new Image();
export const playerWalkLeft = new Image();

export function loadAssets() {
    return Promise.all([
        loadImage(background, "style/assets/chambre.png"),
        loadImage(playerFace, "style/assets/Posture_Face.png"),
        loadImage(playerIdleLeft, "style/assets/Fixe_G.png"),
        loadImage(playerIdleRight, "style/assets/Fixe_D.png"),
        loadImage(playerWalkLeft, "style/assets/Marche_G.png"),
        loadImage(playerWalkRight, "style/assets/Marche_D.png")
    ])
}

export function loadImage(img, src) {
    return new Promise((resolve, reject) => {
        img.onload = resolve;
        img;onerror = () => reject("Image introuvable :" + src);
        img.src = src;
    })
}
