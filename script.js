// Canvas variables
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let canvasWidth = 1200;
let canvasHeight = 400;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Game variables
let interval;
let gameOver = false;
let score = 0;

// Dinosaur variables
let dino = {
  x: 100,
  y: 300,
  width: 100,
  height: 100,
  velocity: 0,
  gravity: 0.000005,
  jumpStrength: 0.05,
  isJumping: false,
  draw: function () {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
  jump: function () {
    if (!this.isJumping) {
      this.isJumping = true;
      this.velocity = -this.jumpStrength;
    }
  },
  update: function () {
    if (this.isJumping) {
      this.y += this.velocity;
      this.velocity += this.gravity;

      if (this.y > 300) {
        this.y = 300;
        this.velocity = 0;
        this.isJumping = false;
      }
    }
  },
};

// Cactus variables
let cactus = {
  x: canvasWidth - 200,
  y: 320,
  width: 100,
  height: 100,
  speed: 0.05,
  draw: function () {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
  update: function () {
    this.x -= this.speed;

    if (this.x < -this.width) {
      this.x = canvasWidth + Math.random() * 200;
      score++;
    }

    // Collision detection
    if (
      dino.x < this.x + this.width &&
      dino.x + dino.width > this.x &&
      dino.y < this.y + this.height &&
      dino.y + dino.height > this.y
    ) {
      gameOver = true;
      clearInterval(interval);
    }
  },
};

// Draw function
function draw() {
  // Draw dinosaur
  dino.draw();

  // Draw cactus
  cactus.draw();

  // Draw score
  ctx.fillStyle = "black";
  ctx.font = "40px Arial";
  ctx.fillText("Score: " + score, 20, 50);
}

// Jump event listener
document.addEventListener("keydown", function (event) {
  if (event.code === "Space" && !gameOver) {
    dino.jump();
  }
});

// Update function
function update() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update dinosaur
  dino.update();

  // Update cactus
  cactus.update();

  // Draw everything
  draw();

  // Game over check
  if (gameOver) {
    ctx.fillStyle = "black";
    ctx.font = "60px Arial";
    ctx.fillText("Game Over!", canvasWidth / 2 - 160, canvasHeight / 2);
  } else {
    // Repeat
    requestAnimationFrame(update);
  }
}

// Start game
interval = setInterval(update, 100);
