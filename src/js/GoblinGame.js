import { randomIndex, insertImage } from './utils';

export default class GoblinGame {
  constructor(el) {
    this.el = el;
    this.gamefield = el.querySelector('.gamefield');
    this.index = randomIndex(16);
    this.defeatCounter = 0;
    this.points = 0;
    this.missing = 0;
    this.button = el.querySelector('button');
    this.pointsblock = el.querySelector('.points');
    this.missed = el.querySelector('.missed');
  }

  drawTable() {
    for (let i = 0; i < 16; i += 1) {
      const newDiv = document.createElement('div');
      newDiv.classList.add('cell');
      newDiv.dataset.index = i;
      this.gamefield.append(newDiv);
    }
  }

  startGame() {
    this.button.classList.add('hide');
    const newImg = document.createElement('img');
    const newInsertFunction = () => {
      const newRandomIndex = randomIndex(this.index);
      this.index = newRandomIndex;
      insertImage(this.el, newImg, newRandomIndex);
      this.defeatCounter += 1;
      if (this.defeatCounter > 5) {
        alert(`Defeat! Your points ${this.points}!`);
        this.defeatCounter = 0;
        this.points = 0;
        this.missing = 0;
        document.location.reload();
      }
    };
    setInterval(newInsertFunction, 700);
  }

  initGame() {
    this.gamefield.addEventListener('click', (evt) => {
      if (evt.target.tagName === 'IMG') {
        this.points += 1;
        this.defeatCounter -= 1;
        this.pointsblock.textContent = this.points;
      } else {
        this.missing += 1;
        this.missed.textContent = this.missing;
      }
    });
    this.button.addEventListener('click', this.startGame.bind(this));
  }
}
