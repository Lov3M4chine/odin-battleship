const { orientationModule } = require("./orientationModule");

function initializeBattleMode (appContext) {
    console.log("Initializing BattleMode...");
    appContext.appElements.playerComputerBattlegrid.classList.remove('hidden');
    orientationModule.hideOrientationButton(appContext);
}

module.exports = {
    initializeBattleMode
}