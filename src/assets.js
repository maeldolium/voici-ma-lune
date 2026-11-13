export const background = new Image();

export function loadAssets() {
    return new Promise((resolve) => {
        background.onload = resolve;
        background.src = 'style/assets/chambre.png';
    });
}
