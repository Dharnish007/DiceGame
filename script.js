'use strict';

// Elements

let rollDice = document.querySelector('.btn--roll');
let holdScore = document.querySelector('.btn--hold');
let newGame = document.querySelector('.btn--new');
let diceImage = document.querySelector('.dice');

let playerContainer1 = document.querySelector('.player--0')
let playerContainer2 = document.querySelector('.player--1')

let playerScore1 = document.querySelector('#score--0');
let playerScore2 = document.querySelector('#score--1');
let pointerScore = [0,0];

let tempScore1 = document.querySelector('#current--0')
let tempScore2 = document.querySelector('#current--1')
let active = 1;

// initialSetUp
const reset = function() {
    diceImage.classList.add('hidden');
    rollDice.classList.remove('hidden');
    holdScore.classList.remove('hidden');
    playerScore1.textContent = 0;
    playerScore2.textContent = 0;
    tempScore1.textContent = 0;
    tempScore2.textContent = 0;
    playerContainer1.classList.remove('player--winner');
    playerContainer2.classList.remove('player--winner');
    playerContainer1.classList.add('player--active');
    playerContainer2.classList.remove('player--active');
    active = 1
}
reset();

// reset game
newGame.addEventListener('click',reset)

// rollDiceBtn

let rollFunction = function() {
    let value = Math.floor(Math.random() * 6) + 1;
    diceImage.classList.remove('hidden');
    diceImage.src = `dice-${value}.png`
    if (value===1) {
        playerContainer1.classList.toggle('player--active');
        playerContainer2.classList.toggle('player--active');
        if (active===1) {
            tempScore1.textContent = 0;
            active=2;
        } else if(active===2) {
            tempScore2.textContent = 0;
            active=1;
        } 
    } else {
        if (active===1) {
            tempScore1.textContent = Number(tempScore1.textContent) + value;
        } else if (active===2) {
            tempScore2.textContent = Number(tempScore2.textContent) + value;
        }
    }
}

rollDice.addEventListener('click',rollFunction)


// holdBtnFunction

let holdBtnFunction = function() {
    if (active===1) {
        playerScore1.textContent = Number(playerScore1.textContent)+Number(tempScore1.textContent)
        if (Number(playerScore1.textContent)>100) {
            playerContainer1.classList.add('player--winner');
            rollDice.classList.add('hidden');
            diceImage.classList.add('hidden');
            holdScore.classList.add('hidden');
        } else {
            tempScore1.textContent = 0;
            active=2;
            playerContainer1.classList.toggle('player--active');
            playerContainer2.classList.toggle('player--active');
        }
    } else if (active==2) {
        playerScore2.textContent = Number(playerScore2.textContent)+Number(tempScore2.textContent)
        if (Number(playerScore2.textContent)>100) {
            playerContainer2.classList.add('player--winner');
            rollDice.classList.add('hidden');
            diceImage.classList.add('hidden');
            holdScore.classList.add('hidden');
        } else {
            tempScore2.textContent = 0;
            active=1;
            playerContainer1.classList.toggle('player--active');
            playerContainer2.classList.toggle('player--active');
        }
    }
}

holdScore.addEventListener('click',holdBtnFunction)



