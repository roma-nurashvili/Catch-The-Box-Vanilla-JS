const GAME_AREA = document.getElementById("gameArea");
const BOX = document.getElementById("box");
const SCORE = document.getElementById("score");
const TIME = document.getElementById("time");
const GAME_OVER = document.getElementById("gameOver");

let colors = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "crimson",
  "teal",
  "coral",
  "indigo",
  "royalblue",
];

let score = 0;
let time = 30;

function moveBox() {
  let areaWidth = GAME_AREA.clientWidth - BOX.offsetWidth;
  let areaHeight = GAME_AREA.clientHeight - BOX.offsetHeight;

  let halfW = BOX.offsetWidth / 2;
  let halfH = BOX.offsetHeight / 2;

  let x = halfW + Math.round(Math.random() * areaWidth);
  let y = halfH + Math.round(Math.random() * areaHeight);
  
  let randomColor = Math.floor(Math.random() * colors.length);

  BOX.style.left = x + "px";
  BOX.style.top = y + "px";
  BOX.style.backgroundColor = colors[randomColor];
}

let timeInterval = null;
let moveInterval = null;
let gameRunning = false;

function updateDisplay() {
  SCORE.innerHTML = `Score: ${score}`;
  TIME.innerHTML = `Time: ${time}`;
}

function endGame() {
  gameRunning = false;
  clearInterval(timeInterval);
  clearInterval(moveInterval);
  BOX.style.display = "none";
  GAME_OVER.style.display = "flex";
  setTimeout(() => {
    GAME_OVER.style.animation = "goAway 1s ease 5s 1 reverse forwards";
  }, 1000);
}

function startMoveInterval() {
  clearInterval(moveInterval);
  moveInterval = setInterval(moveBox, 1000);
}

function gameStart() {
  GAME_OVER.style.display = "none";
  BOX.style.display = "block";
  clearInterval(timeInterval);

  score = 0;
  time = 30;
  gameRunning = true;
  updateDisplay();
  moveBox();

  timeInterval = setInterval(() => {
    time--;
    updateDisplay();
    if (time <= 0) endGame();
  }, 1000);

  startMoveInterval();
}

BOX.addEventListener("click", () => {
  if (!gameRunning) return;

  score++;
  moveBox();
  updateDisplay();
  startMoveInterval();
});
