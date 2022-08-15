(function () {
  const gameData = gamedata();
  const userData = userdata();
  const player1Element = document.querySelector(".player1");
  const player2Element = document.querySelector(".player2");
  const scoreElement = document.querySelector(".score");
  const gameboard = document.querySelector(".game-grid");

  // set playernames
  player1Element.innerHTML = userData.player1.name;
  player2Element.innerHTML = userData.player2.name;

  // set gameboard
  gameboard.style.setProperty("--gameX", gameData.dimensions.x);
  gameboard.style.setProperty("--gameY", gameData.dimensions.y);
})();
