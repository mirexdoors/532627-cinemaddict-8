import getFilterElement from '../src/make-filter.js';
// import getCard from '../src/make-task.js';

const filterContainer = document.querySelector(`.main-navigation`);
const filterValues = [`All movies`, `Watchlist`, `History`, `Favorites`, `Stats`];

const randomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

document.addEventListener(`DOMContentLoaded`, function () {
  if (filterContainer) {
    filterValues.forEach(function (filterName) {
      const filterAmount = randomInteger(1, 20);
      let isActive = false;
      let isAdditional = false;
      if (filterName === `All movies`) {
        isActive = true;
      } else if (filterName === `Stats`) {
        isAdditional = true;
      }

      filterContainer.insertAdjacentHTML(`beforeend`, getFilterElement(filterName, filterAmount, isActive, isAdditional));
    });
  }
});
