const { createBattlegridForPlayerOne, createBattlegridForPlayerTwo } = require ("./dynamicHtml.js");
const PlayerFactory = require ("./PlayerFactory.js");

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

        battlegridClickEvents.addPlayeroneBattlegridCellClickEvents(playerone);

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

const battlegridClickEvents = (function() {

    function registerCellClickForPlayerone (cell, playerone) {
        if (cell.classList.contains("playerone")) {
            if (playerone.gameboardState.gameboard[cell.dataset.cellNumber].name === null) {
                playerone.gameboardState.gameboard[cell.dataset.cellNumber].isMiss = true;
                cell.classList.add("bg-secondary");
            }
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
        addPlayeroneBattlegridCellClickEvents
    }

})();

module.exports = {
    addGameModeClickEvents,
    playerModeInitializations
}