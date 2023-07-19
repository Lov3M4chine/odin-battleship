const { initializeOnePlayerMode } = require("./playerModeInitializations");

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

    onePlayerMode.addEventListener('click', () => {
        initializeOnePlayerMode(horizontalSize, verticalSize);
    });
    twoPlayerMode.addEventListener('click', () => playerModeInitializations.initializeTwoPlayerMode(horizontalSize, verticalSize));

    console.log("Game mode click events added.");
}

module.exports = {
    addGameModeClickEvents
}