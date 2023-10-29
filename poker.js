'use strict';

const player1Card1 = document.getElementById('hand--1--card1');
const player1Card2 = document.getElementById('hand--1--card2');
const player2Card1 = document.getElementById('hand--2--card1');
const player2Card2 = document.getElementById('hand--2--card2');
const communityCard1 = document.getElementById('communityCard--1');
const communityCard2 = document.getElementById('communityCard--2');
const communityCard3 = document.getElementById('communityCard--3');
const communityCard4 = document.getElementById('communityCard--4');
const communityCard5 = document.getElementById('communityCard--5');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const player1Hand = new Array(4);
player1Hand[0] = getRandomInt(0, 51);
player1Hand[1] = getRandomInt(0, 51);
console.log(player1Hand);

const player2Hand = new Array(4);
player2Hand[0] = getRandomInt(0, 51);
player2Hand[1] = getRandomInt(0, 51);
console.log(player2Hand);

const communityCards = new Array(5);
communityCards[0] = getRandomInt(0, 51);
communityCards[1] = getRandomInt(0, 51);
communityCards[2] = getRandomInt(0, 51);
communityCards[3] = getRandomInt(0, 51);
communityCards[4] = getRandomInt(0, 51);

player1Card1.src = `Deck of Cards/${player1Hand[0]}.png`;
player1Card2.src = `Deck of Cards/${player1Hand[1]}.png`;
player2Card1.src = `Deck of Cards/backofcard.png`;
player2Card2.src = `Deck of Cards/backofcard.png`;
communityCard1.src = `Deck of Cards/${communityCards[0]}.png`;
communityCard2.src = `Deck of Cards/${communityCards[1]}.png`;
communityCard3.src = `Deck of Cards/${communityCards[2]}.png`;
communityCard4.src = `Deck of Cards/${communityCards[3]}.png`;
communityCard5.src = `Deck of Cards/${communityCards[4]}.png`;
