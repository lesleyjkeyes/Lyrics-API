// USE WITH FIREBASE AUTH
// import checkLoginStatus from './helpers/auth';
import axios from 'axios';
import 'bootstrap'; // import bootstrap elements and js
// import { render } from 'sass';
import '../styles/main.scss';

const renderToDOM = (divId, content) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = content;
};

const htmlStructure = () => {
  const domString = `
  <div id ="form-container"></div>
  <div id="lyrics-container"></div>
  `;
  renderToDOM('#app', domString);
};

const getLyrics = (artist, song) => new Promise((resolve, reject) => {
  axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const lyricsOnDom = (artist, song) => {
  getLyrics(artist, song).then((response) => {
    renderToDOM('#lyrics-container', response.lyrics);
  });
};

const formOnDom = () => {
  const domString = `
  <form id = "form">
  <div class="mb-3">
    <label for="artist" class="form-label">Artist</label>
    <input type="text" class="form-control" id="artist">
  </div>
  <div class="mb-3">
    <label for="title" class="form-label">Song Title</label>
    <input type="text" class="form-control" id="songTitle" aria-describedby="emailHelp">
  </div>
  <button type="submit" class="btn btn-primary">Find Lyrics</button>
</form>
  `;
  renderToDOM('#form-container', domString);
};

const renderUserLyrics = () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputArtist = document.querySelector('#artist').value;
    const inputSong = document.querySelector('#songTitle').value;
    lyricsOnDom(inputArtist, inputSong);
    form.reset();
  });
};

const init = () => {
  htmlStructure();
  formOnDom();
  renderUserLyrics();
};

init();
