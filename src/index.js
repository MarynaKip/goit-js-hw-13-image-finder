//import './styles.css';
import NewPixabayApi from './js/fetchPictures';
import picturesTemplate from './templates/pictureTemplate.hbs';

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
};

const newPixabayApi = new NewPixabayApi();

refs.searchForm.addEventListener('submit', toSearch);

function toSearch(event) {
  event.preventDefault();

  newPixabayApi.query = event.currentTarget.elements.query.value;

  fetchPictures();
}

function fetchPictures() {
  newPixabayApi.fetchPictures().then(elements => {
    appendPictures(elements);
  });
}

function appendPictures(pictures) {
  refs.galleryContainer.insertAdjacentHTML(
    'beforeend',
    picturesTemplate(pictures),
  );
}
