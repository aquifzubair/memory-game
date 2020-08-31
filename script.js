const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];


/**
 * Function to shuffle colors of array.<br>
 * Based on an algorithm called Fisher Yates.
 * @param {array} array of colours
 * @return {array} array of shuffled array
 */

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

/**
 * Function loops over the array of colors<br>
 * It creates a new div and gives it a class with the value of the color.<br>
 * It also adds an event listener for a click for each card. * 
 * @param {array} array of colors 
 * @returns {div} Returns number of div is equal to the length of color.
 */

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!

let firstClick = true;
let firstClickDiv;
let count = 0;
let handleDelay = false;

/**
 * Method to handle events for every events.
 * @param {event} Event of an element
 * 
 */

function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if (handleDelay) return;
  if (firstClick) {
    firstClickDiv = event.target;
    firstClickDiv.style.backgroundColor = event.target.className;

    firstClickDiv.style.pointerEvents = "none";
    firstClick = false;
  } else {
    event.target.style.backgroundColor = event.target.className;
    event.target.style.pointerEvents = "none";
    handleDelay = true;
    isCardMatch(firstClickDiv, event.target);
  }

  if (count === 5) {
    restartGame();
  }
}

/**
 * function to restart the game and showing the winning message.
 * @returns {} Show the confirmation alert to restart the message.
 */

function restartGame() {
  setTimeout(() => {
    if (confirm("You won the game, Do you wanna start the game")) {
      console.log("logic of starting game");
      window.location.reload();
    }
  }, 1000);
}

/**
 * Function to check that cards are same or not.
 * @param {Object} firstCard: target Object of first div
 * @param {Object} secondCard: target Object of second div
 * @return {} returns if both target color is same then colour will be there and remove the event listener else colour would be vanished.
 */

function isCardMatch(firstCard, secondCard) {
  if (firstCard.className === secondCard.className) {
    secondCard.removeEventListener("click", handleCardClick);
    firstCard.removeEventListener("click", handleCardClick);
    firstClick = true;
    count++;
  } else {
    setTimeout(() => {
      secondCard.style.backgroundColor = "";
      firstCard.style.backgroundColor = "";
      firstCard.style.pointerEvents = "auto";
      secondCard.style.pointerEvents = "auto";
    }, 1000);
    firstClick = true;
  }
  setTimeout(() => (handleDelay = false), 1000);
}

// when the DOM loads
createDivsForColors(shuffledColors);
