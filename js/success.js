(function () {
  const winner = gamedata().winner;
  const score = gamedata().score;
  if (score[0] === score[1]) {
    document.querySelector(".player__draw").classList.remove("player--hidden");
  } else {
    document
      .querySelector(".player__winner")
      .classList.remove("player--hidden");

    document.querySelector(".score").innerHTML = `${score[0]} : ${score[1]}`;
    document.querySelector(".player__winner span").innerHTML = winner;
    document.querySelector("#confetti").classList.remove("confetti--hidden");
  }
})();
