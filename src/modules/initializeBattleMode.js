const { initializePlaceShipsModule } = require("./initializePlaceShipsModule");


function initializeBattleMode (appContext) {
    console.log("Initializing BattleMode...");
    hideRandomShipPlacementButton(appContext);
    hideOrientationButton(appContext);
    showPlayerComputerBattlegrid(appContext);
    showBattlegridLabels(appContext);
    initializePlaceShipsModule.updateMessageBox(appContext, `Begin your attack!`);
}

function showBattlegridLabels(appContext) {
    appContext.appElements.playerOneBattlegridLabel.classList.remove("hidden");
    appContext.appElements.playerComputerBattlegridLabel.classList.remove("hidden");
}

function hideOrientationButton(appContext) {
        appContext.appElements.verticalButton.classList.add("hidden");
        appContext.appElements.horizontalButton.classList.add("hidden");
}

function showPlayerComputerBattlegrid (appContext) {
    appContext.appElements.playerComputerBattlegrid.classList.remove('hidden');
}

function hideRandomShipPlacementButton (appContext) {
    appContext.appElements.chooseForMeButton.classList.add("hidden");
}

module.exports = {
    initializeBattleMode
}