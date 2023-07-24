const { randomizeVariablesForPlaceShips, assignRandomShipPlacementForPlayerComputer } = require("./computerPlayerInitialization");
const { CreateBattlegrid } = require("./factories/CreateBattlegrid");
const { highlightShipPlacementModule } = require("./highlightShipPlacementModule");
const { initializeBattleMode } = require("./initializeBattleMode");

function showRandomShipPlacementButton (appContext) {
    appContext.appElements.chooseForMeButton.classList.remove("hidden");
}

function hideRandomShipPlacementButton (appContext) {
    appContext.appElements.chooseForMeButton.classList.add("hidden");
}

function attachEventListenerToRandomShipPlacementButton (appContext) {
    appContext.appElements.chooseForMeButton.addEventListener('click', () => assignRandomShipPlacementForPlayerOne (appContext));
}

function registerRandomShipPlacementforPlayerOne(appContext) {
    appContext.playerOne.placeShip(appContext.cellSelected, appContext.orientation.isVertical, appContext.currentShipName, appContext.currentShipSize, appContext);
}

function processRandomShipPlacementForPlayerOne(appContext, currentShipKey) {
    console.log(currentShipKey)
    let { name: currentShipName, size: currentShipSize } = appContext.shipList[currentShipKey];
    randomizeVariablesForPlaceShips(appContext);
    appContext.currentShipName = currentShipName;
    appContext.currentShipSize = currentShipSize;
    highlightShipPlacementModule.checkPlacementModule.checkIsPlacementValid(appContext, appContext.playerOne);
    if (appContext.isPlacementValid) {
        registerRandomShipPlacementforPlayerOne(appContext);
        highlightAutomatedShipPlacementForPlayerOne(appContext);
    } else {
        processRandomShipPlacementForPlayerOne(appContext, currentShipKey)
    }
}

function assignRandomShipPlacementForPlayerOne (appContext) {
    console.log(`Initializing automated ship placement for player one...`);
    for (let currentShipKey in appContext.shipList) {
        processRandomShipPlacementForPlayerOne(appContext, currentShipKey);
    }
    console.log(`...player one automated ship placement complete.`);
    console.log(`PlayerOne: ${JSON.stringify(appContext.playerOne)}`);
    highlightShipPlacementModule.highlightEventListenerModule.wipeEventListeners(appContext);
    assignRandomShipPlacementForPlayerComputer(appContext);
    CreateBattlegrid.createBattlegridForPlayerComputer(appContext);
    console.log(`Initialization of one player mode complete.`);
    console.log(appContext);
    hideRandomShipPlacementButton(appContext);
    initializeBattleMode(appContext);
}

function highlightAutomatedShipPlacementForPlayerOne(appContext) {
    const playerOneCells = document.querySelectorAll(".playerone-cell");
    playerOneCells.forEach((cell) => {
        let cellNumber = Number(cell.dataset.cellNumber)
        if (appContext.playerOne.gameboardState.gameboard[cellNumber].name !== null) {
            highlightShipPlacementModule.highlightModule.highlightRegistered(cell);
        }
    });
}

function initializeRandomShipPlacementButton (appContext) {
    showRandomShipPlacementButton (appContext);
    attachEventListenerToRandomShipPlacementButton (appContext);
}

module.exports = {
    initializeRandomShipPlacementButton
}