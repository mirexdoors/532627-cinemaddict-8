import getFilterElement from '../src/make-filter.js';
import getFilm from '../src/make-film.js';

const TOTAL_FILMS = 7;
const RATED_FILMS = 2;
const MOST_COMMENTED_FILMS = 2;
const filterContainer = document.querySelector(`.main-navigation`);
const filterValues = [`All movies`, `Watchlist`, `History`, `Favorites`, `Stats`];
const filmListContainer = document.querySelector(`.films-list__main`);
const topRatedFilmContainer = document.querySelector(`.films-list__top`);
const mostCommentedFilmContainer = document.querySelector(`.films-list__commented`);

const film = {
  name: `The Assassination Of Jessie James By The Coward Robert Ford`,
  rating: `9.8`,
  year: `2018`,
  duration: `1h 13m`,
  genre: `Comedy`,
  imgPath: `./images/posters/three-friends.jpg`,
  description: `A priest with a haunted past and a novice on the threshold of her final vows are sent by the Vatican to investigate the death of a young nun in Romania and confront a malevolent force in the form of a demonic nun.`,
  commentsAmount: `13`
};

const randomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

const onCLickFilter = () => {
  filmListContainer.innerHTML = ``;
  let taskAmount = randomInteger(1, 5);
  while (taskAmount) {
    filmListContainer.insertAdjacentHTML(`beforeend`, getFilm(film.name, film.rating, film.year, film.duration, film.genre, film.imgPath, film.description, film.commentsAmount));
    --taskAmount;
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
      filmListContainer.insertAdjacentHTML(`beforeend`, getFilm(film.name, film.rating, film.year, film.duration, film.genre, film.imgPath, film.description, film.commentsAmount));
      --counter;
    }
  }
  if (mostCommentedFilmContainer) {
    let counter = MOST_COMMENTED_FILMS;
    while (counter) {
      mostCommentedFilmContainer.insertAdjacentHTML(`beforeend`, getFilm(film.name, film.rating, film.year, film.duration, film.genre, film.imgPath, false, film.commentsAmount, false));
      --counter;
    }
  }
  if (topRatedFilmContainer) {
    let counter = RATED_FILMS;
    while (counter) {
      topRatedFilmContainer.insertAdjacentHTML(`beforeend`, getFilm(film.name, film.rating, film.year, film.duration, film.genre, film.imgPath, false, film.commentsAmount, false));
      --counter;
    }
  }
});
