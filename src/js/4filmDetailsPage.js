const refsFilmData = {
  userInput: document.querySelector('.films-list'),
  body: document.querySelector('body'),
};

function getUserInput(e) {
  if (e.target === e.currentTarget) return;
  const filmID = e.target.id;
  getData(filmID);
}

refsFilmData.userInput.addEventListener('click', getUserInput);

const baseUrl = 'https://api.themoviedb.org/3/movie/';
const apiKey = '?api_key=bd2cd46f09d0c01b4fe8699d010953c1&language=ru';
const imgFilmUrl = 'https://image.tmdb.org/t/p/w200';

function getData(filmId) {
  fetch(`${baseUrl}${filmId}${apiKey}`)
    .then(response => response.json())
    .then(data => parseFilmData(data))
    .catch(error => console.error(error));
}

function parseFilmData(data) {
  const element = `<section class="detailsPage">
    <div class="detailsPage__container">
    <figure>
    <img class="poster" src="${imgFilmUrl}${data.poster_path}" alt="film-poster" />
    </figure>
    <div class="film-info__container">
    <h2 class="title film-title">${data.title}</h2>
    <table>
    <tr>
    <td>vote / votes</td>
    <td>${data.vote_average} / ${data.vote_count}</td>
    </tr>
    <tr>
    <td>original title</td>
    <td>${data.original_title}</td>
    </tr>
    <tr>
    <td>popularity</td>
    <td>${data.popularity}</td>
    </tr>
    <tr>
    <td>genre</td>
    <td>${data.genres[0].name}</td>
    </tr>
    </table>
    <h2 class="title">About</h2>
    <p class="text">
    ${data.overview}
    </p>
    </div>
    </div>
    <button data-id="${data.id}" class="button button__add-to-library">Add to library</button>
    </section>`;
  const objToString = element.toString();
  popularFilmsData.flag = true;
  renderList(objToString);

  document.querySelector('.button__add-to-library').addEventListener('click', addToLibrary);
}

function addToLibrary(event) {
  const filmId = event.target.getAttribute('data-id');
  const currentLibarary = localStorage.getItem('library') || '';
  const newLibarary = [filmId, ...currentLibarary.split(',')];

  localStorage.setItem('library', newLibarary);
}
