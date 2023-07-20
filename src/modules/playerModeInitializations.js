const { CreatePlayersForOnePlayerMode } = require("./CreatePlayers");
const { initializePlaceShips } = require("./initializePlaceShips.js");

const modeSelectContainer = document.getElementById("mode-select-container");
const mainContainer = document.getElementById("main-container");

let playerOne;
let playertwo;
let computerPlayer;


function hideModeSelectContainer () {
    modeSelectContainer.classList.add("hidden");
}

function createBattlegridForPlayerOne (horizontalSize, verticalSize) {
    const playerOneBattlegridContainer = document.createElement('div');
    playerOneBattlegridContainer.id = 'playerone-battlegrid-container';
  
    const playerOneBattlegrid = document.createElement('div');
    playerOneBattlegrid.id = 'playerone-battlegrid';
    playerOneBattlegrid.className = 'grid grid-rows-[repeat(10,_minmax(0,_1fr))] grid-cols-10';

    for (let i = 0; i < (horizontalSize * verticalSize); i++) {
        let playerOneCell = null;

        playerOneCell = document.createElement('button');
        playerOneCell.id = `playerone-cell-${i}`;
        playerOneCell.className = 'btn bg-primary playerone-cell';
        playerOneCell.title = `cell ${i}`;
        playerOneCell.setAttribute('data-cell-number', i);
        playerOneCell.setAttribute('data-is-highlighted', false);

        playerOneBattlegrid.appendChild(playerOneCell);
    }

    playerOneBattlegridContainer.appendChild(playerOneBattlegrid);
    mainContainer.appendChild(playerOneBattlegridContainer);
  
}

function createBattlegridForPlayerTwo (horizontalSize, verticalSize) {
    const playerTwoBattlegridContainer = document.createElement('div');
    playerTwoBattlegridContainer.id = 'playerTwo-battlegrid-container';
  
    const playerTwoBattlegrid = document.createElement('div');
    playerTwoBattlegrid.id = 'playerTwo-battlegrid';
    playerTwoBattlegrid.className = 'grid grid-rows-[repeat(10,_minmax(0,_1fr))] grid-cols-10';

    for (let i = 0; i < (horizontalSize * verticalSize); i++) {
        let playerTwoCell = null;

        playerTwoCell = document.createElement('button');
        playerTwoCell.id = `playerTwo-cell-${i}`;
        playerTwoCell.className = 'btn bg-primary playertwo-cell hidden';
        playerTwoCell.title = `cell ${i}`;
        playerTwoCell.setAttribute('data-cellNumber', i);

        playerTwoBattlegrid.appendChild(playerTwoCell);
    }

    playerTwoBattlegridContainer.appendChild(playerTwoBattlegrid);
    mainContainer.appendChild(playerTwoBattlegridContainer);
}

function initializeOnePlayerMode (horizontalSize, verticalSize) {
    
    hideModeSelectContainer();
    createBattlegridForPlayerOne(horizontalSize, verticalSize);
    players = CreatePlayersForOnePlayerMode(horizontalSize, verticalSize);
    playerOne = players.playerOne
    playerComputer = players.playerComputer
    initializePlaceShips(playerOne);
    console.log(`Initialization of one player mode complete.`);

    return {
        playerOne,
        playerComputer,
    }
}

function initializeTwoPlayerMode (horizontalSize, verticalSize) {
    modeSelectContainer.classList.add("hidden");
    createBattlegridForPlayerOne(horizontalSize, verticalSize);
    createBattlegridForPlayerTwo(horizontalSize, verticalSize);

    playerOne = PlayerFactory(horizontalSize, verticalSize);
    playertwo = PlayerFactory(horizontalSize, verticalSize);

    return {
        playerOne,
        playertwo,
    }
}

function getPlayerOne() {
    return playerOne;
}

function getPlayerTwo() {
    return playertwo;
}

function getComputerPlayer() {
    return computerPlayer;
}

module.exports = {
    initializeOnePlayerMode,
    initializeTwoPlayerMode,
    getPlayerOne,
    getPlayerTwo,
    getComputerPlayer,
}