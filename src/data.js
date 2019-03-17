import {randomInteger, shuffleArray, getRandomSentence} from './utls.js';

export default () => {
  const DESCRIPTION_SENTENCE = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
  const DESCRIPTION_SENTENCE_AMOUNT_MIN = 1;
  const DESCRIPTION_SENTENCE_AMOUNT_MAX = 3;
  const names = [`великий`, `красный`, `енот`, `компьютер`];
  const posters = [`accused`, `blackmail`, `blue-blazes`, `fuga-da-new-york`, `moonrise`, `three-friends`];
  const genres = [`drama`, `comedy`, `biopic`];
  const name = shuffleArray(names).join(` `);
  const rating = randomInteger(1, 10);
  const year = randomInteger(1905, 2019);
  const description = getRandomSentence(DESCRIPTION_SENTENCE, DESCRIPTION_SENTENCE_AMOUNT_MIN, DESCRIPTION_SENTENCE_AMOUNT_MAX);
  const img = `./images/posters/` + posters[Math.floor(Math.random() * 6)] + `.jpg`;
  const controls = true;
  const duration = `2h 13min`;
  const original = shuffleArray(names).join(` `);
  const writers = new Set([`Billy Joe`, `Elvis Presley`]);
  const commentsAmount = randomInteger(1, 500);
  const release = `15 June 2018 (USA)`;
  const country = `USA`;
  const director = `Francis Ford Coppola`;
  const actors = [`Brad Pitt`, `Charlie Chaplin`];
  const ageLimit = `18+`;
  const film = {
    name,
    ageLimit,
    director,
    actors,
    rating,
    year,
    img,
    description,
    controls,
    duration,
    genres,
    original,
    country,
    release,
    writers,
    commentsAmount
  };
  return film;
};
