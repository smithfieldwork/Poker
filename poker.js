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
const btnNewHand = document.getElementById("new-hand-button");
const btnNewGame = document.getElementById("new-game-button");
const btnRaise = document.getElementById("raise-button");
const btnCall = document.getElementById("call-button");
const btnCheck = document.getElementById("check-button");
const btnFold = document.getElementById("fold-button");
const player1Dealing = document.getElementById("player--1--dealing");
const player2Dealing = document.getElementById("player--2--dealing");
const player1balance = document.getElementById("player--1--balance");
const player2balance = document.getElementById("player--2--balance");
const player1RoundTotal = document.getElementById("player--1--round--total");
const player2RoundTotal = document.getElementById("player--2--round--total");

const player1 = {
  dealing: true,
  toAct: false,
  status: "big--blind",
  roundBet: 0,
  latestBest: 0,
  balance: 3000,
  hand: new Array(4),
};

const player2 = {
  dealing: false,
  toAct: true,
  status: "small-blind",
  roundBet: 0,
  latestBet: 0,
  balance: 3000,
  hand: new Array(4),
};

let betAmount = 0;
const communityCards = new Array(5);
let playerActing = player2;
let playerNotActing = player1;

//change to Javascript objects

let pot = 0;
//reduntant function now or else update with js object
function changeToAct() {
  if (playerActing === player1) {
    playerActing = player2;
  } else if (playerActing === player2) {
    playerActing = player1;
  }
}
//redo with javascript function
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

btnNewGame.addEventListener("click", function () {
  dealPlayerHand(player1.hand);
  dealPlayerHand(player2.hand);
  dealCommunityCards();
  showDealer();
  postBigBlind(player1balance);
  postSmallBlind(player2balance);
  setCardImages();
  betAmount = 25;

  //if toAct===player2;

  //showflop()
  //while (!checkHandOver)
  //if toAct===player2;
  //playerAction(player2);
  //playerAction(player1);

  //showturn
  //...

  //show river
  //...
});

function handleRaise(betAmount) {
  playerActing.latestBet = betAmount;
  playerActing.roundBet += betAmount;
  playerActing.balance -= betAmount;
  playerActing.status = "raise";
}

//call button
btnCall.addEventListener("click", function () {
  playerActing.latestBet = playerNotActing.latestBet;
  playerActing.roundBet += playerActing.latestBet;
  playerActing.status = "call";
  playerActing.toAct = false;
  playerNotActing.toAct = true;

  pot += playerActing.latestBet + playerNotActing.latestBet;
  changeToAct();
});

btnCheck.addEventListener("click", function () {
  playerActing.status = "check";
  changeToAct();

  //need to check functionaility of these buttons next
  //foldbutton
});

btnRaise.addEventListener("click", function () {
  const raiseAmountPlayer1 = parseInt(
    document.getElementById("bet--input--player1").value
  );
  const raiseAmountPlayer2 = parseInt(
    document.getElementById("bet--input--player2").value
  );
  if (playerActing === player1) {
    handleRaise(raiseAmountPlayer1);
    player1balance.innerHTML = playerActing.balance;
    player1RoundTotal.innerHTML = playerActing.roundBet;
  } else if (playerActing === player2) {
    handleRaise(raiseAmountPlayer2);
    player2balance.innerHTML = playerActing.balance;
    player2RoundTotal.innerHTML = playerActing.roundBet;
  }
  changeToAct();
});

btnFold.addEventListener("click", function () {
  playerActing.status = "fold";
  //newHand()
});

function checkRoundOver() {
  let roundOver = false;
  if (player1.status != "raise" && player2.status != "raise") {
    roundOver = true;
  }
  return roundOver;
}

function showFlop() {
  communityCard1.classList.remove("hidden");
  communityCard2.classList.remove("hidden");
  communityCard3.classList.remove("hidden");
}
function showTurnCard() {
  communityCard4.classList.remove("hidden");
}

function showRiverCard() {
  communityCard5.classList.remove("hidden");
}

btnNewHand.addEventListener("click", function () {});

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
