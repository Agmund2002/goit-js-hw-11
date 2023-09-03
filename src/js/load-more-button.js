import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { elements } from './my-modules/elements';
import { createMarkup, handlerLight, handlerDark } from './my-modules/helpers';
import { serviceImgs, perPage } from './my-modules/pixabay-api';

if (localStorage.getItem('them') === 'dark') {
  handlerDark();
}

let currentPage = null;
let currentValue = null;
const gallery = new SimpleLightbox('.gallery a');

elements.form.addEventListener('submit', handlerForm);
elements.loadMoreBtn.addEventListener('click', handlerLoadMore);
elements.lightThemBtn.addEventListener('click', handlerLight);
elements.darkThemBtn.addEventListener('click', handlerDark);

const warning = new IntersectionObserver(lastElement, { rootMargin: '10px' });

function handlerForm(evt) {
  evt.preventDefault();
  elements.box.innerHTML = '';
  currentValue = null;
  currentPage = 1;

  currentValue = evt.currentTarget.elements.searchQuery.value
    .trim()
    .split(' ')
    .filter(elem => elem !== '')
    .join('+')
    .toLowerCase();
  evt.currentTarget.elements.searchQuery.value = currentValue
    .split('+')
    .join(' ');

  if (currentValue === '') {
    return Notify.warning(
      "We can't find this, because you haven't entered anything. Please try again."
    );
  }

  serviceImgs(currentValue, currentPage)
    .then(({ data: { totalHits, hits } }) => {
      if (totalHits === 0) {
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      Notify.success(`Hooray! We found ${totalHits} images.`);

      createMarkup(hits);
      gallery.refresh();

      if (currentPage < totalHits / perPage) {
        elements.loadMoreBtn.classList.remove('visually-hidden');
      } else {
        elements.guard.classList.remove('visually-hidden');
        warning.observe(elements.guard);
      }
    })
    .catch(err => Notify.failure(err.message))
    .finally(() => Loading.remove());
}

function handlerLoadMore() {
  currentPage++;
  serviceImgs(currentValue, currentPage)
    .then(({ data: { totalHits, hits } }) => {
      createMarkup(hits);
      gallery.refresh();

      if (currentPage >= totalHits / perPage) {
        elements.loadMoreBtn.classList.add('visually-hidden');
        elements.guard.classList.remove('visually-hidden');
        warning.observe(elements.guard);
      }
    })
    .catch(err => Notify.failure(err.message))
    .finally(() => Loading.remove());
}

function lastElement(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
      warning.unobserve(elements.guard);
      elements.guard.classList.add('visually-hidden');
    }
  });
}
