const APIkey = '20328481-fd22f6b33af33c123ae9427ab';

export default class NewPixabayApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchPictures() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${APIkey}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        return hits;
      });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
