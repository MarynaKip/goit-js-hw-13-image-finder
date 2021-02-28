import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

defaultModules.set(PNotifyMobile, {});

import './styles/styles.css';
import NewPixabayApi from './js/fetchPictures';
import LoadMoreBtn from './js/load-more';

import picturesTemplate from './templates/pictureTemplate.hbs';
import refs from './js/refs';

const newPixabayApi = new NewPixabayApi();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', () => {
  fetchPictures();
});

function onSearch(event) {
  event.preventDefault();

  if (event.currentTarget.elements.query.value === '') {
    alert({
      text: 'Please enter a more specific query!',
    });
    return;
  }

  newPixabayApi.query = event.currentTarget.elements.query.value;

  loadMoreBtn.show();
  newPixabayApi.resetPage();
  clearGalleryContainer();

  fetchPictures();
}

function fetchPictures() {
  loadMoreBtn.disable();

  newPixabayApi.fetchPictures().then(elements => {
    appendPictures(elements);

    window.scrollTo({
      top: refs.galleryContainer.scrollHeight,

      behavior: 'smooth',
    });
    loadMoreBtn.enable();
  });
}

function appendPictures(pictures) {
  refs.galleryContainer.insertAdjacentHTML(
    'beforeend',
    picturesTemplate(pictures),
  );
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}
