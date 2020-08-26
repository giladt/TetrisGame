import Stage from './components/stage.js';
import Board from './components/board.js';
import Score from './components/score.js';

export default class Main {
  constructor(){
    this.levelSpeed = 750;
    this.stage = new Stage();
    this.board = new Board();
    this.score = new Score();
    this.keyListener = null;
  }

  run() {
    let intervalID;
    let levelSpeed = this.levelSpeed;
    let board = this.board;
    let stage = this.stage;
    let score = this.score;
    let keyListener = this.keyListener;

    function keyLog(e,board){
      console.log('keypress');
      switch(e.keyCode){
        case(81): 
          board.gameIsOver = true;
          endGame();
          break;
        case(37): 
          board.move('L'); 
          break;
        case(39): 
          board.move('R');
          break;
        case(40): 
          board.move('D');
          break;
        case(38): 
          board.move('U');
          break;  
      }    
    }

    function restartGame(e) {
      const grid = document.querySelector('.grid');
      const over = grid.querySelector('.over');

      console.log('restart', e.currentTarget);
      [...grid.children].forEach(row => row.classList.remove('full'));
      over.remove();

      startGame();
    }

    function endGame(){

      const grid = document.querySelector('.grid');
      let rows = grid.children;

      let new_row = document.createElement('div');
      new_row.className='over noselect';
      new_row.innerHTML = `
        <p>This game is soooo over!</p>
        <div class='button'>Try Again</div>
      `;
      const btnRestart = new_row.querySelector('div.button');
      btnRestart.addEventListener('click', restartGame);

      grid.appendChild(new_row);
      [...rows].forEach(row => row.classList.add('full'));

      document.removeEventListener('keydown', keyListener);
    }

    function drop(){
      board.move('D');
      if(!board.gameIsOver){
        setTimeout( drop, levelSpeed - 150 * (board.score.level - 1));
      } else {
        endGame();
      }
    }

    function startGame(){
      stage.setup('Javascript Tetris Game - 2020');
      score.init();
      board.init();
      
      drop();

      keyListener = document.addEventListener('keydown', 
        (e) => keyLog(e, board));
    }

    startGame();
  }

  
}
