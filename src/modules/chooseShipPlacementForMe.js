const { randomizeVariablesForPlaceShips } = require("./computerPlayerInitialization");
const { highlightShipPlacementModule } = require("./highlightShipPlacementModule");
const { initializeBattleMode } = require("./initializeBattleMode");

function addRandomShipPlacementButton (appContext) {
    appContext.appElements.chooseForMeButton.classList.remove("hidden");
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
    // initializeBattleMode(appContext);
}

function highlightAutomatedShipPlacementForPlayerOne(appContext) {
    console.log(`Player One = ${JSON.stringify(appContext.playerOne)}`)
    const playerOneCells = document.querySelectorAll(".playerone-cell");
    playerOneCells.forEach((cell) => {
        let cellNumber = Number(cell.dataset.cellNumber)
        if (appContext.playerOne.gameboardState.gameboard[cellNumber].name !== null) {
            highlightShipPlacementModule.highlightModule.highlightSelected(cell);
        }
    });
}

function initializeRandomShipPlacementButton (appContext) {
    addRandomShipPlacementButton (appContext);
    attachEventListenerToRandomShipPlacementButton (appContext);
}

module.exports = {
    initializeRandomShipPlacementButton
}