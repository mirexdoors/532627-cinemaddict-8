export const randomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};
export const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
export const getRandomSentence = (text, sentenceAmountMin, sentenceAmountMax) => {
  const textArray = text.split(`.`);
  const sentenceAmount = randomInteger(sentenceAmountMin, sentenceAmountMax);
  shuffleArray(textArray);
  return textArray.slice(0, sentenceAmount).join(` `);
};
export const createElement = (template) => {
  const newElement = document.createElement(`template`);
  newElement.innerHTML = template;
  return newElement.content.firstChild;
};
