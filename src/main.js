const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const GAME_SIZE = 192;

function resizeGame() {

    const scaleX = Math.floor(window.innerWidth / GAME_SIZE);
    const scaleY = Math.floor(window.innerHeight / GAME_SIZE);

    const scale = Math.max(1, Math.min(scaleX, scaleY));

    canvas.style.width = `${GAME_SIZE * scale}px`;
    canvas.style.height = `${GAME_SIZE * scale}px`;
}

ctx.imageSmoothingEnabled = false;

window.addEventListener('resize', resizeGame);

resizeGame();

const background = new Image()
background.src = '../style/assets/chambre.png';

background.onload = function() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
};



