// Enemies our player must avoid
class Enemy {
  constructor(x, y, speedFactor) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speedFactor = speedFactor;
  }
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
      this.x += dt * this.speedFactor;
      this.checkForCollision();
  }
  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // Check if enemy and player are occupying the same space
  checkForCollision() {
    if(this.x >= (player.getXCoordinate() - 50) && this.x < (player.getXCoordinate() + 50) && this.y === player.getYCoordinate()) {
      location.reload();
    }
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y) {
    // The image/sprite for our player
    this.sprite = 'images/char-boy.png';
    // Canvas coordinates
    this.x = x;
    this.y = y;
    // Individual moves sizes based on convas coordinates
    this.horizontalMoveSize = 101;
    this.verticalMoveSize = 80;
    // Starting positions based on 5 x 6 xy graph
    this.verticalPosition = -2;
    this.horizontalPosition = 0;
    // Boundary graph values
    this.maxVerticalPosition = 3;
    this.minVerticalPosition = -2;
    this.maxHorizontalPosition = 2;
    this.minHorizontalPosition = -2;
  }
  // Get X coordinate of player
  getXCoordinate() {
    return this.x;
  }
  // Get Y coordinate of player
  getYCoordinate() {
    return this.y;
  }
  // Update the player's position
  // Parameter: keycode, the arrow key pressed
  update(keycode) {
    switch(keycode){
      case 'up':
        this.verticalPosition ++;
        if(this.verticalPosition <= 3){
          this.y -= this.verticalMoveSize;
          this.checkForWin();
        }
        break;
      case 'down':
        this.verticalPosition --;
        if(this.verticalPosition >= -2){
          this.y += this.verticalMoveSize;
        } else {
          // Reset vertical position tracker to min allowed value
          this.verticalPosition = this.minVerticalPosition;
        }
        break;
      case 'left':
        this.horizontalPosition --;
        if(this.horizontalPosition >= -2){
          this.x -= this.horizontalMoveSize;
        } else {
          // Reset horizontal position tracker to min allowed value
          this.horizontalPosition = this.minHorizontalPosition;
        }
        break;
      case 'right':
        this.horizontalPosition ++;
        if(this.horizontalPosition <= 2){
          this.x += this.horizontalMoveSize;
        } else {
          // Reset horizontal postion tracker max allowed value
          this.horizontalPosition = this.maxHorizontalPosition;
        }
        break;
      default:
    }
  }
  // Draw the player on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // Call update method
  handleInput(keycode) {
    if(keycode != null){
      this.update(keycode);
    }
  }
  // Check to determine win
  checkForWin() {
    if(this.verticalPosition === 3){
      // Player wins; reset game
      location.reload();
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = generateEnemies(10);


// Place the player object in a variable called player
const player = new Player(202, 375);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// This creates the specified number of enemy objects and returns them in an array
function generateEnemies(count){
  let enemyArray = [];
  let xPosition = 0;
  let randomIndex = 0;
  const yPositions = [55, 135, 215];
  const speedFactors = [450, 150, 300];
  for (let x = 0; x < count; x++){
    for (let y = 2; y >= 0; y--) {
      //randomIndex = generateRandomNumber(0, 2);
      enemyArray.push(new Enemy(xPosition, yPositions[y], speedFactors[y]));
    }
    xPosition -= 500;
  }
  return enemyArray;
}

function generateRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}
