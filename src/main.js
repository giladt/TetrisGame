import Stage from './components/stage.js';
import Blocks from './components/blocks.js';

export default class Main {
  constructor(){
    this.state = "";
    this.stage = new Stage();
    this.blocks = new Blocks();
    this.loop = null; 
  }

  
  run() {
    function keyLog(e,blocks){
      switch(e.keyCode){
        case(81): 
          clearInterval(loop); // 'q - quit'
          break;
        case(37): 
          blocks.move('L'); 
          break;
        case(39): 
          blocks.move('R');
          break;
        case(40): 
          blocks.move('D');
          break;
        case(38): 
          blocks.move('U');
          break;  
      }    
    }

    this.stage.setup('Javascript Tetris Game - 2020');
    this.blocks.init();
    
    // const loop = setInterval(() => {

    //   if (!this.blocks.collides()) {
    //     // this.blocks.move('D');
    //   } else {
    //     this.blocks.pickRandomBlock();
    //   } 
    // }, 250);

    document.addEventListener('keydown', 
      (e) => keyLog(e, this.blocks));
      
  }

}
