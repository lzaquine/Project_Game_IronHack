const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
//screens
const titleScreen = document.getElementById('title-screen');
const levelsScreen = document.getElementById('levels');
const gameOverScreen = document.getElementById('game-over-screen')
const bgTVScreen = document.getElementById('bk-tv')
const titleButton = document.getElementById('title-button');
const restartButton = document.getElementById('restart-button');
const normalButton = document.getElementById('btn-normal');
const upsideDownButton = document.getElementById('btn-upsideDown');

titleButton.onclick = () => {
    titleScreen.classList.toggle('hidden')
    levelsScreen.classList.toggle('hidden')
}

normalButton.onclick = () => {
    levelsScreen.classList.toggle('hidden')
    canvas.classList.toggle('hidden')
    bgTVScreen.classList.toggle('hidden')
    start()
}
upsideDownButton.onclick = () => {
    levelsScreen.classList.toggle('hidden')
    canvas.classList.toggle('hidden')
    bgTVScreen.classList.toggle('hidden')


    startUpsideDown()
} 

restartButton.onclick = () => {
    gameOverScreen.classList.toggle('hidden')
    titleScreen.classList.toggle('hidden')
}

const cWidth = canvas.width;
const cHeight = canvas.height;
    

let player;
let gravity;
let obstacles = [];
let gameSpeed;
let keys = {};
let interval = null;
let isRunning = false;
let frames = 0;


function start() {
    interval = setInterval(update, 1000 / 60);
    isRunning = true; 
    gameSpeed = 15;
    gravity = 0.9;
    player = new Player(125, 10, 50, 100);
};

function startUpsideDown() {
    interval = setInterval(update, 1000 / 60);
    isRunning = true; 
    gameSpeed = 15;
    gravity = 0.9;
    player = new Player2(125, 5, 50, 100);
    /* backgroundImg = backgroundImg(); */
};

// Start ao contratio

let initialSpawTimer = 100;
let spawnTimer = initialSpawTimer;

function update() {
    ctx.clearRect(0, 0, cWidth, cHeight);

    spawnTimer--;
    if(spawnTimer <= 0) {
       spawnObstacle();
        //spawnObstacle2();
        spawnTimer = initialSpawTimer - gameSpeed * 25;

        if (spawnTimer < 60) {
            spawnTimer = 60;
        };
    };

    for (let i = 0; i < obstacles.length; i++) {
        let demon = obstacles[i];
        if (demon.x + demon.width < 0) {
            obstacles.splice(i, 1);
        };

   /*      colision(enemy) {
    return !(
      this.bottom() < enemy.top() ||
      this.top() > enemy.bottom() ||
      this.right() < enemy.left() ||
      this.left() > enemy.right()
    );
  } */
        if (player.colision(demon)) {
          obstacles = [];
          clearInterval(interval);
          isRunning = false;
          spawnTimer;
          gameSpeed = 15;
          canvas.classList.toggle('hidden')
          gameOverScreen.classList.toggle('hidden')
          bgTVScreen.classList.toggle('hidden')

        };
        // quando passa pelo x e do width do player, mas pertinho, ainda acaba o jogo com a posicao do demon mais pra tras
        

        demon.update();
    };

    player.animate();
    /* player2.animate(); */

    gameSpeed += 0.005;

};

/* function myBk() {
    document.body.style.backgroundImage = "url('../docs/assets/images/strangerT_gameStart.png')";
}; */ // TA COM A IMG DE FUNDO APARECENDO QUANDO CLICO O BOTAO
/* 
const startBtn = document.getElementById("start");
const upsideDownBtn = document.getElementById("upside-down");
startBtn.addEventListener("click", start);
upsideDownBtn.addEventListener("click", startUpsideDown); */




// classe e funcao diferenca


// criar funcao reset com tudo 0 pra colocar dentro do start ou stop dai aperto o botao e vai

//cortar as imgs
// background image como fazer a troca delas com js ou css?
// jogo ta mt rapido quando clico no botao mais de 1x

// bonus-> criar uma outra classe de demons, so que puxando aquela mesma e usar mais um loop pra criar os demons