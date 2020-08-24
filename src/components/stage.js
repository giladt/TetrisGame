export default class Stage {
  constructor(){
    this.gridElement = undefined;
    this.gridSize = {
      x: 10,
      y: 16
    }
  }

  createGrid(cols, rows) {
    const grid = document.createElement('div');
    grid.className = 'grid';
    for(let rowIdx = 0; rowIdx < rows; rowIdx++){
      const row = document.createElement('div');
      for(let colIdx = 0; colIdx < cols; colIdx++){
        const box = document.createElement('div');
        box.innerText = ' ';
        box.className = 'col c' + colIdx;
        row.appendChild(box);
      }
      row.className = 'row r' + rowIdx;
      grid.appendChild(row);
    }

    this.gridElement = grid;
    return this.gridElement;

  }

  createContainer(appendElements) {
    const container = document.createElement('div');
    container.className = 'container';

    for(let elem of appendElements){
      container.appendChild(elem);
    }
    return container;
  }

  createGameInfo(){
    const gameInfo = document.createElement('div');
    gameInfo.className = 'game-info';

    return gameInfo;
  }
  
  getGridElement(){
    if (!this.gridElement) this.gridElement = this.createGrid(this.gridSize.x,this.gridSize.y);
    return this.gridElement;
  }

  setup(headerTitle){
    this.gridElement = this.getGridElement();

    const container = this.createContainer([this.gridElement, this.createGameInfo()]);
    const stage = document.getElementById('app');
    
    stage.innerHTML=`<h1>${headerTitle || ''}</h1>`;
    stage.appendChild(container);
  }

}