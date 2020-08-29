export default class Stage {
  constructor() {
    this.gridSize = { x: 10, y: 16 };
  }

  createGrid(cols, rows) {
    let grid;
    let rowCells = ``;
    let colCells = ``;

    for(let i = 0;i < cols; i++) colCells = colCells.concat(`<div class='col c${i}'> </div>`);
    for(let i = 0;i < rows; i++) rowCells = rowCells.concat(`<div class='row r${i}'>${colCells}</div>`);

    grid = document.createElement('div');
    grid.className = 'grid';
    grid.innerHTML = rowCells;

    return grid;
  }

  createGameInfo() {
    const gameInfo = document.createElement('div');
    gameInfo.className = 'game-info';
    gameInfo.innerHTML = `
      <article>
        <h1>Instructions:</h1>
        <p><- (Left key) - move left</p>
        <p>-> (Right key) - move right</p>
        <p> ^ (Up key) - rotate tile</p>
        <p> q - Stop the game</p>
        </article>
    `;

    return gameInfo;
  }
  
  createContainer(elements) {
    const container = document.createElement('div');
    container.className = 'container';

    for(let element of elements) container.appendChild(element);

    return container;
  }

  setup(headerTitle) {
    const stage = document.getElementById('app');

    const container = this.createContainer([
      this.createGrid(this.gridSize.x,this.gridSize.y), 
      this.createGameInfo()]
      );
    
    stage.innerHTML=`<h1>${headerTitle || ''}</h1>`;
    stage.appendChild(container);
  }

}