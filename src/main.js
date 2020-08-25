import Stage from './components/stage.js';
import Board from './components/board.js';

export default class Main {
  constructor(){
    this.state = "";
    this.stage = new Stage();
    this.board = new Board();
  }

  run() {
    let intervalID;
    let board = this.board;
    let stage = this.stage;

    function keyLog(e,board){
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

    function endGame(){

      const grid = document.querySelector('.grid');
      let rows = grid.children;

      let new_row = document.createElement('div');

      new_row.className='over';
      new_row.innerText = "This game is soooo over!";

      if(board.gameIsOver) {
        console.log('end it', intervalID);
        clearInterval(intervalID);
      }

      [...rows].forEach(row => row.remove());
      grid.appendChild(new_row);

      setTimeout(()=>new_row.classList.add('full'), 0);

    }

    function drop(){
      board.move('D');
      if(board.gameIsOver) endGame();
    }


    function score_init(){
      const elGameInfo = document.querySelector('.game-info');
      elGameInfo.innerHTML = `<h1>Your Score</h1><p class='score'>${board.score} points</p>`;
    }

    function startGame(){
      stage.setup('Javascript Tetris Game - 2020');
      board.init();
      score_init();
      
      intervalID = setInterval(drop, 500);

      document.addEventListener('keydown', 
        (e) => keyLog(e, board));
    }

    startGame();
  }

  
}
