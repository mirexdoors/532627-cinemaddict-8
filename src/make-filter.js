export default (caption, amount = false, isActive = false, isAdditional = false) => {
  let filter = `
    <a href="#${caption.toLowerCase()}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``} ${isAdditional ? `main-navigation__item--additional` : ``}">${caption} `;
  if (amount) {
    filter += `<span class="main-navigation__item-count">${amount}</span>`;
  }
  filter += `</a>`;
  return filter;
};
