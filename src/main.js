import Stage from './components/stage.js';
import Board from './components/board.js';
import Score from './components/score.js';

export default class Main {
  constructor(){
    this.levelSpeed = 750;
    this.stage = new Stage();
    this.board = new Board();
    this.score = new Score();
  }

  run() {
    let levelSpeed = this.levelSpeed;
    let board = this.board;
    let stage = this.stage;
    let score = this.score;
    let gameEndMessage = {body:'', button: ''};    

    function keyLog(e,board){
      const actions = [];
      actions.key37 = () => board.move('L');
      actions.key38 = () => board.move('U');
      actions.key39 = () => board.move('R');
      actions.key40 = () => board.move('D');
      actions.key81 = () => {
        gameEndMessage = {body: 'You can allways give it another try', button: 'Restart Game'};
        board.gameIsOver = true;
      };

      (actions['key' + e.keyCode]) && actions['key' + e.keyCode]();
    }

    function startGame(e) {
      const grid = document.querySelector('.grid');
      const cover = grid.querySelector('.cover');

      [...grid.children].forEach(row => row.classList.remove('full'));
      setTimeout(() => cover.remove(), 200); 

      document.removeEventListener('click', startGame);
      initGame();
    }

    function endGame(){
      const grid = document.querySelector('.grid');

      let new_row = document.createElement('div');
      new_row.className='cover end-screen noselect';
      new_row.innerHTML = `
        <p>${gameEndMessage.body}</p>
        <div class='button'>${gameEndMessage.button}</div>
      `;
      const btnRestart = new_row.querySelector('div.button');
      btnRestart.addEventListener('click', startGame);

      grid.appendChild(new_row);
      [...grid.children].forEach(row => row.classList.add('full'));

      document.removeEventListener('keydown', handleKeyLog);
    }

    function drop(){
      board.move('D');
      if(!board.gameIsOver){
        setTimeout( drop, levelSpeed - 150 * (board.score.level - 1));
      } else {
        endGame();
      }
    }

    function handleKeyLog(e){
      keyLog(e, board);
    }

    function initGame(){
      score.init();
      board.init();
      gameEndMessage = {body: 'This game is soooo over!', button: 'Try Again'};

      drop();

      document.addEventListener('keydown', handleKeyLog);
      document.addEventListener('mouse', handleKeyLog);
    }

    function startScreen(){
      stage.setup('Javascript Tetris Game - 2020');
      const grid = document.querySelector('.grid');
      let rows = grid.children;

      let new_row = document.createElement('div');
      new_row.className='cover start-screen noselect';
      new_row.innerHTML = `
        <p>Let's start a game!</p>
        <div class='button'>Start now</div>
      `;
      const btnRestart = new_row.querySelector('div.button');
      btnRestart.addEventListener('click', startGame);

      grid.appendChild(new_row);
      [...rows].forEach(row => row.classList.add('full'));
    }

    startScreen();
  }

  
}
