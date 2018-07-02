/* global document */


let cards = [],
	allCards = [];
let difficulty = '';
let cardStyle = '';

// opens a dialog box and lets the player choose the difficulty level
function initGame() {
	// lets the player to choose difficulty
	document.getElementById('difficultyModal').classList.add('show-modal');
	document.getElementById('easyButton').addEventListener('click', function () {
		eventsOnDifficultyButtons('easy');
	});
	document.getElementById('mediumButton').addEventListener('click', function () {
		eventsOnDifficultyButtons('medium');
	});
	document.getElementById('hardButton').addEventListener('click', function () {
		eventsOnDifficultyButtons('hard');
	});
}
initGame();

//generates deck with the chosen difficulty
function eventsOnDifficultyButtons(chosenDifficulty) {
	difficulty = chosenDifficulty;
	cards = chooseDifficulty(difficulty);
	removeDifficultyModal();
	// Sets the styling correctly for each difficulty 
	if (difficulty === 'medium') {
		document.getElementsByClassName('deck')[0].classList.add('mediumStyle');
		document.getElementsByClassName('deck')[0].classList.remove('hardStyle');

	} else if (difficulty === 'hard') {
		document.getElementsByClassName('deck')[0].classList.add('hardStyle');
		document.getElementsByClassName('deck')[0].classList.remove('mediumStyle');

	} else {
		document.getElementsByClassName('deck')[0].classList.remove('mediumStyle');
		document.getElementsByClassName('deck')[0].classList.remove('hardStyle');

	}
	generateDeck();
	allCards = document.querySelectorAll('.' + cardStyle);
	addEventsToCards();
}
// closes modal with the difficulty buttons
function removeDifficultyModal() {
	const difficultyModal = document.getElementById('difficultyModal');
	difficultyModal.classList.remove('show-modal');
}

//creates an the array of symbols according to the difficulty chosen by the player

function chooseDifficulty(difficulty) {
	let generatedCards = [];
	switch (difficulty) {
		case 'easy':
			generatedCards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'];
			break;
		case 'medium':
			generatedCards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb', 'fa-heart', 'fa-heart', 'fa-home', 'fa-home', 'fa-tree', 'fa-tree', 'fa-tint', 'fa-tint', 'fa-bell', 'fa-bell', 'fa-thumbs-up', 'fa-thumbs-up', 'fa-truck', 'fa-truck', 'fa-user-secret', 'fa-user-secret', 'fa-umbrella', 'fa-umbrella', 'fa-cloud', 'fa-cloud'];
			break;

		case 'hard':
			generatedCards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb', 'fa-heart', 'fa-heart', 'fa-home', 'fa-home', 'fa-tree', 'fa-tree', 'fa-tint', 'fa-tint', 'fa-bell', 'fa-bell', 'fa-thumbs-up', 'fa-thumbs-up', 'fa-truck', 'fa-truck', 'fa-user-secret', 'fa-user-secret', 'fa-umbrella', 'fa-umbrella', 'fa-cloud', 'fa-cloud', 'fa-wrench', 'fa-wrench', 'fa-trash', 'fa-trash', 'fa-sign-language', 'fa-sign-language', 'fa-sun-o', 'fa-sun-o', 'fa-balance-scale', 'fa-balance-scale', 'fa-plane', 'fa-plane', 'fa-ship', 'fa-ship', 'fa-shopping-cart', 'fa-shopping-cart', 'fa-rocket', 'fa-rocket', 'fa-pencil', 'fa-pencil', 'fa-paint-brush', 'fa-paint-brush', 'fa-recycle', 'fa-recycle', 'fa-gift', 'fa-gift', 'fa-gamepad', 'fa-gamepad'];
			break;
	}
	return generatedCards;
}
// Creates a list that holds all of the cards

function generateCard(card) {

	if (difficulty === 'hard') {
		cardStyle = 'cardHard';
	} else if (difficulty === 'medium') {
		cardStyle = 'cardMedium';
	} else {
		cardStyle = 'card';
	}
	return `<li class="${cardStyle}" data-picture="${card}"><i class="fa ${card} "></i></li>`;
}

/* Displays the cards on the page
- shuffles the list of cards using the provided "shuffle" method 
- loops through each card and creates its HTML
- adds each card's HTML to the page
*/

function generateDeck() {
	const deck = document.querySelector('.deck');
	let cardHTML = shuffle(cards).map(function (card) {
		return generateCard(card);
	});
	deck.innerHTML = cardHTML.join('');
}

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

// creates and displays the timer

let time = 0;
let timerStatus = true;

function startTimer() {
	timerStatus = true;
	timer();
}

function stopTimer() {
	timerStatus = false;
}

function resetTimer() {

	timerStatus = false;
	time = 0;
	document.getElementById('timerLabel').textContent = "00 : 00 : 00";
}

function timer() {

	if (timerStatus === true) {

		setTimeout(function () {

			time++;

			let min = Math.floor(time / 100 / 60);
			let sec = Math.floor(time / 100);
			let msec = time % 100;

			if (min < 10) {
				min = "0" + min;
			}

			if (sec >= 60) {
				sec = sec % 60;
			}

			if (sec < 10) {
				sec = "0" + sec;
			}
			if (msec < 10) {
				msec = "0" + msec;
			}

			document.getElementById('timerLabel').textContent = ` ${min} : ${sec} : ${msec} `;

			timer();

		}, 10);

	}
}

let totalMoves = 0;
let matchedPairs = 0;
let openCards = [];
let stars = [];
let starNumber = 3;
const allStars = document.querySelectorAll('.stars');
let firstClick = 0;
let totalTime = 0;
let disableClicks = false;
let starId = 1;

function displayCard(card) {
	//  when the player clicks  the first time on a card the timer starts   
	firstClick++;
	if (firstClick === 1) {
		startTimer();
	}
	//prevents actions from being triggered when clicking on the same card
	if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match'))

	// adds the card to an array of "open" cards
	{
		openCards.push(card);

		// displays the card's symbol

		card.classList.add('open', 'show');

	}
}

// stores the stars in an array so they can be removed later

allStars.forEach(function (star) {
	stars.push(star);
});

// resets the number of stars and displays three stars when the game is reset or when the player starts a new game 

function resetStar() {
	starNumber = 3;
	for (let i = 1; i <= 3; i++) {
		document.getElementById('star-' + i).classList.add('fa-star');
		document.getElementById('star-' + i).classList.remove('fa-star-o');

	}
}

/* Removes a star everytime the player has made a number of moves starting from the cards' array length depending on the difficulty chosen.
For easy mode at: 16 moves -- 32 moves -- 48 moves 
For medium mode at: 36 moves -- 72 moves -- 108 moves
For hard mode at:  64 moves -- 128 moves -- 192 moves
*/
function removeStar() {

	let ratingThreshold = [cards.length, cards.length * 2, cards.length * 3];
	if (totalMoves === ratingThreshold[starId - 1]) {
		document.getElementById('star-' + starId).classList.remove('fa-star');
		document.getElementById('star-' + starId).classList.add('fa-star-o');
		starNumber--;
		starId++;
	}
}



// increments the move counter and displays it on the page


function displayMoves() {

	// I considered a complete move to take place  when at least two cards are flipped not when the user clicks on a card

	if (openCards.length === 2) {
		totalMoves++;
		document.querySelector('#moves').textContent = totalMoves;
		removeStar();
	}

}


function resetMoves() {
	totalMoves = 0;
	document.getElementById('moves').textContent = 0;
}

// triggers the refresh button so the reset dialog box will appear

const refreshButton = document.getElementById('refreshButton');

refreshButton.addEventListener('click', function () {
	resetTimer();
	const resetModal = document.getElementById('resetModal');
	resetModal.classList.add('show-modal');
});

//checks to see if the two cards match, if the list already has another card

function matchCards() {
	if (openCards.length === 2) {
		disableClicks = true;
		// when the cards do match, locks the two matching cards in the open position and increases the counter for pairs that match

		if (openCards[0].dataset.picture === openCards[1].dataset.picture) {
			openCards[0].classList.add('open', 'show', 'match');
			openCards[1].classList.add('open', 'show', 'match');
			matchedPairs++;
			openCards = [];
			disableClicks = false;
			// when the cards do not match, removes the cards from the list and hides the card's symbol

		} else {
			setTimeout(function () {
				openCards.forEach(function (card) {
					card.classList.add('nomatch');
					setTimeout(function () {
						card.classList.remove('open', 'show');
						card.classList.remove('nomatch');
						openCards = [];
						disableClicks = false;
					}, 300);
				});

			}, 150);
		}
	}
}

const endModal = document.getElementById('endModal');

//Displays victory dialog box

function addEndModal() {
	endModal.classList.add('show-modal');
	//shows the score summary with the total moves, rank and time 
	document.querySelector('#totalMoves').textContent = totalMoves;
	document.querySelector('#starScore').textContent = starNumber;
	document.querySelector('#time').textContent = totalTime;
}

//when all cards match, displays a dialog box with the final score

function victory(matchedPairs) {

	if (matchedPairs === cards.length / 2) {
		//gets the total time of the round
		stopTimer();
		totalTime = document.getElementById('timerLabel').textContent;
		addEndModal();
	}
}

// Closes the modal that apears when the player wins the game

function removeEndModal() {
	const closeModal = document.getElementById('endModal');
	closeModal.classList.remove('show-modal');
}

// When the player clicks on cancel, closes the modal and gets back to the game

const cancelButton = document.getElementById('cancelButton');
cancelButton.addEventListener('click', removeResetModal);

// Closes the modal that appears when the player resets the game 
function removeResetModal() {
	document.getElementById('resetModal').classList.remove('show-modal');
}

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', restartGame);

//restarts game 
function restartGame() {
	matchedPairs = 0;
	openCards = [];
	firstClick = 0;
	starId = 1;
	initGame();
	removeEndModal();
	removeResetModal();
	resetTimer();
	resetMoves();
	resetStar();
	generateDeck();
	allCards = document.querySelectorAll('.' + cardStyle);
	addEventsToCards();
}


// starts a new game after the user clicks the Play again button on the dialog box

const playAgainButton = document.getElementById('play');
playAgainButton.addEventListener('click', restartGame);

/*sets up the event listener for a card. If a card is clicked:
           -it will flip and display the symbol;
           -number of moves will be updated and shown;
           -will check to see if two flipped cards match;
           -checks if the victory condition is fulfilled */

function addEventsToCards() {
	allCards.forEach(function (card) {
		card.addEventListener('click', function () {
			if (disableClicks === false) {
				displayCard(card);
				displayMoves();
				matchCards(card);
				victory(matchedPairs);
			}
		});
	});
}