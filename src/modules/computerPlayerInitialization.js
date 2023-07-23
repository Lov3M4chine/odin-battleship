const { highlightShipPlacementModule } = require("./highlightShipPlacementModule");
const { registerShipModule } = require("./registerShipModule");


function assignRandomShipPlacementForPlayerComputer (appContext) {
    for (let currentShipKey in appContext.shipList) {
        processRandomShipPlacementForPlayerComputer(appContext, currentShipKey);
    }
}

function processRandomShipPlacementForPlayerComputer(appContext, currentShipKey) {
    let { name: currentShipName, size: currentShipSize } = appContext.shipList[currentShipKey];
    randomizeVariablesForPlaceShipsForPlayerComputer(appContext);
    appContext.currentShipName = currentShipName;
    appContext.currentShipSize = currentShipSize;
    highlightShipPlacementModule.checkPlacementModule.checkIsPlacementValid(appContext, appContext.playerComputer);
    if (appContext.isPlacementValid) {
        registerShipModule.registerPlaceShipForPlayerComputer(appContext);
    } else {
        processRandomShipPlacementForPlayerComputer(appContext, currentShipKey)
    }
}

function randomizeVariablesForPlaceShipsForPlayerComputer(appContext) {
    appContext.cellSelected = Math.floor(Math.random() * ((appContext.horizontalSize * appContext.verticalSize)));
    appContext.orientation.isVertical = Math.random() < 0.5;
}

module.exports = {
    assignRandomShipPlacementForPlayerComputer
}
