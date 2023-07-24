const { CreateBattlegrid } = require("./factories/CreateBattlegrid");
const { CreatePlayersForOnePlayerMode } = require("./factories/CreatePlayers");
const { initializeBattleMode } = require("./initializeBattleMode");
const { initializePlaceShipsModule } = require("./initializePlaceShipsModule.js");

function hideModeSelectContainer (appContext) {
    appContext.appElements.startGameContainer.classList.add("hidden");
}

async function initializeOnePlayerMode (appContext) {
    hideModeSelectContainer(appContext);
    CreateBattlegrid.createBattlegridForPlayerOne(appContext);
    CreatePlayersForOnePlayerMode(appContext);
    await initializePlaceShipsModule.initializePlaceShips(appContext, appContext.playerOne);
    CreateBattlegrid.createBattlegridForPlayerComputer(appContext);
    console.log(`Initialization of one player mode complete.`);
    console.log(appContext)
    initializeBattleMode(appContext);
}

function getPlayerOne() {
    return appContext.playerOne;
}

function getComputerPlayer() {
    return appContext.computerPlayer;
}

module.exports = {
    initializeOnePlayerMode,
    getPlayerOne,
    getComputerPlayer,
}