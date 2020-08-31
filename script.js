const gameContainer = document.getElementById("game");
const headers = document.getElementById("header-id");

document.getElementsByClassName('btn')[0].addEventListener('click', ()=> window.location.reload())
let myStorage = document.localStorage;

const arrayOfGifAddress = [
  'url(./gifs/1.gif)',
  'url(./gifs/2.gif)',
  'url(./gifs/3.gif)',
  'url(./gifs/4.gif)',
  'url(./gifs/5.gif)',
  'url(./gifs/6.gif)',
  'url(./gifs/7.gif)',
  'url(./gifs/8.gif)',
  'url(./gifs/9.gif)',
  'url(./gifs/10.gif)',
  'url(./gifs/11.gif)',
  'url(./gifs/12.gif)',
  'url(./gifs/1.gif)',
  'url(./gifs/2.gif)',
  'url(./gifs/3.gif)',
  'url(./gifs/4.gif)',
  'url(./gifs/5.gif)',
  'url(./gifs/6.gif)',
  'url(./gifs/7.gif)',
  'url(./gifs/8.gif)',
  'url(./gifs/9.gif)',
  'url(./gifs/10.gif)',
  'url(./gifs/11.gif)',
  'url(./gifs/12.gif)'
];


/**
 * Function to shuarrayOfGifAddress of array.<br>
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

let shuarrayOfGifAddress = shuffle(arrayOfGifAddress);

/**
 * Function loops over the array of colors<br>
 * It creates a new div and gives it a class with the value of the color.<br>
 * It also adds an event listener for a click for each card. * 
 * @param {array} array of colors 
 * @returns {div} Returns number of div is equal to the length of color.
 */

function createDivsForGifs(gifArray) {
  for (let gif of gifArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(gif);

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
let totalNumberOfClick = 0;

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
    firstClickDiv.style.backgroundImage = firstClickDiv.className;
    firstClickDiv.style.backgroundSize = '100% 100%'
    firstClickDiv.style.pointerEvents = "none";
    firstClick = false;
    totalNumberOfClick++;
  } else {
    event.target.style.backgroundImage = event.target.className;
    event.target.style.backgroundSize = '100% 100%'
    event.target.style.pointerEvents = "none";
    handleDelay = true;
    totalNumberOfClick++;
    isCardMatch(firstClickDiv, event.target);
  }

  if (count === COLORS.length/2) {
    const lastNumberOfTap = localStorage.getItem('numberOfTap')
    if(totalNumberOfClick < +lastNumberOfTap){
      localStorage.setItem('numberOfTap', `${totalNumberOfClick}`);
    }
    restartGame();
  }
}

/**
 * function to restart the game and showing the winning message.
 * @returns {} Show the confirmation alert to restart the message.
 */

function restartGame() {
  setTimeout(() => {
    if (confirm("You won the game, Do you wanna Restart the game")) {
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
      secondCard.style.backgroundImage = "";
      firstCard.style.backgroundImage = "";
      firstCard.style.pointerEvents = "auto";
      secondCard.style.pointerEvents = "auto";
    }, 1000);
    firstClick = true;
  }
  setTimeout(() => (handleDelay = false), 1000);
}

/**
 * Function to add an h3 which is containing score of the player.
 * @returns An h3 containing best tap count of player.
 */
function addPlayerScore() {
  let playerScore = document.createElement('h3');  
  let textNode = document.createTextNode(`Your highest score is ${localStorage.getItem('numberOfTap')}`);
  playerScore.appendChild(textNode);
  headers.appendChild(playerScore);
}

addPlayerScore();

// when the DOM loads
createDivsForGifs(shuarrayOfGifAddress);
