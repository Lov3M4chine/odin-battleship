const { hideModeSelectContainer, createBattlegridForPlayerOne } = require("./dynamicHtml");
const { CreatePlayersForOnePlayerMode } = require("./CreatePlayers");
const { initializePlaceShips } = require("./initializePlaceShips.js");

let playerOne;
let playertwo;
let computerPlayer;

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