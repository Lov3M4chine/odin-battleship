const { attachEventListenerToRandomShipPlacementButton } = require("./chooseShipPlacementForMe");
const { CreateBattlegrid } = require("./factories/CreateBattlegrid");
const { CreatePlayersForOnePlayerMode } = require("./factories/CreatePlayers");
const { initializeBattleMode } = require("./initializeBattleMode");
const { initializePlaceShipsModule } = require("./initializePlaceShipsModule.js");

function hideModeSelectContainer (appContext) {
    appContext.appElements.startGameContainer.classList.add("hidden");
};

function hideLogo() {
    let logo = document.getElementById("logo");
    logo.classList.add("hidden");
}

function hideThemeSelector () {
    let themeSelector = document.getElementById("theme-selector");
    themeSelector.classList.add("hidden");
}

async function initializeOnePlayerMode (appContext) {
    hideModeSelectContainer(appContext);
    hideLogo();
    hideThemeSelector();
    CreateBattlegrid.createBattlegridForPlayerOne(appContext);
    CreatePlayersForOnePlayerMode(appContext);
    await Promise.race([
        initializePlaceShipsModule.initializePlaceShips(appContext, appContext.playerOne),
        attachEventListenerToRandomShipPlacementButton(appContext)
    ]);
    CreateBattlegrid.createBattlegridForPlayerComputer(appContext);
    initializeBattleMode(appContext);
}

module.exports = {
    initializeOnePlayerMode,
}