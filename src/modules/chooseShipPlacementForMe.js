const { randomizeVariablesForPlaceShips, assignRandomShipPlacementForPlayerComputer } = require("./computerPlayerInitialization");
const { highlightShipPlacementModule } = require("./highlightShipPlacementModule");

function showRandomShipPlacementButton (appContext) {
    appContext.appElements.chooseForMeButton.classList.remove("hidden");
}

function attachEventListenerToRandomShipPlacementButton (appContext) {
    return new Promise(resolve => {
        appContext.appElements.chooseForMeButton.addEventListener('click', () => {
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
    console.log(`Initializing automated ship placement for player one...`);
    for (let currentShipKey in appContext.shipList) {
        processRandomShipPlacementForPlayerOne(appContext, currentShipKey);
    }
    highlightAutomatedShipPlacementForPlayerOne(appContext);
    console.log(`...player one automated ship placement complete.`);
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