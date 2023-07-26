const { randomizeVariablesForPlaceShips, assignRandomShipPlacementForPlayerComputer } = require("./computerPlayerInitialization");
const { highlightShipPlacementModule } = require("./highlightShipPlacementModule");
const { submitButtonEventListenerModule } = require("./submitButtonEventListenerModule");

function showRandomShipPlacementButton (appContext) {
    appContext.appElements.chooseForMeButton.classList.remove("hidden");
}

function attachEventListenerToRandomShipPlacementButton (appContext) {
    return new Promise(resolve => {
        appContext.appElements.chooseForMeButton.addEventListener('click', () => {
            highlightShipPlacementModule.highlightModule.removeHighlightedSelections(appContext);
            submitButtonEventListenerModule.toggleSubmitButtonOff(appContext);
            assignRandomShipPlacementForPlayerOne(appContext);
            resolve();
        }, { once: true });
    });
}

function processRandomShipPlacementForPlayerOne(appContext, currentShipKey) {
    let { name: currentShipName, size: currentShipSize } = appContext.shipList[currentShipKey];
    randomizeVariablesForPlaceShips(appContext);
    appContext.currentShipName = currentShipName;
    appContext.currentShipSize = currentShipSize;
    highlightShipPlacementModule.checkPlacementModule.checkIsPlacementValid(appContext, appContext.playerOne);
    if (appContext.isPlacementValid) {
        appContext.playerOne.placeShip(appContext.cellSelected, appContext.orientation.isVertical, appContext.currentShipName, appContext.currentShipSize, appContext);
    } else {
        processRandomShipPlacementForPlayerOne(appContext, currentShipKey)
    }
}

function assignRandomShipPlacementForPlayerOne (appContext) {
    for (let currentShipKey in appContext.shipList) {
        processRandomShipPlacementForPlayerOne(appContext, currentShipKey);
    }
    highlightAutomatedShipPlacementForPlayerOne(appContext);
    highlightShipPlacementModule.highlightEventListenerModule.wipeEventListeners(appContext);
    assignRandomShipPlacementForPlayerComputer(appContext);
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

module.exports = {
    showRandomShipPlacementButton,
    attachEventListenerToRandomShipPlacementButton
}