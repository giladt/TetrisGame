import Stage from "./stage.js";

export default class Blocks {
  constructor(){
    let stage = new Stage();

    this.blocks = {
      'I': {
        shape: [
          ['0','0','0','0'], // ['0','I','0','0'],
          ['I','I','I','I'], // ['0','I','0','0'],
          ['0','0','0','0'], // ['0','I','0','0']
          ['0','0','0','0'], // ['0','I','0','0']
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
    this.store = [];

    this.i = 0;
  }

  updateGrid(){
    for(let row in this.store){
      for(let col in this.store[+row]){
        let el = document.querySelector(`.r${+row}>.c${+col}`);
        el.classList.remove('block-cell');
        el.style = `background-color: none}`;

        if (this.store[+row][+col] !== '0'){
          el.classList.add('block-cell');
          el.style = `background-color: ${this.blocks[this.store[+row][+col]].color}`;
        }
      }
    }
  }

  updateStore(action = 'draw'){
    const current_block = this.currentBlock;
    const store = JSON.parse(JSON.stringify(this.store));
    const block = this.blocks[current_block];
    const shape_pos = this.blockPosition;

    for(let row in block.shape){
      for(let col in block.shape[+row]){
        const grid_pos ={
          x: Math.round(shape_pos.x - block.shape[(+row)].length / 2) + (+col),
          y: shape_pos.y + (+row)
        };

        if(store[grid_pos.y] && store[0][grid_pos.x]) {
          store[grid_pos.y][grid_pos.x] = (action === 'clear')? 
            '0' : 
            block.shape[+row][+col];
        }
      }
    }

    this.store = JSON.parse(JSON.stringify(store));
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
    const store = JSON.parse(JSON.stringify(this.store));
    const block_segment = this.blocks[this.currentBlock].shape;

    const pos = {
      x: this.blockPosition.x,
      y: this.blockPosition.y,
    };

    console.log(pos);
    for(let row in this.store){
      for(let block_row in block_segment){
        for(let col in store[row]) {
          for(let block_col in block_segment[+block_row]){
            // console.log(pos.x + (+block_col), pos.x, block_col);

            if(block_segment[+block_row][+block_col] !== '0' && 
              (
                pos.x + (+block_col) > this.store[+block_row].length ||
                pos.x + (+block_col) <= 0 ||
                pos.y + (+block_row) >= this.store.length || 
                pos.y + (+block_row) < 0
              ))  return true;

            if(store[row][col] !== '0' && block_segment[block_row][block_col] !== '0') {
              console.log('block collision');
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  move(direction){
    this.updateStore('clear');

    switch(direction){
      case 'D':
        this.blockPosition.y++;
        console.log(this._collides());
        if(this._collides()) this.pickRandomBlock();
        break;
      case 'U':
        this.blockPosition.y--;
        console.log(this._collides());
        if(this._collides()) this.blockPosition.y++;
        break;
      case 'L':
        this.blockPosition.x--;
        console.log(this._collides());
        if(this._collides()) this.blockPosition.x++;
        break;
      case 'R':
        this.blockPosition.x++;
        console.log(this._collides());
        if(this._collides()) this.blockPosition.x--;
        break;
    }
    this.updateStore();
    this.updateGrid();
      // for(let row in this.store){
      //   console.log(row,this.store[row]);
      // }
  }

  init() {
    this.store = Array(this.gridSize.y).fill(Array(this.gridSize.x).fill('0'));

    this.pickRandomBlock();
  }
}

/*

    let shape_pos = this.blockPosition;
    let block = this.blocks[this.currentBlock];
    console.log('current',this.currentBlock);
    console.log('block',block.shape, shape_pos.y);

    let grid = [...this.store]
      .slice(this._edgePos(shape_pos.y + 1, block.shape),block.shape.length);
      // .map(row => row.slice(this._edgePos.x,block.shape[0]),block.shape[0].length);    
    console.log('grid',grid, shape_pos.y);

    return (shape_pos.y >= this.store.length);

*/



