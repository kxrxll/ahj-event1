import { randomIndex, insertImage } from './utils';

export default class GoblinGame {
  constructor(el) {
    this.el = el;
    this.gamefield = el.querySelector('.gamefield');
    this.button = el.querySelector('button');
    this.pointsblock = el.querySelector('.points');
    this.missed = el.querySelector('.missed');
    this.defeatCounter = 0;
    this.points = 0;
    this.index = randomIndex(16);
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
    insertImage(this.el, newImg, this.index);
    const newInsertFunction = () => {
      const newRandomIndex = randomIndex(this.index);
      this.index = newRandomIndex;
      insertImage(this.el, newImg, newRandomIndex);
      this.defeatCounter += 1;
      this.missed.textContent = this.defeatCounter;
      clearTimeout(this.interval);
      this.interval = setTimeout(newInsertFunction, 2000);
      if (this.defeatCounter >= 5) {
        alert(`Defeat! Your points ${this.points}!`);
        this.defeatCounter = 0;
        this.points = 0;
        document.location.reload();
      }
    };
    this.newInsertFunction = newInsertFunction;
    this.interval = setTimeout(newInsertFunction, 2000);
  }

  initGame() {
    this.gamefield.addEventListener('click', (evt) => {
      if (evt.target.tagName === 'IMG') {
        this.points += 1;
        const newIndex = randomIndex(this.index);
        this.index = newIndex;
        insertImage(this.el, evt.target, newIndex);
        clearTimeout(this.interval);
        this.interval = setTimeout(this.newInsertFunction, 2000);
        this.pointsblock.textContent = this.points;
        this.missed.textContent = this.defeatCounter;
      }
    });
    this.button.addEventListener('click', this.startGame.bind(this));
  }
}
