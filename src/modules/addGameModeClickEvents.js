const { initializeOnePlayerMode, initializeTwoPlayerMode } = require("./playerModeInitializations");

function addGameModeClickEvents (appContext) {
    appContext.appElements.onePlayerMode.addEventListener('click', () => {
        initializeOnePlayerMode(appContext);
    });
    appContext.appElements.twoPlayerMode.addEventListener('click', () => {
        initializeTwoPlayerMode(appContext)
    });

    console.log("Game mode click events added.");
}

module.exports = {
    addGameModeClickEvents
}