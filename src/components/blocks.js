import Stage from "./stage.js";

export default class Blocks {
  constructor(){
    let stage = new Stage();

    this.blocks = {
      '0': '0',
      'I': {
        shape: [
          [0,0,0,0], // [0,1,0,0],
          [1,1,1,1], // [0,1,0,0],
          [0,0,0,0], // [0,1,0,0]
          [0,0,0,0], // [0,1,0,0]
        ],
        color: '#00f0f0' // Light-Blue
      },
      'L': {
        shape: [
          [0,1,0], // [0,0,1],
          [0,1,0], // [1,1,1],
          [0,1,1], // [0,0,0]
        ],
        color: '#f0a000' // Orange
      },
      'J': {
        shape: [
          [0,1,0], // [0,0,0],
          [0,1,0], // [1,1,1],
          [1,1,0], // [0,0,1]
        ],
        color: '#0000f0' // Blue
      },
      'T': {
        shape: [
          [0,1,0], // [0,1,0],
          [0,1,1], // [1,1,1],
          [0,1,0], // [0,0,0]
        ],
        color: '#a000f0' // Purple
      },
      'O': {
        shape: [
          [1,1], // [1,1],
          [1,1], // [1,1]
        ],
        color: '#f0f000' // Yellow
      },
      'S': {
        shape: [
          [0,1,1], // [1,0,0],
          [1,1,0], // [1,1,0],
          [0,0,0], // [0,1,0]
        ],
        color: '#00f000' // Green
      },
      'Z': {
        shape: [
          [1,1,0], // [0,1,0],
          [0,1,1], // [1,1,0],
          [0,0,0], // [1,0,0],
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

  drawBlock(){
    const shape = this.blocks[this.currentBlock].shape;
    const shape_pos = this.blockPosition;

    function cleanGrid(box){
      if(box.center.y + box.row - 1 >= 0){
        const clean_row = [...box.grid[box.center.y + box.row - 1]];
        clean_row[Math.round(box.center.x - (shape[box.row].length / 2)) + box.col] = 2;
        box.grid[box.center.y + box.row - 1] = [...clean_row]; 
      }

      return true;
    }

    function placeBlockInGrid(box){

      if (cleanGrid(box)) {
        const new_row = [...box.grid[box.center.y + box.row]];
        new_row[Math.round(box.center.x - (shape[box.row].length / 2)) + box.col] = shape[box.row][box.col];
        box.grid[box.center.y + box.row] = [...new_row];
      }
      return box.grid;
    }
    
    for(let row in shape){
      for(let col in shape[+row]){
        // this.store[shape_pos.y + (+row)][Math.round(shape_pos.x - (shape[+row].length / 2)) + (+col)] = 1; 
        this.store = placeBlockInGrid({
          center: shape_pos,
          row: +row,
          col: +col,
          grid: this.store
        });
      }
    }

    console.clear();
    console.log(this.i++, this.currentBlock);
    this.store.forEach(row=>console.log(row));
  }

  init() {

    let blockTypes = Object.keys(this.blocks);
    this.store = Array(this.gridSize.y).fill(Array(this.gridSize.x).fill(0));

    this.currentBlock = blockTypes[Math.floor(Math.random() * blockTypes.length)];
  }
}






































/*

    function applyColor(x_pos, y_pos) {
      const cell = document.querySelector(`.r${y_pos}>.c${x_pos}`);
      cell.classList.add('block-cell');
      cell.style.backgroundColor = block.color;
    }

    function clearColor(x_pos, y_pos) {
      if(y_pos < 0) return;

      let cell = document.querySelector(`.r${y_pos}>.c${x_pos}`);
      cell.classList.remove('block-cell');
      cell.style.backgroundColor = `rgb(${64 + (y_pos % 2) * 15}, 64, 64)`;
    }

    let block = this.blocks[this.currentBlock];

    function c(x,y,r,c){
      clearColor(
        x + (c - Math.round((block.shape[0].length) / 2 + 1)),
        y + r
      );
    }

    function t(x,y,r,c){
      if(block.shape[r][c] === 1) {
        applyColor(
          x + (c - Math.round((block.shape[r].length) / 2 + 1)), 
          y + (r)
        );
      }
    }
    
    for(let cellCol in block.shape){
      for(let cellRow in block.shape[+cellCol]){
        c(this.blockPosition.x,this.blockPosition.y, +cellRow, +cellCol);
        t(this.blockPosition.x,this.blockPosition.y, +cellRow, +cellCol);
      }      
    }

*/