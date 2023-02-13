const searchFormEl = document.querySelector(`#search-form`);
const searchQueryEl = document.querySelector(`#search-query`);
const searchResultsEl = document.querySelector(`#search-results`);
const loaderEl = document.querySelector(`.loader`);

const songList = (e) => {
  e.preventDefault();
  searchResultsEl.innerHTML = "";
  const query = searchQueryEl.value;
  fetch("./data.json")
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      let hasResults = false;
      const list = json.results;
      for (let i = 0; i < list.length; i++) {
        const artist = list[i].artistName;
        const track = list[i].trackName;
        const play = list[i].previewUrl;
        const img = list[i].artworkUrl100;
        const includesQueryArtist = artist
          .toLowerCase()
          .includes(query.toLowerCase());
        const includesQueryTrack = track
          .toLowerCase()
          .includes(query.toLowerCase());
        if (includesQueryArtist || includesQueryTrack) {
          hasResults = true;
          searchResultsEl.innerHTML += `<div class="song">
                <img src="${img}" class="song-img">
                <div class="artist">${artist}</div>
                <div class="track">${track}</div>
                <audio controls class="play">
                  <source src="${play}" type="audio/x-m4a">
                </audio>
              <div>`;
        }
        if (!hasResults && i === list.length - 1) {
          searchResultsEl.innerHTML = `<div class="no-result">No results</div>`;
        }
        if (query === "") {
          searchResultsEl.innerHTML = "";
        }
      }
    });
};

document.addEventListener(
  "play",
  (event) => {
    const audio = document.getElementsByTagName("audio");
    for (let i = 0; i < audio.length; i++) {
      if (audio[i] != event.target) {
        audio[i].pause();
      }
    }
  },
  true
);

searchFormEl.addEventListener(`keyup`, function (e) {
  loaderEl.classList.remove("hide");
  searchResultsEl.innerHTML = "";
  setTimeout(function () {
    loaderEl.classList.add("hide");
    songList(e);
  }, 2000);
});
searchFormEl.addEventListener(`submit`, function (e) {
  loaderEl.classList.remove("hide");
  searchResultsEl.innerHTML = "";
  setTimeout(function () {
    loaderEl.classList.add("hide");
    songList(e);
  }, 2000);
});
