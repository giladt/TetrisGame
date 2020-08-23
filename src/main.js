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
    function keyLog(e){
      // if(e.keyCode === 81) 
      clearInterval(loop); // 'q - quit'
    }

    this.stage.setup('Javascript Tetris Game - 2020');
    this.blocks.init();
    
    
    const loop = setInterval(() => {
      this.blocks.drawBlock();
      this.blocks.blockPosition.y++;

      // clearInterval(loop);
    }, 1000);
    document.addEventListener('keydown', keyLog);
      
  }

}
