const gameData = gamedata();
const userData = userdata();
// shuffle array in place
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const amountOfPairs = Math.floor(
  (parseInt(gameData.dimensions.x) * parseInt(gameData.dimensions.y)) / 2
);

function setupBoard() {
  const player1Element = document.querySelector(".player1");
  const player2Element = document.querySelector(".player2");
  const scoreElement = document.querySelector(".score");
  const gameboard = document.querySelector(".game-grid");
  // const imageSet = "frontside-colored";
  const imageSet = ["frontside-colored", "frontside-abstract"][
    Math.round(Math.random())
  ];
  gamedata({
    winner: "",
    score: [0, 0],
  });

  // get random backside image
  const backsideImage = `img/backside/backside${
    Math.floor(Math.random() * 3) + 1
  }.svg`;

  // set playernames
  player1Element.innerHTML = userData.player1.name;
  player2Element.innerHTML = userData.player2.name;

  // set gameboard
  gameboard.style.setProperty("--gameX", gameData.dimensions.x);
  gameboard.style.setProperty("--gameY", gameData.dimensions.y);

  const allImages = [];

  for (let i = 1; i < 21; i++) {
    allImages.push(`img/${imageSet}/front${i}.svg`);
  }

  // select random subset of images
  const pickedImages = [];
  for (let i = 0; i < amountOfPairs; i++) {
    const randomIndex = Math.floor(Math.random() * allImages.length);
    pickedImages.push(allImages.splice(randomIndex, 1)[0]);
  }

  // create card pairs
  const cards = [];
  for (let i = 0; i < pickedImages.length; i++) {
    for (let j = 0; j < 2; j++) {
      const card = document.createElement("memory-card");
      card.setAttribute("image", pickedImages[i]);
      card.setAttribute("backside-image", backsideImage);
      card.addEventListener("click", game);
      cards.push(card);
    }
  }

  // populate board
  shuffleArray(cards).forEach((card) => {
    gameboard.appendChild(card);
  });
}

let openCards = [];
let score = [0, 0];
let activePlayer = 0;

function displayNewScore() {
  const scoreElement = document.querySelector(".score");
  scoreElement.innerHTML = `${score[0]} : ${score[1]}`;
}

function displayActivePlayer() {
  const player1Element = document.querySelector(".player1");
  const player2Element = document.querySelector(".player2");
  if (activePlayer === 0) {
    player1Element.classList.add("player--active");
    player2Element.classList.remove("player--active");
  } else {
    player2Element.classList.add("player--active");
    player1Element.classList.remove("player--active");
  }
}

function loadSuccessPage() {
  setTimeout(() => {
    gamedata("winner", getWinnerName());
    window.location.href = "success.html";
  }, 3000);
}

displayActivePlayer();

function isGameDone() {
  return score[0] + score[1] === amountOfPairs;
}

function getWinnerName() {
  const userData = userdata();

  gamedata({
    score: score,
  });
  if (score[0] > score[1]) {
    return userData.player1.name;
  }
  if (score[0] < score[1]) {
    return userData.player2.name;
  }
  window.location.reload();
}

function hideCard(card) {
  card.classList.add("card--hidden");
}

function game(event) {
  // if the card is already open, then don't do anything
  if (event.target.getAttribute("open") || openCards.length >= 2) {
    return;
  }
  openCards.push(event.target);
  event.target.setAttribute("open", true);
  if (openCards.length === 2) {
    if (
      openCards[0].getAttribute("image") === openCards[1].getAttribute("image")
    ) {
      // if cards match
      openCards.forEach((card) => {
        card.removeEventListener("click", game);
      });
      score[activePlayer]++;
      displayNewScore();
      hideCard(openCards[0]);
      hideCard(openCards[1]);
      openCards = [];
      if (isGameDone()) {
        loadSuccessPage();
      }
    } else {
      // if cards don't match
      activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
      setTimeout(() => {
        displayActivePlayer();
        openCards.forEach((card) => {
          card.removeAttribute("open");
        });
        openCards = [];
      }, 1000);
    }
  }
}

(function () {
  setupBoard();
})();

// auto solve
(async () => {
  return; // remove stopper
  const allCards = document.querySelectorAll("memory-card");
  const pause = (seconds = 1000) =>
    new Promise((resolve) => setTimeout(resolve, seconds));
  // start solving (iife)
  (async function solveRound() {
    await pause();
    let firstCard = "";

    allCards.forEach(async (card) => {
      // already solved; return
      if (card.classList.contains("card--hidden")) return;

      // source of current card
      const imgSrc = card.getAttribute("image");

      // pick first
      if (!firstCard) {
        firstCard = imgSrc;
        card.click();
        return;
      }

      //  pick seccond
      if (imgSrc === firstCard) {
        await pause(1500);
        card.click();
        solveRound();
      }
    });
  })();
})();
