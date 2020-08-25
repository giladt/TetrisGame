import Stage from "./stage.js";

function score_update(score){
  const elScore = document.querySelector('.game-info>.score');
  elScore.innerText = score + ' points';
}

export default class Board {
  constructor(){
    let stage = new Stage();

    this.currentTetromino = 'I';
    this.tetrominos = {
      'I': {
        shape: [
          ['0','I','0','0'], // ['0','I','0','0'],
          ['0','I','0','0'], // ['0','I','0','0'],
          ['0','I','0','0'], // ['0','I','0','0']
          ['0','I','0','0'], // ['0','I','0','0']
        ],
        color: '#00f0f0' // Light-Blue
      },
      'L': {
        shape: [
          ['0','L','0'], // ['0','0','L'],
          ['0','L','0'], // ['L','L','L'],
          ['0','L','L'], // ['0','0','0']
        ],
        color: '#f0a000' // Orange
      },
      'J': {
        shape: [
          ['0','J','0'], // ['0','0','0'],
          ['0','J','0'], // ['J','J','J'],
          ['J','J','0'], // ['0','0','J']
        ],
        color: '#0000f0' // Blue
      },
      'T': {
        shape: [
          ['0','T','0'], // ['0','T','0'],
          ['0','T','T'], // ['T','T','T'],
          ['0','T','0'], // ['0','0','0']
        ],
        color: '#a000f0' // Purple
      },
      'O': {
        shape: [
          ['O','O'], // ['O','O'],
          ['O','O'], // ['O','O']
        ],
        color: '#f0f000' // Yellow
      },
      'S': {
        shape: [
          ['0','S','S'], // ['S','0','0'],
          ['S','S','0'], // ['S','S','0'],
          ['0','0','0'], // ['0','S','0']
        ],
        color: '#00f000' // Green
      },
      'Z': {
        shape: [
          ['Z','Z','0'], // ['0','Z','0'],
          ['0','Z','Z'], // ['Z','Z','0'],
          ['0','0','0'], // ['Z','0','0'],
        ],
        color: '#f00000' // Red
      },
    };

    this.tetrominosPosition = {
      x: 3,
      y: 0
    };
  
    this.gridElement = stage.getGridElement();
    this.gridSize = stage.gridSize;
    this.landed = [];
    this.score = 0;

    this.gameIsOver = false;
  }


  refreshGrid(){
    const shape_pos = this.tetrominosPosition;

    for(let row in this.landed){
      for(let col in this.landed[row]){
        const grid_pos ={
          x: (+col),
          y: (+row)
        };

        let el = document.querySelector(`.r${grid_pos.y}>.c${grid_pos.x}`);
        el.classList.remove('tetrominos-cell');
        el.style = `background-color: none}`;

        if (this.landed[+row][+col] !== '0'){
          el.classList.add('tetrominos-cell');
          el.style = `background-color: ${this.tetrominos[this.landed[+row][+col]].color}`;
        }
      }
    }
  }

  dropBlock(){
    const tetrominos = this.tetrominos[this.currentBlock];
    const shape_pos = this.tetrominosPosition;

    for(let row in tetrominos.shape){
      for(let col in tetrominos.shape[row]){
        const grid_pos ={
          x: shape_pos.x + (+col),
          y: shape_pos.y + (+row)
        };

        let el = document.querySelector(`.r${grid_pos.y}>.c${grid_pos.x}`);
        if (el && tetrominos.shape[+row][+col] !== '0'){
          el.classList.add('tetrominos-cell');
          el.style = `background-color: ${tetrominos.color}`;
        }

      }
    }
  }

  _checkForFullRow(row){
    const filledCells = row.reduce((sum,cell)=>{
      return sum+=(cell!=='0');
    },0);
    return filledCells >= row.length;
  }

  updateLanded(){
    const current_tetrominos = this.currentBlock;
    const landed = JSON.parse(JSON.stringify(this.landed));
    const tetrominos = this.tetrominos[current_tetrominos].shape;
    const player = this.tetrominosPosition;

    for(let row=0; row < tetrominos.length; row++){
      for(let col=0; col < tetrominos[row].length; col++){

        if(tetrominos[row][col] !== '0') {
          landed[player.y+row][player.x + col] = tetrominos[row][col];
        }
      }
    }
    
    const emptyRow = Array(landed[0].length).fill('0');
    for(let row in landed){
      if(this._checkForFullRow(landed[row])) {
        landed.splice(row,1);
        landed.unshift(emptyRow);
        this.score += 1;
      }
    }

    score_update(this.score);
    this.landed = JSON.parse(JSON.stringify(landed));
  }

  pickRandomBlock(){
    let tetrominosTypes = Object.keys(this.tetrominos);

    this.currentBlock = tetrominosTypes[Math.floor(Math.random() * tetrominosTypes.length)];
    this.tetrominosPosition.y = 0;
    this.tetrominosPosition.x = 3;
  }
  
  _collides(){
    const tetrominos = this.tetrominos[this.currentBlock].shape;

    for(let row=0; row < tetrominos.length; row++){
      for(let col=0; col < tetrominos[row].length; col++){

        if(tetrominos[row][col] !== '0') {
          // Edge collision
          if(this.tetrominosPosition.x + col > this.landed[0].length - 1) this.tetrominosPosition.x--;
          if(this.tetrominosPosition.x + col < 0) this.tetrominosPosition.x++;
          if(this.landed[0].reduce((sum,cell)=> sum += cell !== '0',0) > 0) {
            this.gameIsOver = true;
          }

          // Block collision
          if(this.tetrominosPosition.y + row >= this.landed.length || this.gameIsOver) return true;
          if(this.landed[this.tetrominosPosition.y + row][this.tetrominosPosition.x + col] !== '0') return true;

        }
      }
    }

    return false;
  }

  _rotate(direction){
    const tetrominos = JSON.parse(JSON.stringify(this.tetrominos[this.currentBlock].shape));
    const tetrominosSize = tetrominos.length;
    const rotated = JSON.parse(JSON.stringify(Array(tetrominosSize).fill(Array(tetrominosSize).fill('0'))));

    for(let row=0; row<tetrominosSize; row++){
      for(let col=0; col<tetrominosSize; col++){
        if(tetrominos[row][col] !== '0'){
          if (direction > 0){
            rotated[tetrominosSize - 1 - col][row] = tetrominos[row][col];
          } else {
            rotated[col][tetrominosSize - 1 - row] = tetrominos[row][col];
          }
        }
      }
    }

    this.tetrominos[this.currentBlock].shape = [...rotated];
  }

  move(direction){
    let movements = {D:{x:0,y:1},U:{x:0,y:0},L:{x:-1,y:0},R:{x:1,y:0}};
    
    this.tetrominosPosition.x += movements[direction].x;
    this.tetrominosPosition.y += movements[direction].y;

    if(direction === 'U') this._rotate(1);

    if(this._collides()) {
      switch(direction){
        case 'U':
          this._rotate(-1);
          break;
        case 'D':
          this.tetrominosPosition.y -= movements[direction].y;
          this.updateLanded();
          this.pickRandomBlock();
          break;
        default:
          this.tetrominosPosition.x -= movements[direction].x;
          this.tetrominosPosition.y -= movements[direction].y;
      }
    }

    if(!this.gameIsOver){
      this.refreshGrid();
      this.dropBlock();
    }
  }

  init() {
    this.landed = Array(this.gridSize.y).fill(Array(this.gridSize.x).fill('0'));
    this.pickRandomBlock();
  }
}
