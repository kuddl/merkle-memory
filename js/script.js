// set global namespace for localstorage

const userModel = {
  player1: { name: "Player 1" },
  player2: { name: "Player 2" },
};

const gameModel = {
  dimensions: { x: 4, y: 4 },
  tileSet: "default",
  tileBackImage: "default",
};

const userdata = store.namespace("userdata");
const gamedata = store.namespace("gamedata");

userdata(userModel);
gamedata(gameModel);
