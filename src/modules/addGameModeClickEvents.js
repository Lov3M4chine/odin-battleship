const { initializeOnePlayerMode } = require("./playerModeInitializations");

function addGameModeClickEvents (appContext) {
    appContext.appElements.onePlayerMode.addEventListener('click', () => {
        initializeOnePlayerMode(appContext);
    });
}

module.exports = {
    addGameModeClickEvents
}