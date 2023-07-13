const createBattlegridForOnePlayer = require ("./dynamicHtml.js");
const createBattlegridForTwoPlayer = require ("./dynamicHtml.js");
const PlayerFactory = require ("./PlayerFactory.js");

const playerModeInitializations = (function() {

    const modeSelectContainer = document.getElementById("mode-select-container");

    function initializeOnePlayerMode (horizontalSize, verticalSize) {
        modeSelectContainer.classList.add("hidden");
        createBattlegridForOnePlayer(horizontalSize, verticalSize);
        
        const playerone = PlayerFactory(horizontalSize, verticalSize);
        const computerPlayer = PlayerFactory(horizontalSize, verticalSize);

        return {
            playerone,
            computerPlayer,
        }
    }

    function initializeTwoPlayerMode (horizontalSize, verticalSize) {
        modeSelectContainer.classList.add("hidden");
        createBattlegridForTwoPlayer(horizontalSize, verticalSize);

        const playerone = PlayerFactory(horizontalSize, verticalSize);
        const playertwo = PlayerFactory(horizontalSize, verticalSize);

        return {
            playerone,
            playertwo,
        }
    }

    return {
        initializeOnePlayerMode,
        initializeTwoPlayerMode
    }

})();

function addGameModeClickEvents (horizontalSize, verticalSize) {
    const onePlayer = document.getElementById("one-player");
    const twoPlayer = document.getElementById("two-player");

    onePlayer.addEventListener('click', () => playerModeInitializations.initializeOnePlayerMode(horizontalSize, verticalSize));
    twoPlayer.addEventListener('click', () => playerModeInitializations.initializeTwoPlayerMode(horizontalSize, verticalSize));
}


function addBattlegridCellClickEvents () {
    const cells = document.querySelectorAll(".cell");

    cells.forEach(function(cell) {
        cell.addEventListener('click', )
    })
}

function registerCellClick () {

}

module.exports = addGameModeClickEvents;