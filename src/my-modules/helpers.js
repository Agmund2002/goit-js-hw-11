import { elements } from "./elements";

const defaults = {
    url: 'https://netsh.pp.ua/wp-content/uploads/2017/08/Placeholder-1.png',
    text: 'Not Found'
};

function createMarkup(arr) {
    const elem = arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <div class="photo-card js-photo-card">
      <a class="img-tumb" href="${largeImageURL || defaults.url}">
        <img class="img" src="${webformatURL || defaults.url}" alt="${tags || defaults.text}" loading="lazy" />
      </a>
      <ul class="info-list">
        <li class="info-item">
          <p class="info-title">Likes</p>
          <p class="info">${likes || defaults.text}</p>
        </li>
        <li class="info-item">
          <p class="info-title">Views</p>
          <p class="info">${views || defaults.text}</p>
        </li>
        <li class="info-item">
          <p class="info-title">Comments</p>
          <p class="info">${comments || defaults.text}</p>
        </li>
        <li class="info-item">
          <p class="info-title">Downloads</p>
          <p class="info">${downloads || defaults.text}</p>
        </li>
        </ul>
    </div>`).join('');

    elements.box.insertAdjacentHTML('beforeend', elem);
}

function handlerLight() {
  elements.darkThemBtn.classList.remove('visually-hidden');
  elements.lightThemBtn.classList.add('visually-hidden');

  elements.html.classList.remove('dark');
  
  localStorage.removeItem('them');
}

function handlerDark() {
  elements.lightThemBtn.classList.remove('visually-hidden');
  elements.darkThemBtn.classList.add('visually-hidden');

  elements.html.classList.add('dark');

  if (localStorage.getItem('them') !== 'dark') {
    localStorage.setItem('them', 'dark')
  }
}

export { createMarkup, handlerLight, handlerDark };