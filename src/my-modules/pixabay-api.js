import axios from "axios";
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const API_KEY = '39114416-f90b644e8d0401ad57694968b';
const BASE_URL = 'https://pixabay.com/api/';
const perPage = 40;

async function serviceImgs(keyword, currentPage = '1') {
    const params = new URLSearchParams({
        key: API_KEY,
        q: keyword,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: perPage,
        page: currentPage
    });

    Loading.hourglass("Please wait...");

    return await axios.get(`${BASE_URL}?${params}`);
}

export { serviceImgs, perPage };