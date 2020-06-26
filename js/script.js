const $start = document.querySelector("#start");
const $gameField = document.querySelector(".field_box");
const $gameTitle = document.querySelector(".game_title");
const $time = document.querySelector("#time");
const $timeInput = document.querySelector("#time_input");
const $resultTitle = document.querySelector(".game_title_result");
const $resultGame = document.querySelector("#result");
let score = 0;
let isGameStarted = false;

$start.addEventListener("click", startGame);
$gameField.addEventListener("click", handleBoxClick);
//$timeInput.addEventListener('keyup', handleInput)

function startGame() {
  isGameStarted = true;
      $start.classList.add("hide");
      $gameField.style.background = "#fff";
      $time.textContent = $timeInput.value
      $resultTitle.style.display = "none";
      $gameTitle.classList.remove('hide')

  const interval = setInterval(() => {
    let time = parseFloat($time.textContent);
    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);
  renderBox();
}

function endGame() {
  isGameStarted = false;
  $resultGame.textContent = String(score);
  $gameTitle.classList.add("hide");
  $resultTitle.style.display = "block";
  $start.classList.remove("hide");
  $gameField.style.background = "#bababa";
  let $internalSpace = $gameField.querySelectorAll("div");
  for (let i = 0; i < $internalSpace.length; i++) {
    if (!$internalSpace[i].classList.contains("field_box_button"))
      $internalSpace[i].remove();
  }
}

function renderBox() {
  let innerBox = document.createElement("div");
  innerBox.style.background = getRandomColor();
  innerBox.style.height = innerBox.style.width = getRandomValue(0, 100) + "px";
  innerBox.style.position = "absolute";
  innerBox.style.top = getRandomValue(0, 250) + "px";
  innerBox.style.left = getRandomValue(0, 340) + "px";
  innerBox.style.cursor = "pointer";
  innerBox.setAttribute("class", "inner_box");
  $gameField.insertAdjacentElement("afterbegin", innerBox);
}

function handleBoxClick(event) {
  if (isGameStarted) {
    let $boxes = $gameField.querySelectorAll("div");
    if (event.target.classList.contains("inner_box")) {
      score++;
      for (let i = 0; i < $boxes.length; i++) {
        if (!$boxes[i].classList.contains("field_box_button"))
          $boxes[i].remove();
      }
      renderBox();
    }
  }
}

function handleInput() {
  $time.textContent = $timeInput.nodeValue;
}

function getRandomValue(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  let color;
  let choice = getRandomValue(0, 7);
  switch (choice) {
    case 1:
      color = "red";
      break;

    case 2:
      color = "orange";
      break;

    case 3:
      color = "black";
      break;

    case 4:
      color = "blue";
      break;

    case 5:
      color = "yellow";
      break;

    case 6:
      color = "pink";
      break;

    case 7:
      color = "green";
      break;

    default:
      color = "black";
      break;
  }
  return color;
}
