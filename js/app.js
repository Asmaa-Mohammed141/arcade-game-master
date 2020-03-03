let modal = document.querySelector('.type');
let points = document.querySelector('.type-points');
let replay = document.querySelector('.type-replay');
let mClose = document.querySelector('.type-close');

// Enemies our player must avoid
var Enemy = function (x, y, enm_speed) {

    
    this.x = x;
    this.y = y;
    this.enm_speed = enm_speed;

    // The image of the enemy of cockroach that is added to the playing field 
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {

    
    this.x += this.enm_speed * dt;

    
    if (this.x > 510) {
        this.x = -50;
        this.enm_speed = 150 + Math.floor(Math.random()*200);
    };

    // Checks for collisions between the player and the enemies
    if (player.x < this.x + 81 &&
        player.x + 81 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
    };
};

// Renders the enemy into the game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// The close button click listener to hide the points modal
mClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  // The replay button click listener to continue playing the game
  replay.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  // window click listener to hide the modal
window.addEventListener('click', (even) => {
    if (even.target == modal) {
      modal.style.display = 'none';
    }
  });

var Player = function (x, y) {

    
    this.x = x;
    this.y = y;
    this.score = 0;

    //The image of the player of horn-girl is added to the playing field 
    this.player = 'images/char-boy.png';
};

Player.prototype.update = function (dt) {

    for(let enemy of allEnemies){
        if(player.x < enemy.x + enemy.width && player.x + player.width > enemy.x && player.y < enemy.y + enemy.height && player.y + player.height > enemy.y){
          // console.log('collapsed');
          /** @this Player */
          // if the player get touched by a bug the points is reduced by 3
          if(this.score >= 3){
            this.score -= 3;
          }
          else {
            this.score = 0;
          }
          // reset the position of the player
          this.reset();
        }
      }
};


Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// Allows the user to use the arrow keys to jump 
Player.prototype.handleInput = function (key_Press) {


    if (key_Press == 'left' && this.x > 0) {
        this.x -= 102;
    };


    if (key_Press == 'right' && this.x < 405) {
        this.x += 102;
    };

    if (key_Press == 'up' && this.y > 0) {
        this.y -= 83;
    };

    if (key_Press == 'down' && this.y < 405) {
        this.y += 83;
    };

    // reset to the starting position
    if (this.y < 0) {
        this.score += 1;
        const yourScore = this.score;
        points.innerText = yourScore ;
        modal.style.display = 'block';
        
        // reset the position of the player
       
        setTimeout(function(){
            player.x = 202;
            player.y = 405;
        }, 800);
    };
    
};


// All enemies are placed in an array
var allEnemies = [];

// Location of the 3 enemies on the y axis located on the stone road
// For enemy on the y axis from 0 on the x axis move at a speed of 200
var enemy_pos= [63, 147, 230];
 
for (let locY of enemy_pos){
     enemy = new Enemy(0, locY, 250);
     allEnemies.push(enemy);
}

// The starting location of the player is located at x=200, y=405
var player = new Player(202, 405);

// This listens for key presses and sends the keys to your
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
    
});

