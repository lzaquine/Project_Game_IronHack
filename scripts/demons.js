class Obstacle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = -gameSpeed;

    const img2 = new Image();
    img2.addEventListener("load", () => {});
    img2.src = "./docs/assets/images/smalldemon-removebg-preview.png";
    this.img2 = img2;
  };

  left() {
    return this.x;
  };

  right() {
    return this.x + this.width;
  };

  top() {
    return this.y;
  };

  bottom() {
    return this.y + this.height;
  };

  update() {
    this.x += this.speedX;
    this.demonDraw();
    this.speedX = -gameSpeed;
  };

  demonDraw() {
    ctx.drawImage(this.img2, this.x, this.y, this.width, this.height);
  };
};

function spawnObstacle() {
    let size = demonSize(65, 65);
    let obstacle;

    if (player.y <= 50) {
        obstacle = new Obstacle2(700, 0, size, size);
    } else {
        obstacle = new Obstacle(730 + size, 552 - size, size, size);
    };

    obstacles.push(obstacle);
};

function demonSize(min, max){
    return Math.round(Math.random() * (max-min) + min);
};