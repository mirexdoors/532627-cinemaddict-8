import Component from '../src/component';
import moment from 'moment';

const ENTER = 13;
const ESCAPE = 27;

export class FilmPopup extends Component {
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
    this._director = data.director;
    this._actors = data.actors;
    this._ageLimit = data.ageLimit;
    this._original = data.original;
    this._writers = data.writers;
    this._release = data.release;
    this._country = data.country;
    this._comment = new Set();
    this._commentsAmount = data.comment;
    this._commentDate = data.commentDate;
    this._score = data.score;
    this._isInWatchlist = data.isWatchlist;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;
    this._onClick = null;
    this._onSubmit = null;
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onEscapeClick = this._onEscapeClick.bind(this);
    this._onCtrlEnterPress = this._onCtrlEnterPress.bind(this);
  }

  _onCloseButtonClick() {
    return typeof this._onClick === `function` && this._onClick();
  }

  _onEscapeClick(e) {
    return e.keyCode === ESCAPE && typeof this._onClick === `function` && this._onClick();
  }

  _processForm(formData) {
    const entry = {
      isInWatchlist: this._isInWatchlistWatchlist,
      isWatched: this._isWatched,
      isFavorite: this._isFavorite,
      comment: this._comment,
      score: ``,
    };

    const filmMapper = FilmPopup.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (filmMapper[property]) {
        filmMapper[property](value);
      }
    }

    return entry;
  }

  static createMapper(target) {
    return {
      watchlist: (value) => (target.isInWatchlist = value),
      watched: (value) => (target.isWatched = value),
      favorite: (value) => (target.isFavorite = value),
      comment: (value) => (target.comment.add(value)),
      score: (value) => (target.score = parseInt(value, 10))
    };
  }

  _onCtrlEnterPress(e) {

    if (e.keyCode === ENTER && e.ctrlKey) {
      const formData = new FormData(this._element.querySelector(`.film-details__inner`));
      const newData = this._processForm(formData);
      newData._commentsAmount = this._comment.length;
      if (typeof this._onSubmit === `function`) {
        this._onSubmit(newData);
      }

      this.update(newData);
    }
  }

  set onClick(fn) {
    this._onClick = fn;
  }
  set onCloseButtonClick(fn) {
    this._onClick = fn;
  }
  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  update(data) {
    this._isInWatchlistWatchlist = data.isWatchlist === `on`;
    this._isWatched = data.isWatched === `on`;
    this._isFavorite = data.isFavorite === `on`;
    this._comment = data.comment;
    this._score = data.score;
  }

  bind() {
    document.addEventListener(`keydown`, this._onEscapeClick);
    document.addEventListener(`keydown`, this._onCtrlEnterPress);
    this._element.querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._onCloseButtonClick);
  }
  unbind() {
    document.removeEventListener(`keydown`, this._onEscapeClick);
    document.removeEventListener(`keydown`, this._onCtrlEnterPress);
    this._element.querySelector(`.film-details__close-btn`)
      .removeEventListener(`click`, this._onCloseButtonClick);
  }
  get template() {
    return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
  <div class="film-details__close">
  <button class="film-details__close-btn" type="button">close</button>
  </div>
  <div class="film-details__info-wrap">
  <div class="film-details__poster">
  <img class="film-details__poster-img" src="${this._img}" alt="incredables-2">

  <p class="film-details__age">${this._ageLimit}</p>
  </div>

  <div class="film-details__info">
  <div class="film-details__info-head">
  <div class="film-details__title-wrap">
  <h3 class="film-details__title">${this._name}</h3>
<p class="film-details__title-original">Original: ${this._original}</p>
</div>

<div class="film-details__rating">
  <p class="film-details__total-rating">${this._rating}</p>
  <p class="film-details__user-rating">Your rate ${this._score}</p>
</div>
</div>

<table class="film-details__table">
  <tr class="film-details__row">
  <td class="film-details__term">Director</td>
  <td class="film-details__cell">${this._director}</td>
</tr>
<tr class="film-details__row">
  <td class="film-details__term">Writers</td>
  <td class="film-details__cell">${[...this._writers].join(`, `)}</td>
</tr>
<tr class="film-details__row">
  <td class="film-details__term">Actors</td>
  <td class="film-details__cell">${[...this._actors].join(`, `)}</td>
</tr>
<tr class="film-details__row">
  <td class="film-details__term">Release Date</td>
<td class="film-details__cell">${moment(this._release).format(`DD MMMM YYYY`)}</td>
</tr>
<tr class="film-details__row">
  <td class="film-details__term">Runtime</td>
  <td class="film-details__cell">${moment.duration({"minutes": this._duration}).hours()}h&nbsp;${moment.duration({"minutes": this._duration}).minutes()}m</td>
</tr>
<tr class="film-details__row">
  <td class="film-details__term">Country</td>
  <td class="film-details__cell">${this._country}</td>
  </tr>
  <tr class="film-details__row">
  <td class="film-details__term">Genres</td>
  <td class="film-details__cell">
  ${this._genres.map(function (genre) {
    return `<span class="film-details__genre">${genre}</span>`;
  })}
  </td>
</tr>
</table>

<p class="film-details__film-description">
  ${this._description}
</p>
</div>
</div>

<section class="film-details__controls">
  <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._isInWatchlist ? `checked` : ``}>
    <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
  
  <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._isWatched ? `checked` : ``}>
    <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
    
    <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._isFavorite ? `checked` : ``}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
      
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${[...this._comment].length}</span></h3>
      
      <ul class="film-details__comments-list">
${[...this._comment].map((commentItem) => (
    `<li class="film-details__comment">
  <span class="film-details__comment-emoji">😴</span>
<div>
<p class="film-details__comment-text">${commentItem}</p>
<p class="film-details__comment-info">
  <span class="film-details__comment-author">Tim Macoveev</span>
<span class="film-details__comment-day">${moment(this._commentDate).endOf(`day`).fromNow()}</span>
</p>
</div>
</li>`).trim()).join(``)}
</ul>

<div class="film-details__new-comment">
  <div>
  <label for="add-emoji" class="film-details__add-emoji-label">😐</label>
<input type="checkbox" class="film-details__add-emoji visually-hidden" id="add-emoji">

  <div class="film-details__emoji-list">
  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
  <label class="film-details__emoji-label" for="emoji-sleeping">😴</label>

<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-neutral-face" value="neutral-face" checked>
<label class="film-details__emoji-label" for="emoji-neutral-face">😐</label>

<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-grinning" value="grinning">
  <label class="film-details__emoji-label" for="emoji-grinning">😀</label>
</div>
</div>
<label class="film-details__comment-label">
  <textarea class="film-details__comment-input" placeholder="← Select reaction, add comment here" name="comment"></textarea>
  </label>
  </div>
  </section>

  <section class="film-details__user-rating-wrap">
  <div class="film-details__user-rating-controls">
  <span class="film-details__watched-status film-details__watched-status--active">Already watched</span>
<button class="film-details__watched-reset" type="button">undo</button>
  </div>

  <div class="film-details__user-score">
  <div class="film-details__user-rating-poster">
  <img src="images/posters/blackmail.jpg" alt="film-poster" class="film-details__user-rating-img">
  </div>

  <section class="film-details__user-rating-inner">
  <h3 class="film-details__user-rating-title">Incredibles 2</h3>

<p class="film-details__user-rating-feelings">How you feel it?</p>

<div class="film-details__user-rating-score">
  <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1" ${this._score === 1 ? `checked` : ``}>
  <label class="film-details__user-rating-label" for="rating-1">1</label>

  <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2" ${this._score === 2 ? `checked` : ``}>
    <label class="film-details__user-rating-label" for="rating-2">2</label>
  
    <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3" ${this._score === 3 ? `checked` : ``}>
      <label class="film-details__user-rating-label" for="rating-3">3</label>
    
      <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4" ${this._score === 4 ? `checked` : ``}>
        <label class="film-details__user-rating-label" for="rating-4">4</label>
      
        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5" ${this._score === 5 ? `checked` : ``}>
        <label class="film-details__user-rating-label" for="rating-5">5</label>
        
          <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6" ${this._score === 6 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-6">6</label>
          
            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7" ${this._score === 7 ? `checked` : ``}>
              <label class="film-details__user-rating-label" for="rating-7">7</label>
            
              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8" ${this._score === 8 ? `checked` : ``}>
                <label class="film-details__user-rating-label" for="rating-8">8</label>
              
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9" ${this._score === 9 ? `checked` : ``}>
                  <label class="film-details__user-rating-label" for="rating-9">9</label>
                
                  </div>
                  </section>
                  </div>
                  </section>
                  </form>
                  </section>`;
  }
}
