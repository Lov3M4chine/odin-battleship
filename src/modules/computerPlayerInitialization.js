const { highlightShipPlacementModule } = require("./highlightShipPlacementModule");
const { registerShipModule } = require("./registerShipModule");


function assignRandomShipPlacementForPlayerComputer (appContext) {
    console.log(`Initializing player computer ship placement...`);
    for (let currentShipKey in appContext.shipList) {
        processRandomShipPlacementForPlayerComputer(appContext, currentShipKey);
    }
    console.log(`...player computer ship placement complete.`);
    console.log(`Computer Player: ${JSON.stringify(appContext.playerComputer)}`);
}

function processRandomShipPlacementForPlayerComputer(appContext, currentShipKey) {
    let { name: currentShipName, size: currentShipSize } = appContext.shipList[currentShipKey];
    randomizeVariablesForPlaceShips(appContext);
    appContext.currentShipName = currentShipName;
    appContext.currentShipSize = currentShipSize;
    highlightShipPlacementModule.checkPlacementModule.checkIsPlacementValid(appContext, appContext.playerComputer);
    if (appContext.isPlacementValid) {
        registerShipModule.registerPlaceShipForPlayerComputer(appContext);
    } else {
        processRandomShipPlacementForPlayerComputer(appContext, currentShipKey)
    }
}

function randomizeVariablesForPlaceShips(appContext) {
    appContext.cellSelected = randomizeCellSelected(appContext);
    appContext.orientation.isVertical = Math.random() < 0.5;
}

function randomizeCellSelected (appContext) {
    return Math.floor(Math.random() * ((appContext.horizontalSize * appContext.verticalSize)))
}

module.exports = {
    assignRandomShipPlacementForPlayerComputer,
    randomizeVariablesForPlaceShips,
    randomizeCellSelected
}
