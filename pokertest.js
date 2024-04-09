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
const btnNextHand = document.getElementById("next-hand-button");
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

let communityCards = new Array(5);
let pot = 0;
let communityCardsShown = 0;
let betAmount = 0;
let playerActing = player2;
let playerNotActing = player1;
let amountToCall = 0;
let numberOfChecks = 0;
let handComplete = false;
let gameHasStarted = false;

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
  communityCard1.classList.add("hidden");
  communityCard2.classList.add("hidden");
  communityCard3.classList.add("hidden");
  communityCard4.classList.add("hidden");
  communityCard5.classList.add("hidden");
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
    (player1.status === "Call" &&
      player2.status === "Raise" &&
      betAmount === 0) ||
    (player2.status === "Call" &&
      player1.status === "Raise" &&
      betAmount === 0) ||
    (player1.status === "Call" && player2.status === "Check") ||
    (player2.status === "Call" && player1.status === "Check") ||
    (player1.status === "Check" && player2.status === "Check")
    //add in condition of roundbet being equal raise and call
  ) {
    roundOver = true;
  }
  return roundOver;
}

function checkHandOver() {
  let handOver = false;
  if (
    (checkRoundOver() && communityCardsShown === 5) ||
    player1.status === "Fold" ||
    player2.status == "Fold"
  ) {
    handOver = true;
  }
  return handOver;
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
  player.status = "Big Blind";
}

function postSmallBlind(player) {
  player.balance -= 25;
  player.latestBet = 25;
  player.roundBet = 25;
  pot += 25;
  player.status = "Small Blind";
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

function updateAmountToCall() {}

function updateAllBalances() {
  player1balance.innerHTML = player1.balance;
  player2balance.innerHTML = player2.balance;
  player1LatestBet.innerHTML = player1.latestBet;
  player2LatestBet.innerHTML = player2.latestBet;
  player1RoundTotal.innerHTML = player1.roundBet;
  player2RoundTotal.innerHTML = player2.roundBet;
  potObject.innerHTML = pot;
  amountToCall = currentBetAmount();
}

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
function setUpCommunityCards() {
  dealCommunityCards();
  hideCommunityCards();
  setCardImages();
}

function dealHands() {
  dealPlayerHand(player1.hand);
  dealPlayerHand(player2.hand);
}

function handleDealerSetup() {
  setDealer();
  showDealer();
  if (checkIsFirstHand()) {
    setToAct();
  } else {
    changeToAct();
  }
  updatePlayerTurn();
}

function handleBlinds() {
  postBigBlind(playerNotActing);
  postSmallBlind(playerActing);
  betAmount = 25;
  updateAmountToCall();
  updateAllBalances();
}

function newHand() {
  communityCardsShown = 0;
  gameHasStarted = true;
  dealHands();
  setUpCommunityCards();
  handleDealerSetup();
  handleBlinds();
  updatePlayerTextContent();
}

function resetHandVariables() {
  pot = 0;
  player1.latestBet = 0;
  player2.latestBet = 0;
  player1.roundBet = 0;
  player2.roundBet = 0;
  player1.dealing = false;
  player1.toAct = false;
  player2.dealing = false;
  player2.toAct = false;
  communityCardsShown = 0;
  handComplete = false;
}

function resetBalances() {
  player1.balance = 3000;
  player2.balance = 3000;
}

btnNewGame.addEventListener("click", function () {
  resetBalances();
  resetHandVariables();
  newHand();
});

btnNextHand.addEventListener("click", function () {
  if (!gameHasStarted) {
    window.alert("Game has not started yet");
    return;
  }
  resetHandVariables();
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
  } else if (checkRoundOver() && communityCardsShown === 5) {
    handComplete = true;
  }
}

function resetPlayerStatus() {
  player1.status = "None";
  player2.status = "None";
  updatePlayerTextContent();
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

//function resetLatestBet() {
//player1.latestBet = 0;
//player2.latestBet = 0;
//}

function roundOver() {
  if (checkHandOver()) {
    handleWinner();
  }
  player1.status = "None";
  player2.status = "None";
  updatePlayerTextContent();
}

btnCall.addEventListener("click", function () {
  if (!gameHasStarted) {
    window.alert("Game has not started yet");
    return;
  }

  if (handComplete === true) {
    window.alert("The hand is over");
    return;
  }

  if (checkValidCall() === true) {
    playerActing.status = "Call";
    handleCall(currentBetAmount());
    showCommunityCards();
    changeToAct();
    updatePlayerTurn();
    updatePlayerTextContent();
  }
});

btnCheck.addEventListener("click", function () {
  // Check if the hand is over
  if (!gameHasStarted) {
    window.alert("Game has not started yet");
    return;
  }

  if (handComplete) {
    window.alert("The hand is over");
    return;
  }

  // Check if the check action is valid
  if (checkValidCheck()) {
    playerActing.status = "Check";
    updatePlayerTextContent();
    showCommunityCards();
    changeToAct();
    updatePlayerTurn();
  }

  // Check if both players have checked
  if (playerActing.status === "Check" && playerNotActing.status === "Check") {
    roundOver();
  }
});

btnFold.addEventListener("click", function () {
  if (!gameHasStarted) {
    window.alert("Game has not started yet");
    return;
  }

  if (handComplete === true) {
    window.alert("The hand is over");
    return;
  }
  if (amountToCall === 0) {
    window.alert("No raise was made");
    return;
  } else {
    handleHandWinner(playerNotActing);
    roundOver();
  }
  //insert appropriate pot changes into winner balance
  //change dealer
  //hand finished function

  newHand();
});

btnRaise.addEventListener("click", function () {
  if (!gameHasStarted) {
    window.alert("Game has not started yet");
    return;
  }
  if (handComplete === true) {
    window.alert("The hand is over");
    return;
  }

  let betAmount;

  // window.alert("No raise was made");
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

  for (let i = 0; i < cardHand.length; i++) {
    const cardValue = convertCardToNumberSuit(cardHand[i])[0];

    if (cardsNoSuit[cardValue]) {
      cardsNoSuit[cardValue]++;
    } else {
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
  let valueOfCards = [];
  let straightPresent = false;

  // Extract the card values and normalize them
  for (let card of cardHand) {
    let cardValue = convertCardToNumberSuit(card)[0];
    valueOfCards.push(cardValue % 13); // Normalize the value by modulo 13
  }

  // Sort the card values
  valueOfCards.sort((a, b) => a - b);

  // Check for the straight
  for (let i = 0; i <= valueOfCards.length - 5; i++) {
    if (
      valueOfCards[i] === valueOfCards[i + 1] - 1 &&
      valueOfCards[i + 1] === valueOfCards[i + 2] - 1 &&
      valueOfCards[i + 2] === valueOfCards[i + 3] - 1 &&
      valueOfCards[i + 3] === valueOfCards[i + 4] - 1
    ) {
      straightPresent = true;
      break;
    }
  }

  // Special case for A-2-3-4-5 straight
  if (
    !straightPresent &&
    valueOfCards.includes(1) &&
    valueOfCards.includes(2) &&
    valueOfCards.includes(3) &&
    valueOfCards.includes(4) &&
    valueOfCards.includes(0)
  ) {
    // Check if 1 (Ace) exists
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

function pairValue(cardHand) {
  let tempPairs = [-1, -1];
  let pairs = [-1, -1];
  let cardsCountObject = checkForRepeatedCards(cardHand);

  for (let i in cardsCountObject) {
    if (cardsCountObject[i] === 2 && tempPairs[0] === -1) {
      tempPairs[0] = parseInt(i);
    } else if (cardsCountObject[i] === 2 && tempPairs[0] != -1) {
      tempPairs[1] = parseInt(i);
    }
  }

  pairs = tempPairs.sort(function (a, b) {
    return b - a;
  });

  return pairs;
}

function tripleValue(cardHand) {
  let triple = -1;
  let cardsCountObject = checkForRepeatedCards(cardHand);

  for (let i in cardsCountObject) {
    if (cardsCountObject[i] === 3) {
      triple = parseInt(i);
    }
  }

  return triple;
}

function kickerValues(cardHand) {
  let kickersTemp = [-1, -1, -1, -1, -1];
  let count = 0;
  let cardsCountObject = checkForRepeatedCards(cardHand);

  for (let i in cardsCountObject) {
    if (cardsCountObject[i] === 1) {
      kickersTemp[count] = parseInt(i);
      count++;
    }
  }
  let kickers = kickersTemp.sort(function (a, b) {
    return b - a;
  });
  return kickers;
}

function handleWinnerHighCard(handOne, handTwo) {
  //Assumes both hands are a pair
  //Need to build in ace here
  let winner = [0, 0];
  let kickerOne = kickerValues(handOne);
  let kickerTwo = kickerValues(handTwo);

  for (let i = 0; i < 5; i++) {
    if (kickerOne[i] > kickerTwo[i]) {
      winner = [1, 0];
      break;
    } else if (kickerTwo[i] > kickerOne[i]) {
      winner = [0, 1];
      break;
    } else {
      winner = [1, 1];
    }
  }

  return winner;
}

function handleWinnerBothPair(handOne, handTwo) {
  //Assumes both hands are a pair
  //Need to build in ace here
  let winner = [0, 0];
  let pairOne = pairValue(handOne);
  let kickerOne = kickerValues(handOne);
  let pairTwo = pairValue(handTwo);
  let kickerTwo = kickerValues(handTwo);

  if (pairOne[0] > pairTwo[0]) {
    winner = [1, 0];
  } else if (pairTwo[0] > pairOne[0]) {
    winner = [0, 1];
  } else {
    for (let i = 0; i < 3; i++) {
      if (kickerOne[i] > kickerTwo[i]) {
        winner = [1, 0];
      } else if (kickerTwo[i] > kickerOne[i]) {
        winner = [0, 1];
      } else {
        winner = [1, 1];
      }
    }
  }
  return winner;
}

function handleWinnerBothTriple(handOne, handTwo) {
  //Assumes both hands are a pair
  //Need to build in ace here
  let winner = [0, 0];
  let tripleOne = tripleValue(handOne);
  let kickerOne = kickerValues(handOne);
  let tripleTwo = tripleValue(handTwo);
  let kickerTwo = kickerValues(handTwo);

  if (tripleOne[0] > tripleTwo[0]) {
    winner = [1, 0];
  } else if (tripleTwo[0] > tripleOne[0]) {
    winner = [0, 1];
  } else {
    for (let i = 0; i < 3; i++) {
      if (kickerOne[i] > kickerTwo[i]) {
        winner = [1, 0];
      } else if (kickerTwo[i] > kickerOne[i]) {
        winner = [0, 1];
      } else {
        winner = [1, 1];
      }
    }
  }
  return winner;
}

function handleWinnerBothTwoPair(handOne, handTwo) {
  //Assumes both hands are a pair
  //Need to build in ace here
  let winner = [0, 0];
  let pairOne = pairValue(handOne);
  let kickerOne = kickerValues(handOne);
  let pairTwo = pairValue(handTwo);
  let kickerTwo = kickerValues(handTwo);

  if (pairOne[0] > pairTwo[0]) {
    winner = [1, 0];
  } else if (pairTwo[0] > pairOne[0]) {
    winner = [0, 1];
  } else {
    if (pairOne[1] > pairTwo[1]) {
      winner = [1, 0];
    } else if (pairTwo[1] > pairOne[1]) {
      winner = [0, 1];
    } else {
      if (kickerOne[0] > kickerTwo[0]) {
        winner = [1, 0];
      } else if (kickerTwo[0] > kickerOne[0]) {
        winner = [0, 1];
      } else {
        winner = [1, 1];
      }
    }
  }

  return winner;
}

function handleWinnerBothStraight(handOne, handTwo) {
  const winner = handleWinnerHighCard(handOne, handTwo);
  return winner;
}

function handleWinnerBothFlush(handOne, handTwo) {
  const winner = handleWinnerHighCard(handOne, handTwo);
  return winner;
}

function handleWinnerBothFullHouse(handOne, handTwo) {
  let winner = [-1, -1];
  winner = handleWinnerBothTriple(handOne, handTwo);
  if (winner[0] === 1 && winner[1] === 1) {
    winner = handleWinnerBothPair(handOne, handTwo);
  }

  return winner;
}

function selectWinnerFiveCards(handOne, handTwo) {
  let rankOne = rankHand(handOne);
  let rankTwo = rankHand(handTwo);
  let winner = [-1, -1];
  if (rankOne > rankTwo) {
    winner[0] = 1;
    winner[1] = 0;
  } else if (rankTwo > rankOne) {
    winner[0] = 0;
    winner[1] = 1;
  } else if (rankOne === 0 && rankTwo === 0) {
    winner = handleWinnerHighCard(handOne, handTwo);
  } else if (rankOne === 1 && rankTwo === 1) {
    winner = handleWinnerBothPair(handOne, handTwo);
  } else if (rankOne === 2 && rankTwo === 2) {
    winner = handleWinnerBothTwoPair(handOne, handTwo);
  } else if (rankOne === 3 && rankTwo === 3) {
    winner = handleWinnerBothTriple(handOne, handTwo);
  } else if (rankOne === 4 && rankTwo === 4) {
    winner = handleWinnerBothStraight(handOne, handTwo);
  } else if (rankOne === 5 && rankTwo === 5) {
    winner = handleWinnerBothFlush(handOne, handTwo);
  } else if (rankOne === 6 && rankTwo === 6) {
    winner = handleWinnerBothFullHouse(handOne, handTwo);
  } else if (rankOne === 7 && rankTwo === 7) {
    winner = handleWinnerHighCard(handOne, handTwo);
  } else if (rankOne === 8 && rankTwo === 8) {
    winner = handleWinnerHighCard(handOne, handTwo);
  }
  // console.log(rankOne);
  // console.log(rankTwo);
  return winner;
}

function handleWinnerPot(winnerArray) {
  if (winnerArray[0] === 1 && winnerArray[1] === 0) {
    player1.balance += pot;
  } else if (winnerArray[1] === 1 && winnerArray[0] === 0) {
    player2.balance += pot;
  } else {
    player1.balance += pot / 2;
    player2.balance += pot / 2;
  }
  pot = 0;
  updatePlayerTextContent();
}

function handleChooseWinner() {
  let bestHandOne = getBestHand(player1.hand);
  console.log(rankHand(bestHandOne));
  let bestHandTwo = getBestHand(player2.hand);
  console.log(rankHand(bestHandTwo));
  let winner = selectWinnerFiveCards(bestHandOne, bestHandTwo);
  //console.log(winner);

  return winner;
}

function handleWinner() {
  let winner = handleChooseWinner();
  handleWinnerPot(winner);
}

function mergeCards(hand, communityCardsArr) {
  const mergedArray = hand.concat(communityCardsArr);
  return mergedArray;
}

function getSubsetsOfSize(array, size) {
  const result = [];

  function combine(start, subset) {
    if (subset.length === size) {
      result.push(subset.slice()); // Push a copy of the subset to the result array
      return;
    }
    for (let i = start; i < array.length; i++) {
      subset.push(array[i]);
      combine(i + 1, subset);
      subset.pop();
    }
  }

  combine(0, []);
  return result;
}

// Example usage:

function getBestHandFromSeven(sevenCards) {
  let arrayOfHands = getSubsetsOfSize(sevenCards, 5);
  let bestHand = arrayOfHands[0];

  for (let i = 1; i < arrayOfHands.length; i++) {
    //console.log(arrayOfHands[i], rankHand(arrayOfHands[i]));
    if (rankHand(arrayOfHands[i]) > rankHand(bestHand)) {
      bestHand = arrayOfHands[i];
    }
  }
  return bestHand;
}

function getBestHand(playersHand) {
  let possibleCards = mergeCards(playersHand, communityCards);
  let bestHand = getBestHandFromSeven(possibleCards);
  return bestHand;
}

// Need to test these checks
communityCards = [51, 50, 1, 2, 3];
//let trialHandTwo = [27, 28, 40, 41, 50];
player1.hand = [17, 18];
player2.hand = [14, 15];
//const h = [1, 2, 3, 4, 5, 6, 7];

console.log(handleWinnerPot(player1.hand, player2.hand));
//let x = mergeCards(player1.hand, communityCards);
//console.log(getBestHandFromSeven(x));
//console.log(getBestHand(player1.hand));
