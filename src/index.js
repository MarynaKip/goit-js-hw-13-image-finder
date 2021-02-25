import './styles.css';
import NewPixabayApi from './js/fetchPictures';
import LoadMoreBtn from './js/load-more';
import picturesTemplate from './templates/pictureTemplate.hbs';

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
  scrollButton: document.querySelector('.scrollButton'),
};

const newPixabayApi = new NewPixabayApi();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const heightArray = [];

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

    // console.log(newPixabayApi.page);

    heightArray.push(document.documentElement.offsetHeight);
    console.log(heightArray);
    const element = newPixabayApi.page - 2;
    const height =
      // refs.galleryContainer.scrollHeight -
      document.documentElement.offsetHeight -
      (heightArray[element] - heightArray[element - 1]) -
      refs.scrollButton.clientHeight +
      refs.galleryContainer.lastElementChild.clientHeight;
    // console.log(document.documentElement.offsetHeight);
    // console.log(heightArray[element] - heightArray[element - 1]);
    // console.log(refs.scrollButton.clientHeight);
    // console.log(refs.galleryContainer.lastElementChild.clientHeight);
    // console.log(height);

    window.scrollTo({
      top: height,

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
