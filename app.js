const $ = document;

const searchBtn = $.querySelector(".search-btn");
const searchInput = $.querySelector(".search-bar");
const searchContainer = $.querySelector(".search");
const resultContainer = $.querySelector(".result");
const container = $.querySelector(".container");
const audio = $.querySelector(".audio");

searchBtn.addEventListener("click", () => {
  if (searchInput.value) {
    searchword(searchInput.value);
    clearInput();
  }
});

function moveBoxes() {
  resultContainer.style.top = "55vh";
  resultContainer.style.height = "max-content";
  resultContainer.style.paddingBottom = "1.5rem";
  searchContainer.style.top = "5vh";
}

function searchword(word) {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      showResult(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

function showResult(res) {
    if(res.title){
        resultElem = `
        <h2 class="searched-word">${res.title}</h2>
        `;
    }else{
        resultElem = `
        <h2 class="searched-word">${res[0].word}</h2>
        <h5 class="phonetic">${res[0].phonetics[0].text}</h5>
        <h2 class="definition">${res[0].meanings[0].definitions[0].definition}</h2>
        <button class="fa-soundcloud" onclick="playAudio('${res[0].phonetics[0].audio}')">PLAY</button>`;
    }
  resultContainer.innerHTML = resultElem;
  moveBoxes();
}

function playAudio(url){
  audio.setAttribute("src" , url);
  audio.play();
}

function clearInput() {
  searchInput.value = "";
}
