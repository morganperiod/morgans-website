const canvas = document.getElementById('minigame-container');
const ctx = canvas.getContext('2d');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
console.log(canvas.width + "   " + canvas.height);

const floorY = 735;

const canvasWidth = canvas.width/document.getElementById('minigame-container').clientWidth;
const canvasHeight = canvas.height/document.getElementById('minigame-container').clientHeight;

/*
function init() {
    //character.x -= 1;
    console.log(character.x);
    // Draw character
    ctx.fillStyle = character.color;
    ctx.fillRect(character.x, character.y, character.width, character.height);

    //requestAnimationFrame(init());
}
*/


let characterImage = new Image();
characterImage.src = 'Assets/Minigames/key4.png';
let character = {
    x: 0,
    y: floorY, // Start near the bottom
    width: 168 * canvasWidth,
    height: 168 * canvasHeight,
    color: 'pink',
    speed: (3.5*10)*1.5,
    gravity: 1*6,
    isJumping: false,
    jumpHeight: (2.8*15)*1.7,
    velocityY: 0,
    currentItem: 'none',
};
/*
speed: 1.5*5,
    gravity: .08*5,
    isJumping: false,
    jumpHeight: 2.8*5,
*/

let background = new Image();
background.src = 'Assets/Minigames/key4_background.png';

let overlay = new Image();
overlay.src = 'Assets/Minigames/overlay.png';

let itemBoxHolder = new Image();
itemBoxHolder.src = 'Assets/Minigames/key_itemHolder.png';

function start() {
    createCollectibles();
    requestAnimationFrame(update);
}

// Key states
const keys = {
    up: false,
    down: false,
    left: false,
    right: false,
};

let lastTime = 0;
const desiredFPS = 10;
const interval = 1000 / desiredFPS;

function update(currentTime) {
    requestAnimationFrame(update);
    const deltaTime = currentTime - lastTime;

    //FRAME CODE HERE!
    if (deltaTime >= interval) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        // Update character's position
        updatecharacter();

        // Draw character image
        ctx.drawImage(characterImage, character.x, character.y, character.width, character.height);

        // Draw Item Box
        ctx.drawImage(itemBoxHolder, 60, 50, 156*canvasWidth, 156*canvasHeight);

        // Draw collectibles
        balloons.forEach(balloon => {
            ctx.drawImage(balloonImage, balloon.x, balloon.y, balloon.width, balloon.height);
        });

        checkCollisions();

        // Draw item
        if (character.currentItem == 'balloon') { ctx.drawImage(balloonImage, 60, 50, 156*canvasWidth, 156*canvasHeight); }

        // Draw scanlines
        ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);

        lastTime = currentTime - (deltaTime % interval);
    }
}

// Update character's position
function updatecharacter() {
    // Horizontal movement
    if (keys.right) {
        character.x += character.speed;
    }
    if (keys.left) {
        character.x -= character.speed;
    }

    // Jumping
    if (keys.up && !character.isJumping) {
        character.isJumping = true;
        character.velocityY = -character.jumpHeight;
    }

    // Apply gravity
    if (character.isJumping) {
        character.velocityY += character.gravity;
        character.y += character.velocityY;

        // Check if character has landed
        if (character.y >= floorY) { // Ground level
            character.y = floorY;
            character.isJumping = false;
            character.velocityY = 0;
        }
    }
}

// Handle key down events
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            keys.up = true;
            break;
        case 'ArrowDown':
            keys.down = true;
            break;
        case 'ArrowLeft':
            keys.left = true;
            break;
        case 'ArrowRight':
            keys.right = true;
            break;
    }
});

// Handle key up events
document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            keys.up = false;
            break;
        case 'ArrowDown':
            keys.down = false;
            break;
        case 'ArrowLeft':
            keys.left = false;
            break;
        case 'ArrowRight':
            keys.right = false;
            break;
    }
});

// Create collectibles
let balloonImage = new Image();
balloonImage.src = 'Assets/Minigames/key4_item_balloon.png'
let balloons = [];
function createCollectibles() {
    for (let i = 0; i < 1; i++) {
        balloons.push({
            x: 700,
            y: floorY,
            width: 156*canvasWidth,
            height: 156*canvasHeight,
            color: 'gold'
        });
    }
}

// Check for collisions
function checkCollisions() {
    if (character.currentItem != 'none') { return true; }

    balloons = balloons.filter(balloon => {
        const collision = character.x < balloon.x + balloon.width &&
                          character.x + character.width > balloon.x &&
                          character.y < balloon.y + balloon.height &&
                          character.y + character.height > balloon.y;

        if (collision) {
            character.currentItem = 'balloon';
            return false; // Remove collectible
        }
        return true; // Keep collectible
    });
}

start();