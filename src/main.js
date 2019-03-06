import getFilm from '../src/get-film.js';
import getFilterElement from '../src/make-filter.js';
import getFilmCard from '../src/make-film.js';
import {randomInteger} from '../src/utls';
const TOTAL_FILMS = 7;
const RATED_FILMS = 2;
const MOST_COMMENTED_FILMS = 2;
const filterContainer = document.querySelector(`.main-navigation`);
const filterValues = [`All movies`, `Watchlist`, `History`, `Favorites`, `Stats`];
const filmListContainer = document.querySelector(`.films-list__main`);
const topRatedFilmContainer = document.querySelector(`.films-list__top`);
const mostCommentedFilmContainer = document.querySelector(`.films-list__commented`);
let films = []; // массив для хранения фильмов основоного списка
let filmsCommented = [];
let filmsRated = [];

const renderFilm = (film, container) => {
  container.insertAdjacentHTML(`beforeend`, getFilmCard(film));
};
const onCLickFilter = (e) => {
  document.querySelectorAll(`.js-setFilter`).forEach((filter)=> {
    filter.classList.remove(`main-navigation__item--active`);
  });

  e.target.classList.add(`main-navigation__item--active`);
  filmListContainer.innerHTML = ``;
  let filmAmount = randomInteger(1, 5);
  while (filmAmount) {
    renderFilm(getFilm(), filmListContainer);
    --filmAmount;
  }
};

const createFilmsList = (amount) => {
  const results = [];
  while (amount) {
    results.push(getFilm());
    --amount;
  }
  return results;
};

const renderFilmList = (filmArray, container) => {
  if (filmArray.length > 0 && container) {
    filmArray.forEach(function (film) {
      renderFilm(film, container);
    });
    return true;
  } else {
    return false;
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

  // собираем фильмы в массивы для блоков фильмов
  films = createFilmsList(TOTAL_FILMS);
  filmsCommented = createFilmsList(MOST_COMMENTED_FILMS);
  filmsRated = createFilmsList(RATED_FILMS);

  // рендерим
  renderFilmList(films, filmListContainer);
  renderFilmList(filmsCommented, mostCommentedFilmContainer);
  renderFilmList(filmsRated, topRatedFilmContainer);

});
