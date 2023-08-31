// Notiflix is install to npm
// yellow flowers = yellow+flowers
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


import { elements } from "./my-modules/elements";
import { createMarkup } from "./my-modules/helpers";
import { serviceImgs, perPage } from "./my-modules/pixabay-api";

let gallery = new SimpleLightbox('.gallery a');
let currentPage = null;

elements.form.addEventListener('submit', handlerForm);
const infinityScroll = new IntersectionObserver(intersectionObserver, { rootMargin: '500px' })

function handlerForm(evt) {
    evt.preventDefault();
    elements.box.innerHTML = '';
    currentPage = 1;

    serviceImgs(evt.currentTarget.elements.searchQuery.value, currentPage)
        .then(response => {
            createMarkup(response.data.hits);
            console.log(response.data.totalHits);
            gallery.refresh();

            if (currentPage < response.data.totalHits / perPage) {
                infinityScroll.observe(elements.guard);
            }
        })
        .catch()
        .finally();
}

function intersectionObserver(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            currentPage++
            serviceImgs(elements.form.elements.searchQuery.value, currentPage)
                .then(response => {
                    createMarkup(response.data.hits);
                    gallery.refresh();

                    if (currentPage >= response.data.totalHits / perPage) {
                        infinityScroll.unobserve(elements.guard);
                    }
                })
                .catch()
                .finally();
        }
    })
}