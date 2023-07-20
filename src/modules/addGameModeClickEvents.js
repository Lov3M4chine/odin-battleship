const { initializeOnePlayerMode, initializeTwoPlayerMode } = require("./playerModeInitializations");

function addGameModeClickEvents (appContext) {
    // Error Checking
    if ((!Number.isInteger(appContext.horizontalSize)) || (!Number.isInteger(appContext.verticalSize))) {
        throw new Error('Horizontal and Vertical Size must be integers')
    }
    if ((appContext.horizontalSize < 8) || (appContext.verticalSize < 8)) {
        throw new Error("Horizontal and Vertical Size must be at least 7");
    }

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