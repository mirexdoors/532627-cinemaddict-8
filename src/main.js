import getFilm from '../src/get-film.js';
import getFilterElement from '../src/make-filter.js';
import getFilmCard from '../src/make-film.js';

const TOTAL_FILMS = 7;
const RATED_FILMS = 2;
const MOST_COMMENTED_FILMS = 2;
const filterContainer = document.querySelector(`.main-navigation`);
const filterValues = [`All movies`, `Watchlist`, `History`, `Favorites`, `Stats`];
const filmListContainer = document.querySelector(`.films-list__main`);
const topRatedFilmContainer = document.querySelector(`.films-list__top`);
const mostCommentedFilmContainer = document.querySelector(`.films-list__commented`);



const randomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

const onCLickFilter = () => {
  filmListContainer.innerHTML = ``;
  let filmAmount = randomInteger(1, 5);
  while (filmAmount) {
    filmListContainer.insertAdjacentHTML(`beforeend`, getFilmCard(getFilm()));
    --filmAmount;
  }
};

document.addEventListener(`DOMContentLoaded`, function () {
  if (filterContainer) {
    filterValues.forEach(function (filterName) {
      let filterAmount = randomInteger(1, 20);
      let isActive = false;
      let isAdditional = false;
      if (filterName === `All movies`) {
        isActive = true;
      } else if (filterName === `Stats`) {
        isAdditional = true;
        filterAmount = null;
      }

      filterContainer.insertAdjacentHTML(`beforeend`, getFilterElement(filterName, filterAmount, isActive, isAdditional));
    });

    document.querySelectorAll(`.js-setFilter`).forEach((filter) => {
      filter.addEventListener(`click`, onCLickFilter);
    });
  }

  if (filmListContainer) {
    let counter = TOTAL_FILMS;
    while (counter) {
      filmListContainer.insertAdjacentHTML(`beforeend`, getFilmCard(getFilm()));
      --counter;
    }
  }
  if (mostCommentedFilmContainer) {
    let counter = MOST_COMMENTED_FILMS;
    while (counter) {
      mostCommentedFilmContainer.insertAdjacentHTML(`beforeend`, getFilmCard(getFilm()));
      --counter;
    }
  }
  if (topRatedFilmContainer) {
    let counter = RATED_FILMS;
    while (counter) {
      topRatedFilmContainer.insertAdjacentHTML(`beforeend`, getFilmCard(getFilm()));
      --counter;
    }
  }
});
