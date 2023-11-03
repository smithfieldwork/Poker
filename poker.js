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

const player1Hand = new Array(4);
const player2Hand = new Array(4);
const communityCards = new Array(5);


//change to Javascript objects
const player1 = {
  dealing: true,
  toAct: false,
  status: "big--blind",
  roundBet: 0,
  latestBest: 0,
  balance: 3000
};

const player2 = {
  dealing: false,
  toAct:true,
  status: "small-blind",
  roundBet: 0,
  latestBet: 0,
  balance: 3000
  
};

let pot = 0;

function changeToAct() {
  if (toAct[0] === false) {
    toAct[0] = true;
    toAct[1] = false;
  } else if (toAct[0] === true) {
    toAct[0] = false;
    toAct[1] = true;
  }
}
//redo with javascript function
function showDealer() {
  if (dealer[0] === true) {
    player1Dealing.innerHTML = "Dealing";
    player2Dealing.innerHTML = "<br>";

    dealer[0] = false;
    dealer[1] = true;
  } else if (dealer[1] === true) {
    player1Dealing.innerHTML = "<br>";
    player2Dealing.innerHTML = "Dealing";

    dealer[0] = true;
    dealer[1] = false;
  }
}

function postBigBlind(playerBalance) {
  playerBalance.innerHTML -= 50;
}

function postSmallBlind(playerBalance) {
  playerBalance.innerHTML -= 25;
}

btnNewGame.addEventListener("click", function () {
  dealPlayerHand(player1Hand);
  dealPlayerHand(player2Hand);
  dealCommunityCards();
  showDealer();
  postBigBlind(player1balance);
  postSmallBlind(player2balance);
  setCardImages();
  betAmount = 25;

  //while (!checkHandOver)
  //if toAct===player2;
  //playerAction(player2);
  //playerAction(player1);

  //showflop()
  //while (!checkHandOver)
  //if toAct===player2;
  //playerAction(player2);
  //playerAction(player1);

  //showturn
  //...

  //show river
  //...

  //need to build local pot and genreal pot
});

function playerAction(playerActing, playerNotActing) {
  //call button
  btnCall.addEventListener("click", function () {
  playerActing.latestBet = playerNotActing.latestBet;

  playerActing.roundBet += playerActing.latestBet;
  playerActing.status = "call";
  playerActing.toAct= false;
  playerNotActing.toAct = true;

pot += playerActing.latestBet;
 }
  )

  btnCheck.addEventListener("click", function () {
  playerActing.toAct=false;
  playerNotActing.toAct = true;
  playerActing.status = "check";
  //checkbutton
  //raisebutton
  // need an input box for amount
  //need to check functionaility of these buttons next
  //foldbutton
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
  player1Card1.src = `Deck of Cards/${player1Hand[0]}.png`;
  player1Card2.src = `Deck of Cards/${player1Hand[1]}.png`;
  player2Card1.src = `Deck of Cards/backofcard.png`;
  player2Card2.src = `Deck of Cards/backofcard.png`;
  communityCard1.src = `Deck of Cards/${communityCards[0]}.png`;
  communityCard2.src = `Deck of Cards/${communityCards[1]}.png`;
  communityCard3.src = `Deck of Cards/${communityCards[2]}.png`;
  communityCard4.src = `Deck of Cards/${communityCards[3]}.png`;
  communityCard5.src = `Deck of Cards/${communityCards[4]}.png`;
}
