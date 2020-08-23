let order = [];
let clickedOrder = [];
let score = 0;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

const genius = document.querySelector('.genius');
const init = document.querySelector('#play');
const status = document.querySelector('.status');

//cria ordem aleatória de cores
let shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clickedOrder = [];

  for (let i in order) {
    let elementColor = createColorElement(order[i]);
    lightColor(elementColor, Number(i) + 1);
  }
};

//acende a proxima cor
let lightColor = (element, number) => {
  number = number * 500;
  setTimeout(() => {
    element.classList.add('selected');
  }, number - 250);
  setTimeout(() => {
    element.classList.remove('selected');
  }, number);
};

//checa se os botões clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] != order[i]) {
      gameOver();
      return;
    }
  }
  if (clickedOrder.length == order.length) {
    updateScore(score);
    setTimeout(() => {
      nextLevel();
    }, 200);
  }
};

//função para o clique do usuário
let click = (color) => {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add('selected');

  setTimeout(() => {
    createColorElement(color).classList.remove('selected');
    checkOrder();
  }, 250);
};

//função que retorna a cor
let createColorElement = (color) => {
  if (color == 0) {
    return green;
  } else if (color == 1) {
    return red;
  } else if (color == 2) {
    return yellow;
  } else if (color == 3) {
    return blue;
  }
};

//exibi a pontuação na tela
let updateScore = (point) => {
  let score = document.querySelector('#score');
  score.textContent = `Pontuação: ${point}`;
};

let reset = () => {
  order = [];
  clickedOrder = [];
  score = 0;
};

//função para proximo nível do jogo
let nextLevel = () => {
  score++;
  shuffleOrder();
};

//adiciona eventos de clique para as cores
let addButtonColorClick = () => {
  green.onclick = () => click(0);
  red.onclick = () => click(1);
  yellow.onclick = () => click(2);
  blue.onclick = () => click(3);
};

//remove eventos de clique para as cores
let removeButtonColorClick = () => {
  green.onclick = () => {};
  red.onclick = () => {};
  yellow.onclick = () => {};
  blue.onclick = () => {};
};

//função para game over
let gameOver = () => {
  reset();
  status.innerHTML = '<h2>Game Over</h2>';
  removeButtonColorClick();
};

//função de inicio do jogo
let playGame = () => {
  genius.classList.add('rotation');
  reset();
  updateScore(0);

  setTimeout(() => {
    genius.classList.remove('rotation');
    nextLevel();
    addButtonColorClick();
  }, 1000);
};

//inicio do jogo
init.addEventListener('click', () => {
  playGame();
  init.src = './assets/img/reload.svg';
  status.innerHTML = '';
});
