import Stage from "./stage.js";

export default class Blocks {
  constructor(){
    let stage = new Stage();

    this.blocks = {
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

    this.currentBlock = 'I';
    this.blockPosition = {
      x: 5,
      y: 0
    };
  
    this.gridElement =  stage.getGridElement();
    this.gridSize = stage.gridSize;
    this.landed = [];

    this.i = 0;
  }


  refreshGrid(){
    const shape_pos = this.blockPosition;

    for(let row in this.landed){
      for(let col in this.landed[row]){
        const grid_pos ={
          x: (+col),
          y: (+row)
        };

        let el = document.querySelector(`.r${grid_pos.y}>.c${grid_pos.x}`);
        el.classList.remove('block-cell');
        el.style = `background-color: none}`;

        if (this.landed[+row][+col] !== '0'){
          el.classList.add('block-cell');
          el.style = `background-color: ${this.blocks[this.landed[+row][+col]].color}`;
        }
      }
    }
  }

  dropBlock(){
    const block = this.blocks[this.currentBlock];
    const shape_pos = this.blockPosition;

    for(let row in block.shape){
      for(let col in block.shape[row]){
        const grid_pos ={
          x: Math.round(shape_pos.x - block.shape[(+row)].length / 2) + (+col),
          y: shape_pos.y + (+row)
        };

        let el = document.querySelector(`.r${grid_pos.y}>.c${grid_pos.x}`);
        if (el && block.shape[+row][+col] !== '0'){
          el.classList.add('block-cell');
          el.style = `background-color: ${block.color}`;
        }

      }
    }
  }

  updateLanded(){
    const current_block = this.currentBlock;
    const landed = JSON.parse(JSON.stringify(this.landed));
    const block = this.blocks[current_block].shape;
    const player = this.blockPosition;

    for(let row=0; row < block.length; row++){
      for(let col=0; col < block[row].length; col++){

        if(block[row][col] !== '0') {
          landed[player.y+row][player.x - 1 + col] = block[row][col];
        }
      }
    }

    for(let row of landed){
      console.log(row);
    }
    this.landed = JSON.parse(JSON.stringify(landed));
  }

  _edgePos(pos, arr){
    return Math.floor(pos - Math.round(arr.length / 2));
  }

  pickRandomBlock(){
    let blockTypes = Object.keys(this.blocks);

    this.currentBlock = blockTypes[Math.floor(Math.random() * blockTypes.length)];
    this.blockPosition.y = 0;
    this.blockPosition.x = 5;
  }
  
  _collides(){
    const landed = JSON.parse(JSON.stringify(this.landed));
    const block = this.blocks[this.currentBlock].shape;

    const player = {...this.blockPosition};

    for(let row=0; row < block.length; row++){
      for(let col=0; col < block[row].length; col++){

        if(block[row][col] !== '0') {
          console.log('check-collision',block[row],player.y, row,player.x,col);
          if(
            player.x - 1 + col >= landed[row].length || 
            player.x - 1 + col < 0 ||
            player.y + row >= landed.length || 
            player.y + row < 0
          ) {
            console.log('edge collision');
            return true;
          }

          if(landed[player.y + row][player.x - 1 + col] !== '0') {
            console.log('block collision');
            return true;
          }
        }
      }
    }

    return false;
  }

  move(direction){
    let movements = {D:{x:0,y:1},U:{x:0,y:-1},L:{x:-1,y:0},R:{x:1,y:0}};
    
    this.blockPosition.x += movements[direction].x;
    this.blockPosition.y += movements[direction].y;
    if(this._collides()) {
      this.blockPosition.x -= movements[direction].x;
      this.blockPosition.y -= movements[direction].y;

      if(direction === 'D') {
        this.updateLanded();
        this.pickRandomBlock();
      }
    }

    this.refreshGrid();
    this.dropBlock();
  }

  init() {
    this.landed = Array(this.gridSize.y).fill(Array(this.gridSize.x).fill('0'));

    this.pickRandomBlock();
  }
}
