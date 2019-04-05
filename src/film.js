import Component from '../src/component';
import moment from 'moment';

export class Film extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._rating = data.rating;
    this._year = data.year;
    this._duration = data.duration;
    this._genres = data.genres;
    this._img = data.img;
    this._description = data.description;
    this._commentsAmount = data.commentsAmount;
    this._controls = data.controls;
    this._onClick = null;
    this._isInWatchlist = data.isInWatchlist;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
    this._onAddToWatchListClick = this._onAddToWatchListClick.bind(this);
    this._onMarkAsWatchedClick = this._onMarkAsWatchedClick.bind(this);
  }
  _onMarkAsWatchedClick(e) {
    e.preventDefault();

    if (typeof this._onMarkAsWatched === `function`) {
      const newData = {isWatched: !this._isWatched};
      this._onMarkAsWatched(newData);
    }
  }

  _onAddToWatchListClick(e) {
    e.preventDefault();

    if (typeof this._onAddToWatchList === `function`) {
      const newData = {isInWatchList: !this.isInWatchList};
      this._onAddToWatchList(newData);
    }
  }
  _onEditButtonClick() {
    return typeof this._onClick === `function` && this._onClick();
  }
  set onAddToWatchList(fn) {
    this._onAddToWatchList = fn;
  }

  set onMarkAsWatched(fn) {
    this._onMarkAsWatched = fn;
  }
  set onClick(fn) {
    this._onClick = fn;
  }

  bind() {
    this._element.querySelector(`.film-card__comments`)
      .addEventListener(`click`, this._onEditButtonClick);
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, this._onAddToWatchListClick);
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, this._onMarkAsWatchedClick);
  }
  unbind() {
    this._element.querySelector(`button.film-card__comments`)
      .removeEventListener(`click`, this._onEditButtonClick);
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`)
      .removeEventListener(`click`, this._onAddToWatchListClick);
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`)
      .removeEventListener(`click`, this._onMarkAsWatchedClick);
  }

  update(data) {
    this._isInWatchlist = data.isInWatchlist;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;
    this._comment = data.comment;
    this._score = data.score;
  }

  get template() {
    let template = `<article class="film-card ${this._controls ? `` : `film-card--no-controls`}">
          <h3 class="film-card__title">${this._name}</h3>
          <p class="film-card__rating">${this._rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${moment(this._year).format(`YYYY`)}</span>
            <span class="film-card__duration">${moment.duration({"minutes": this._duration}).hours()}h&nbsp;${moment.duration({"minutes": this._duration}).minutes()}m</span>
            <span class="film-card__genre">${this._genres[0]}</span>
          </p>
          <img src="${this._img}" alt="" class="film-card__poster">`;
    if (this._description) {
      template += `<p class="film-card__description">${this._description}</p>`;
    }

    template += `<button class="film-card__comments">${this._commentsAmount} comments</button>`;

    if (this._controls) {
      template += `<form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._isInWatchlist && `
    film-card__controls-item--active`}"><!--Add to watchlist--> WL</button>
                <button class="film-card__controls-item button film-card__controls-item--mark-as-watched  ${this._isWatched && `
    film-card__controls-item--active`}" ><!--Mark as watched-->WTCHD</button>
                <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
              </form>`;
    }
    template += `</article>`;
    return template;
  }
}

