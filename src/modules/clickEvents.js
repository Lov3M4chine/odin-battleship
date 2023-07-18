const { createBattlegridForPlayerOne, createBattlegridForPlayerTwo } = require ("./dynamicHtml.js");
const PlayerFactory = require ("./factories/PlayerFactory.js");
const { initializePlaceShips } = require("./placeShips.js");

function addGameModeClickEvents (horizontalSize, verticalSize) {
    // Error Checking
    if ((!Number.isInteger(horizontalSize)) || (!Number.isInteger(verticalSize))) {
        throw new Error('Horizontal and Vertical Size must be integers')
        }
        if ((horizontalSize < 8) || (verticalSize < 8)) {
        throw new Error("Horizontal and Vertical Size must be at least 7");
        }

    const onePlayerMode = document.getElementById("one-player-mode");
    const twoPlayerMode = document.getElementById("two-player-mode");

    onePlayerMode.addEventListener('click', () => playerModeInitializations.initializeOnePlayerMode(horizontalSize, verticalSize));
    twoPlayerMode.addEventListener('click', () => playerModeInitializations.initializeTwoPlayerMode(horizontalSize, verticalSize));
}

const playerModeInitializations = (function() {

    const modeSelectContainer = document.getElementById("mode-select-container");
    let playerone;
    let playertwo;
    let computerPlayer;

    function initializeOnePlayerMode (horizontalSize, verticalSize) {
        
        modeSelectContainer.classList.add("hidden");
        createBattlegridForPlayerOne(horizontalSize, verticalSize);
        
        playerone = PlayerFactory(horizontalSize, verticalSize);
        computerPlayer = PlayerFactory(horizontalSize, verticalSize);

        initializePlaceShips(playerone);

        return {
            playerone,
            computerPlayer,
        }
    }

    function initializeTwoPlayerMode (horizontalSize, verticalSize) {
        modeSelectContainer.classList.add("hidden");
        createBattlegridForPlayerOne(horizontalSize, verticalSize);
        createBattlegridForPlayerTwo(horizontalSize, verticalSize);

        playerone = PlayerFactory(horizontalSize, verticalSize);
        playertwo = PlayerFactory(horizontalSize, verticalSize);

        return {
            playerone,
            playertwo,
        }
    }

    function getPlayerOne() {
        return playerone;
    }

    function getPlayerTwo() {
        return playertwo;
    }

    function getComputerPlayer() {
        return computerPlayer;
    }

    return {
        initializeOnePlayerMode,
        initializeTwoPlayerMode,
        getPlayerOne,
        getPlayerTwo,
        getComputerPlayer,
    }

})();

const battlegridClickEvents = (function() {

    function registerCellClickForPlayerone (cell, playerone) {
        let cellNumber = cell.getAttribute('data-cellNumber');
        if (playerone.gameboardState.gameboard[cellNumber].name === null) {
            playerone.gameboardState.gameboard[cellNumber].isMiss = true;
            cell.classList.add("bg-secondary");
        }
    }

    function addPlayeroneBattlegridCellClickEvents (playerone) {
        const playeroneCells = document.querySelectorAll(".playerone-cell");
        playeroneCells.forEach(function(cell) {
            cell.addEventListener('click', function(event) {
                registerCellClickForPlayerone(event.target, playerone);
            })
        })
    }

    return {
        addPlayeroneBattlegridCellClickEvents,
    }

})();

function addPlayeronePlaceShipsClickEvents (playerone) {
    const playeroneCells = document.querySelectorAll(".playerone-cell");
    playeroneCells.forEach(function(cell) {
        cell.addEventListener('click', function(event) {
            registerPlaceShipClickForPlayerone(event.target, playerone);
        })
    })
}

function registerPlaceShipClickForPlayerone(shipFromList) {
    let cellNumber = cell.getAttribute('data-cellNumber');
    if (cell.classList.contains("playerone-cell")) {
        if (playerone.gameboardState.gameboard[cellNumber].name === null) {
            const shipFromList = placeShip
            cell.classList.add("bg-secondary");
        }
    }
}

module.exports = {
    addGameModeClickEvents,
    playerModeInitializations,
}