export default (film) => {
  let filmTemplate = `<article class="film-card ${film.controls ? `` : `film-card--no-controls`}">
          <h3 class="film-card__title">${film.name}</h3>
          <p class="film-card__rating">${film.rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${film.year}</span>
            <span class="film-card__duration">${film.duration}</span>
            <span class="film-card__genre">${film.genre}</span>
          </p>
          <img src="${film.img}" alt="" class="film-card__poster">`;
  if (film.description) {
    filmTemplate += `<p class="film-card__description">${film.description}</p>`;
  }

  filmTemplate += `<button class="film-card__comments">${film.commentsAmount} comments</button>`;

  if (film.controls) {
    filmTemplate += `<form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
          </form>`;
  }
  filmTemplate += `</article>`;
  return filmTemplate;
};

