function fillLoginForm() {
  document.getElementById("player1").value = userdata("player1").name;
  document.getElementById("player2").value = userdata("player2").name;
  if (gamedata("dimensions")) {
    const btnid = `playground${gamedata("dimensions").x}${
      gamedata("dimensions").y
    }`;
    document.getElementById(btnid).checked = true;
  }
}

function resetLoginForm(e) {
  // Use default rest action and only blank local storage
  userdata("player1", { name: "" });
  userdata("player2", { name: "" });
  gamedata("dimensions", null);
}

function submitLoginForm(e) {
  if (
    document.getElementById("player1").value.length === 0 ||
    document.getElementById("player2").value.length === 0 ||
    !document.querySelector("input[name=playground]:checked")
  ) {
    return false;
  }
  userdata("player1", { name: document.getElementById("player1").value });
  userdata("player2", { name: document.getElementById("player2").value });
  const dimensions = document.querySelector(
    "input[name=playground]:checked"
  ).value;
  gamedata("dimensions", { x: dimensions.charAt(0), y: dimensions.charAt(1) });
}

fillLoginForm();
