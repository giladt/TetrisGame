
export default class Score {
  constructor() {
    this.count = 0;
    this.level = 1;
    this.elGameInfo = '';
  }

  _create_score_board(){
    this.elGameInfo = document.querySelector('.game-info');
    this.elGameInfo.innerHTML = `
      <h1>Your Score</h1>
      <p class='score'>${this.count} points</p>
      <p class='level'>Level ${this.level}</p>
    `;
  }

  update_count(){
    const elScore = document.querySelector('.game-info>p.score');
    elScore.innerText = this.count + ' points';
    const elLevel = document.querySelector('.game-info>p.level');
    elLevel.innerText = 'Level ' + this.level;
  }

  init() {
    this._create_score_board();
    this.count = 0;
    this.level = 1;
  }
  
}