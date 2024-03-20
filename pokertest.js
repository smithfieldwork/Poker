"use strict";

const player1Card1 = document.getElementById("hand--1--card1");
const player1Card2 = document.getElementById("hand--1--card2");
const player2Card1 = document.getElementById("hand--2--card1");
const player2Card2 = document.getElementById("hand--2--card2");
const communityCard1 = document.getElementById("communityCard--1");
const communityCard2 = document.getElementById("communityCard--2");
const communityCard3 = document.getElementById("communityCard--3");
const communityCard4 = document.getElementById("communityCard--4");
const communityCard5 = document.getElementById("communityCard--5");
const communityCardsClass = document.getElementById("community--cards");
const btnNewHand = document.getElementById("new-hand-button");
const btnNewGame = document.getElementById("new-game-button");
const btnRaise = document.getElementById("raise-button");
const btnCall = document.getElementById("call-button");
const btnCheck = document.getElementById("check-button");
const btnFold = document.getElementById("fold-button");
const player1Dealing = document.getElementById("player--1--dealing");
const player2Dealing = document.getElementById("player--2--dealing");
const player1YourTurn = document.getElementById("player--1--YourTurn");
const player2YourTurn = document.getElementById("player--2--YourTurn");
const player1balance = document.getElementById("player--1--balance");
const player2balance = document.getElementById("player--2--balance");
const player1LatestBet = document.getElementById("player--1--latest--bet");
const player2LatestBet = document.getElementById("player--2--latest--bet");
const player1RoundTotal = document.getElementById("player--1--round--total");
const player2RoundTotal = document.getElementById("player--2--round--total");
const player1RoundStatus = document.getElementById("player--1--round--status");
const player2RoundStatus = document.getElementById("player--2--round--status");
const betInputPlayer1 = document.getElementById("bet--input--player1");
const betInputPlayer2 = document.getElementById("bet--input--player2");
const potObject = document.getElementById("pot");
const amountToCallObject = document.getElementById("amount--to--call");

const player1 = {
  dealing: false,
  toAct: false,
  status: "None",
  roundBet: 0,
  latestBet: 0,
  balance: 3000,
  hand: new Array(5).fill(-1),
};
//Build a feature that randomly assigns dealer
const player2 = {
  dealing: false,
  toAct: false,
  status: "None",
  roundBet: 0,
  latestBet: 0,
  balance: 3000,
  hand: new Array(5).fill(-1),
};

const communityCards = new Array(5);
let pot = 0;
let communityCardsShown = 0;
let betAmount = 0;
let playerActing = player2;
let playerNotActing = player1;
let amountToCall = 0;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function dealPlayerHand(playerArray) {
  playerArray[0] = getRandomInt(0, 51);
  playerArray[1] = getRandomInt(0, 51);
}

function dealCommunityCards() {
  communityCards[0] = getRandomInt(0, 51);
  communityCards[1] = getRandomInt(0, 51);
  communityCards[2] = getRandomInt(0, 51);
  communityCards[3] = getRandomInt(0, 51);
  communityCards[4] = getRandomInt(0, 51);
}

function hideCommunityCards() {
  communityCardsClass.classList.add("hidden");
}

function setCardImages() {
  player1Card1.src = `Deck of Cards/${player1.hand[0]}.png`;
  player1Card2.src = `Deck of Cards/${player1.hand[1]}.png`;
  player2Card1.src = `Deck of Cards/backofcard.png`;
  player2Card2.src = `Deck of Cards/backofcard.png`;
  communityCard1.src = `Deck of Cards/${communityCards[0]}.png`;
  communityCard2.src = `Deck of Cards/${communityCards[1]}.png`;
  communityCard3.src = `Deck of Cards/${communityCards[2]}.png`;
  communityCard4.src = `Deck of Cards/${communityCards[3]}.png`;
  communityCard5.src = `Deck of Cards/${communityCards[4]}.png`;
}

function checkRoundOver() {
  let roundOver = false;
  if (
    (player1.status === "Call" && player2.status === "Check") ||
    (player2.status === "Call" && player1.status === "Check") ||
    player1.status === "Fold" ||
    player2.status == "Fold" ||
    (player1.status === "Check" && player2.status === "Check")
    //add in condition of roundbet being equal raise and call
  ) {
    roundOver = true;
  }
  return roundOver;
}

function setDealer() {
  if (checkIsFirstHand()) {
    player1.dealing = true;
  } else {
    changeDealer();
  }
}
function changeDealer() {
  if (player1.dealing === true) {
    player1.dealing = false;
    player2.dealing = true;
  } else if (player2.dealing === true) {
    player2.dealing = false;
    player1.dealing = true;
  }
}
function showDealer() {
  if (player1.dealing) {
    player1Dealing.innerHTML = "Dealing";
    player2Dealing.innerHTML = "<br>";
  } else if (player2.dealing) {
    player1Dealing.innerHTML = "<br>";
    player2Dealing.innerHTML = "Dealing";
  }
}

function postBigBlind(player) {
  player.balance -= 50;
  player.latestBet = 50;
  player.roundBet = 50;
  pot += 50;
}

function postSmallBlind(player) {
  player.balance -= 25;
  player.latestBet = 25;
  player.roundBet = 25;
  pot += 25;
}

function updateRoundTotal(amount) {
  playerActing.roundBet += amount;
}

function updateLatestBet(amount) {
  playerActing.latestBet += amount;
}

function updateBalance(amount) {
  playerActing.balance -= amount;
}

function updatePot(amount) {
  pot += amount;
}

function updateAmountToCall() {
  amountToCall = currentBetAmount();
}

function updateAllBalances() {
  player1balance.innerHTML = player1.balance;
  player2balance.innerHTML = player2.balance;
  player1LatestBet.innerHTML = player1.latestBet;
  player2LatestBet.innerHTML = player2.latestBet;
  player1RoundTotal.innerHTML = player1.roundBet;
  player2RoundTotal.innerHTML = player2.roundBet;
  potObject.innerHTML = pot;
}

function currentBetAmount() {
  return Math.abs(player1.roundBet - player2.roundBet);
}

function checkIsFirstHand() {
  if (player1.toAct === false && player2.toAct === false) {
    return true;
  } else {
    return false;
  }
}

function newHand() {
  dealPlayerHand(player1.hand);
  dealPlayerHand(player2.hand);
  dealCommunityCards();
  hideCommunityCards();
  setCardImages();
  setDealer();
  showDealer();
  if (checkIsFirstHand()) {
    setToAct();
  } else {
    changeToAct();
    console.log(player2.status);
  }

  postBigBlind(playerNotActing);
  postSmallBlind(playerActing);
  updateAllBalances();
  updatePlayerTurn();

  betAmount = 25;
  playerActing.status = "Small Blind";
  playerNotActing.status = "Big Blind";
  updateAmountToCall();
  updatePlayerTextContent(playerActing);
  updatePlayerTextContent(playerNotActing);
}

btnNewGame.addEventListener("click", function () {
  //reset balances and pot
  //
  player1.dealing = false;
  player1.toAct = false;
  player2.dealing = false;
  player2.toAct = false;
  newHand();
});

function updatePlayerTurn() {
  if (player1.toAct === true) {
    player1YourTurn.innerHTML = "Your Turn";
    player2YourTurn.innerHTML = " ";
  } else if (player2.toAct === true) {
    player2YourTurn.innerHTML = "Your Turn";
    player1YourTurn.innerHTML = " ";
  }
}

function checkValidCall() {
  var result = true;

  if (
    !(
      playerNotActing.status === "Raise" ||
      playerNotActing.status === "Big Blind"
    )
  ) {
    window.alert("No raise was made");
    result = false; //
  }

  return result;
}

function checkValidCheck() {
  var result = true;

  if (
    playerNotActing.status === "Raise" ||
    playerNotActing.status === "Big Blind"
  ) {
    window.alert("You cannot check here");
    result = false; //
  }

  return result;
}

function handleCall(betAmount) {
  updateLatestBet(betAmount);
  updateRoundTotal(betAmount);
  updateBalance(betAmount);
  updatePot(betAmount);
  updateAllBalances();
  updateAmountToCall();
  playerActing.status = "Call";
}

function handleRaise(betAmount) {
  playerActing.status = "Raise";

  updateLatestBet(betAmount);
  updateRoundTotal(betAmount);
  updateBalance(betAmount);
  updatePot(betAmount);
  updateAmountToCall();
  updatePlayerTextContent();
  //need to include when raise not enough
}

//include a betdirfference display

function handleHandWinner(player) {
  player.balance += pot;
  pot = 0;
  updatePlayerTextContent;
}

function showCommunityCards() {
  if (checkRoundOver() && communityCardsShown === 0) {
    showFlop();
    resetPlayerStatus();
  } else if (checkRoundOver() && communityCardsShown === 3) {
    showTurnCard();
    resetPlayerStatus();
  } else if (checkRoundOver() && communityCardsShown === 4) {
    showRiverCard();
    resetPlayerStatus();
  }
}

function resetPlayerStatus() {
  player1.status = "None";
  player2.status = "None";
  player1RoundStatus.innerHTML = "None";
  player2RoundStatus.innerHTML = "None";
}

function showFlop() {
  communityCardsClass.classList.remove("hidden");
  communityCard1.classList.remove("hidden");
  communityCard2.classList.remove("hidden");
  communityCard3.classList.remove("hidden");
  communityCardsShown = 3;
}
function showTurnCard() {
  communityCard4.classList.remove("hidden");
  communityCardsShown = 4;
}

function showRiverCard() {
  communityCard5.classList.remove("hidden");
  communityCardsShown = 5;
}

function setToAct() {
  if (player1.dealing === true) {
    player2.toAct = true;
  } else if (player2.dealing === true) {
    player1.toAct = true;
  }
}

function changeToAct() {
  if (player1.toAct === true) {
    player1.toAct = false;
    player2.toAct = true;
    playerActing = player2;
    playerNotActing = player1;
  } else if (player2.toAct === true) {
    player2.toAct = false;
    player1.toAct = true;
    playerActing = player1;
    playerNotActing = player2;
  }
}
//check if this function is still necessary
function updatePlayerTextContent() {
  player1RoundStatus.innerHTML = player1.status;
  player2RoundStatus.innerHTML = player2.status;

  player1balance.textContent = player1.balance;
  player1RoundTotal.textContent = player1.roundBet;
  player1LatestBet.textContent = player1.latestBet;

  player2balance.textContent = player2.balance;
  player2RoundTotal.textContent = player2.roundBet;
  player2LatestBet.textContent = player2.latestBet;

  potObject.innerHTML = pot;
  amountToCallObject.innerHTML = amountToCall;
}

function roundOver() {
  player1.latestBet = 0;

  player2.latestBet = 0;

  updatePlayerTextContent(playerActing);
}

btnCall.addEventListener("click", function () {
  if (checkValidCall() === true) {
    //console.log(player1.status);
    //console.log(player2.status);
    console.log(player1.latestBet);
    console.log(player1.roundBet);
    handleCall(currentBetAmount());
    console.log(player1.latestBet);
    console.log(player1.roundBet);
    showCommunityCards();
    changeToAct();
    updatePlayerTurn();
    console.log(player1.latestBet);
    console.log(player1.roundBet);
    //console.log(player1.status);
    //console.log(player2.status);
    roundOver();
  }
});

btnCheck.addEventListener("click", function () {
  // insert check valid check function
  if (checkValidCheck()) {
    playerActing.status = "Check";
    updatePlayerTextContent(playerActing);

    showCommunityCards();
    changeToAct();
    updatePlayerTurn();
  }
  if (playerActing.status === "Check" && playerNotActing.status === "Check") {
    roundOver();
  }
});

btnFold.addEventListener("click", function () {
  handleHandWinner(playerNotActing);
  roundOver();
  //insert appropriate pot changes into winner balance
  //change dealer
  //hand finished function
  //console.log(checkIsFirstHand());
  newHand();
  //console.log(checkIsFirstHand());
});

btnRaise.addEventListener("click", function () {
  let betAmount;
  console.log(playerActing.status);
  console.log(playerNotActing.status);
  if (playerActing === player1) {
    betAmount = parseInt(betInputPlayer1.value); // Get the value of the input field
  } else if (playerActing === player2) {
    betAmount = parseInt(betInputPlayer2.value); // Get the value of the input field
  }

  // Check if betAmount is a valid number
  if (!isNaN(betAmount) && betAmount > 0) {
    handleRaise(betAmount); // Pass the betAmount to handleRaise function
    changeToAct();
    updatePlayerTurn();
  } else {
    window.alert("Please enter a valid bet amount."); // Alert user if the bet amount is not valid
  }

  console.log(playerActing.status);
  console.log(playerNotActing.status);
});

// Hand Ranking
//0 - High Card
//1 - OnePair
//2 - Two Pair
//3 - Three of a kind
//4 - Straight
//5 - Flush
//6 - Full House
//7 - Poker
//8 - Straight Flush

function rankHand(cardHand) {
  let ranking = 0;

  if (checkForSinglePair(cardHand)) {
    ranking = 1;
  } else if (checkForTwoPairs(cardHand)) {
    ranking = 2;
  } else if (checkForTriple(cardHand)) {
    ranking = 3;
  } else if (checkForSinglePair(cardHand) && checkForTriple(cardHand)) {
    ranking = 6;
  } else if (checkForAPoker(cardHand)) {
    ranking = 7;
  } else if (checkForAStraight(cardHand) && checkForAFlush(cardHand)) {
    ranking = 8;
  }

  return ranking;
}
function convertCardToNumberSuit(cardInteger) {
  let card = new Array(2);
  card[0] = cardInteger % 13;
  card[1] = Math.floor(cardInteger / 13);

  return card;
}
function checkForRepeatedCards(cardHand) {
  let cardsNoSuit = {};
  let pairsCount = 0;

  for (let i = 0; i < cardHand.length; i++) {
    const cardValue = convertCardToNumberSuit(cardHand[i])[0];

    if (cardsNoSuit[cardValue]) {
      cardsNoSuit[cardValue]++;
    } else {
      console.log(cardsNoSuit[cardValue]);
      cardsNoSuit[cardValue] = 1;
    }
  }
  return cardsNoSuit;
}

function checkForSinglePair(cardHand) {
  let numberOfPairs = 0;
  let singlePairPresent = false;

  let cardsCountObject = checkForRepeatedCards(cardHand);
  for (const i in cardsCountObject) {
    if (cardsCountObject[i] === 2) {
      numberOfPairs++;
    }
  }
  if (numberOfPairs === 1) {
    singlePairPresent = true;
  }

  return singlePairPresent;
}

function checkForTwoPairs(cardHand) {
  let numberOfPairs = 0;
  let twoPairsPresent = false;

  let cardsCountObject = checkForRepeatedCards(cardHand);
  for (const i in cardsCountObject) {
    if (cardsCountObject[i] === 2) {
      numberOfPairs++;
    }
  }
  if (numberOfPairs === 2) {
    twoPairsPresent = true;
  }

  return twoPairsPresent;
}

function checkForTriple(cardHand) {
  let triplePresent = false;

  let cardsCountObject = checkForRepeatedCards(cardHand);
  for (let i in cardsCountObject) {
    if (cardsCountObject[i] === 3) {
      triplePresent = true;
    }
    if (cardsCountObject[i] === 4) {
      triplePresent = false;
    }
  }

  return triplePresent;
}
function checkForAStraight(cardHand) {
  let straightPresent = false;
  let valueOfCards = new Array(5);
  let count = 0;

  for (let i in cardHand) {
    let cardValue = convertCardToNumberSuit(cardHand[i])[0] + 1;
    valueOfCards[count] = cardValue;
    count++;
  }
  let sortedCards = valueOfCards.sort(function (a, b) {
    return a - b;
  });

  if (
    (sortedCards[0] === sortedCards[1] - 1 &&
      sortedCards[0] === sortedCards[2] - 2 &&
      sortedCards[0] === sortedCards[3] - 3 &&
      sortedCards[0] === sortedCards[4] - 4) ||
    (sortedCards[0] === 1 &&
      sortedCards[1] === 10 &&
      sortedCards[2] === 11 &&
      sortedCards[3] === 12 &&
      sortedCards[4] === 13)
  ) {
    straightPresent = true;
  }

  return straightPresent;
}
function checkForAFlush(cardHand) {
  let flushPresent = false;
  let suitOfCards = new Array(5);
  let count = 0;

  for (let i in cardHand) {
    let cardSuit = convertCardToNumberSuit(cardHand[i])[1];
    suitOfCards[count] = cardSuit;
    count++;
  }

  if (
    suitOfCards[0] === suitOfCards[1] &&
    suitOfCards[0] === suitOfCards[2] &&
    suitOfCards[0] === suitOfCards[3] &&
    suitOfCards[0] === suitOfCards[4]
  ) {
    flushPresent = true;
  }

  return flushPresent;
}

function checkForAPoker(cardHand) {
  let pokerPresent = false;

  let cardsCountObject = checkForRepeatedCards(cardHand);
  for (const i in cardsCountObject) {
    if (cardsCountObject[i] === 4) {
      pokerPresent = true;
    }
  }

  return pokerPresent;
}

// Need to test these checks
const trialHand = [26, 27, 28, 25, 29];
console.log(checkForAStraight(trialHand));
//console.log(checkForTwoPairs(trialHand));
