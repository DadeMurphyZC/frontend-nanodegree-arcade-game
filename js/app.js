var blockWidth = 101;
var blockHeight = 83;
var pStartX = 2 * blockWidth;
var pStartY = 5 * blockHeight;
var min = 125;
var max = 500;

// Enemies our player must avoid
var Enemy = function (startX, startY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = startX;
    this.y = startY;
    this.speed = Math.random() * (max - min) + min;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.reset();
    };
    if (this.x > player.x + 0 && this.x < player.x + 50 && this.y > player.y + 0 && this.y < player.y + 50) {
        player.reset();
    }
};

// Reset the enemy when it goes off the map and set random speed
Enemy.prototype.reset = function () {
    this.x = 0;
    this.speed = Math.random() * (max - min) + min;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Set keyboard controls
Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'left':
            this.x = this.x - (blockWidth);
            break;
        case 'right':
            this.x = this.x + (blockWidth);
            break;
        case 'up':
            this.y = this.y - (blockHeight);
            break;
        case 'down':
            this.y = this.y + (blockHeight);
            break;
    }

    // condition statements to keep player on the board and win condition
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.y > 425) {
        this.y = 425;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.y <= -10) {
        this.y = -10;
        this.won();
    }
};

Player.prototype.update = function () {
    this.x = this.x;
    this.y = this.y;
};

// Alert a win and reset the player
Player.prototype.won = function () {
    window.alert("You've Won!\nPress ok to play again!");
    this.reset();
};

// Reset player to starting (x,y)
Player.prototype.reset = function () {
    this.x = (blockWidth * 2);
    this.y = (blockHeight * 4.5);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(0, (blockHeight - 25));
var enemy2 = new Enemy(0, (blockHeight + 60));
var enemy3 = new Enemy(0, (blockHeight + 145));
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player((blockWidth * 2), (blockHeight * 4.5));



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});