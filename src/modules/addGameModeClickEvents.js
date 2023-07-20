const { initializeOnePlayerMode } = require("./playerModeInitializations");

function addGameModeClickEvents (appContext) {
    // Error Checking
    if ((!Number.isInteger(appContext.horizontalSize)) || (!Number.isInteger(appContext.verticalSize))) {
        throw new Error('Horizontal and Vertical Size must be integers')
    }
    if ((appContext.horizontalSize < 8) || (appContext.verticalSize < 8)) {
        throw new Error("Horizontal and Vertical Size must be at least 7");
    }

    const onePlayerMode = document.getElementById("one-player-mode");
    const twoPlayerMode = document.getElementById("two-player-mode");

    onePlayerMode.addEventListener('click', () => {
        initializeOnePlayerMode(appContext);
    });
    twoPlayerMode.addEventListener('click', () => playerModeInitializations.initializeTwoPlayerMode(appContext));

    console.log("Game mode click events added.");
}

module.exports = {
    addGameModeClickEvents
}