import { randomIndex, insertImage } from './utils';

export default class GoblinGame {
  constructor(el) {
    this.el = el;
    this.index = randomIndex(16);
    this.defeatCounter = 0;
    this.points = 0;
  }

  drawTable() {
    const scriptTag = this.el.querySelector('script');
    for (let i = 0; i < 16; i += 1) {
      const newDiv = document.createElement('div');
      newDiv.dataset.index = i;
      this.el.insertBefore(newDiv, scriptTag);
    }
  }

  startGame() {
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
      }
    };
    setInterval(newInsertFunction, 700);
  }

  initGame() {
    this.el.addEventListener('click', (evt) => {
      if (evt.target.tagName === 'IMG') {
        this.points += 1;
        this.defeatCounter -= 1;
      }
    });
  }
}
