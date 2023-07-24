const { attachEventListenerToRandomShipPlacementButton } = require("./chooseShipPlacementForMe");
const { CreateBattlegrid } = require("./factories/CreateBattlegrid");
const { CreatePlayersForOnePlayerMode } = require("./factories/CreatePlayers");
const { initializeBattleMode } = require("./initializeBattleMode");
const { initializePlaceShipsModule } = require("./initializePlaceShipsModule.js");

function hideModeSelectContainer (appContext) {
    appContext.appElements.startGameContainer.classList.add("hidden");
}

async function initializeOnePlayerMode (appContext) {
    console.log("Initializing one player mode...")
    hideModeSelectContainer(appContext);
    CreateBattlegrid.createBattlegridForPlayerOne(appContext);
    CreatePlayersForOnePlayerMode(appContext);
    await Promise.race([
        initializePlaceShipsModule.initializePlaceShips(appContext, appContext.playerOne),
        attachEventListenerToRandomShipPlacementButton(appContext)
    ]);
    CreateBattlegrid.createBattlegridForPlayerComputer(appContext);
    console.log(`Initialization of one player mode complete.`);
    initializeBattleMode(appContext);
}

module.exports = {
    initializeOnePlayerMode,
}