import './styles.css';
import NewPixabayApi from './js/fetchPictures';
import LoadMoreBtn from './js/load-more';
import picturesTemplate from './templates/pictureTemplate.hbs';

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
};

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
      top: document.documentElement.offsetHeight,

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
