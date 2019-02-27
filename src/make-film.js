export default (name, rating, year, duration, genre, imgPath, description, commentsAmount, controls = true) => {
  let filmTemplate = `<article class="film-card ${controls ? `` : `film-card--no-controls`}">
          <h3 class="film-card__title">${name}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genre}</span>
          </p>
          <img src="${imgPath}" alt="" class="film-card__poster">`;
  if (description) {
    filmTemplate += `<p class="film-card__description">${description}</p>`;
  }

  filmTemplate += `<button class="film-card__comments">${commentsAmount} comments</button>`;

  if (controls) {
    filmTemplate += `<form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
          </form>`;
  }
  filmTemplate += `</article>`;
  return filmTemplate;
};

