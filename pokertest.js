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

const player1 = {
  dealing: true,
  toAct: false,
  status: "None",
  roundBet: 0,
  latestBet: 0,
  balance: 3000,
  hand: new Array(4),
};
//Build a feature that randomly assigns dealer
const player2 = {
  dealing: false,
  toAct: true,
  status: "None",
  roundBet: 0,
  latestBet: 0,
  balance: 3000,
  hand: new Array(4),
};

const communityCards = new Array(5);
let pot = 0;
let communityCardsShown = 0;
let betAmount = 0;
let playerActing = player2;
let playerNotActing = player1;

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
    player1.status === "Call" ||
    player2.status === "Call" ||
    player1.status === "Fold" ||
    player2.status == "Fold" ||
    (player1.status === "Check" && player2.status === "Check")
  ) {
    roundOver = true;
  }
  return roundOver;
}

function showDealer() {
  if (player1.dealing) {
    player1Dealing.innerHTML = "Dealing";
    player2Dealing.innerHTML = "<br>";

    player1.dealing = false;
    player2.dealing = true;
  } else if (player2.dealing) {
    player1Dealing.innerHTML = "<br>";
    player2Dealing.innerHTML = "Dealing";

    player1.dealing = true;
    player2.dealing = false;
  }
}

function postBigBlind(playerBalance) {
  playerBalance.innerHTML -= 50;
}

function postSmallBlind(playerBalance) {
  playerBalance.innerHTML -= 25;
}

function newHand() {
  dealPlayerHand(player1.hand);
  dealPlayerHand(player2.hand);
  dealCommunityCards();
  hideCommunityCards();
  setCardImages();
  showDealer();
  postBigBlind(player1balance);
  postSmallBlind(player2balance);
  updatePlayerTurn();
  betAmount = 25;
  player1RoundStatus.innerHTML = "Big Blind";
  player2RoundStatus.innerHTML = "Small Blind";
  player1.status = "Big Blind";
  player2.status = "Small Blind";
}

btnNewHand.addEventListener("click", function () {
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

function handleCall(betAmount) {
  playerActing.latestBet = betAmount;
  playerActing.roundBet += playerActing.latestBet;
  playerActing.balance -= playerActing.latestBet;
  playerActing.status = "Call";
  playerNotActing.status = "None";
  pot += playerActing.roundBet + playerNotActing.roundBet;
  if (playerActing === player1) {
    player1balance.textContent = playerActing.balance;
    player1RoundTotal.textContent = playerActing.roundBet;
    player1LatestBet.textContent = playerActing.latestBet;
  } else if (playerActing === player2) {
    player2balance.textContent = playerActing.balance;
    player2RoundTotal.textContent = playerActing.roundBet;
    player2LatestBet.textContent = playerActing.latestBet;
  }
}

function showCommunityCards() {
  if (checkRoundOver() && communityCardsShown === 0) {
    showFlop();
  } else if (checkRoundOver() && communityCardsShown === 3) {
    showTurnCard();
  } else if (checkRoundOver() && communityCardsShown === 4) {
    showRiverCard();
  }
}

function resetPlayerStatus() {
  player1.status = "None";
  player2.status = "None";
}

function showFlop() {
  communityCardsClass.classList.remove("hidden");
  communityCard1.classList.remove("hidden");
  communityCard2.classList.remove("hidden");
  communityCard3.classList.remove("hidden");
  communityCardsShown = 3;
  resetPlayerStatus();
}
function showTurnCard() {
  communityCard4.classList.remove("hidden");
  communityCardsShown = 4;
  resetPlayerStatus();
}

function showRiverCard() {
  communityCard5.classList.remove("hidden");
  communityCardsShown = 5;
  resetPlayerStatus();
}

function changeToAct() {
  if (player1.toAct === true) {
    player1.toAct = false;
    player2.toAct = true;
  } else if (player2.toAct === true) {
    player2.toAct = false;
    player1.toAct = true;
  }
}

function updatePlayerTextContent(player) {
  player1RoundStatus.innerHTML = player1.status;
  player2RoundStatus.innerHTML = player2.status;
  if (player === player1) {
    player1balance.textContent = playerActing.balance;
    player1RoundTotal.textContent = playerActing.roundBet;
    player1LatestBet.textContent = playerActing.latestBet;
  } else if (player === player2) {
    player2balance.textContent = playerActing.balance;
    player2RoundTotal.textContent = playerActing.roundBet;
    player2LatestBet.textContent = playerActing.latestBet;
  }
}

function roundOver() {
  player1.latestBet = 0;
  player1.roundBet = 0;
  player2.latestBet = 0;
  player2.roundBet = 0;
  updatePlayerTextContent(playerActing);
  resetPlayerStatus();
}

btnCall.addEventListener("click", function () {
  if (checkValidCall() === true) {
    handleCall(playerNotActing.latestBet);
    showCommunityCards();
    changeToAct();
    updatePlayerTurn();
    roundOver();
  }
});