const { initializeRandomShipPlacementButton } = require("./chooseShipPlacementForMe");
const { assignRandomShipPlacementForPlayerComputer } = require("./computerPlayerInitialization");
const { CreateShips } = require("./factories/CreateShips");
const { highlightShipPlacementModule } = require("./highlightShipPlacementModule");
const { orientationModule } = require("./orientationModule");
const { submitButtonEventListenerModule } = require("./submitButtonEventListenerModule");

const initializePlaceShipsModule = (function ()  {

    function wipeEventListeners (appContext) {
        const playerOneCells = document.querySelectorAll(".playerone-cell");
        playerOneCells.forEach((cell) => {
            highlightShipPlacementModule.highlightEventListenerModule.removeOldHighlightListener(cell,appContext);
        });
    }

    function consoleLogInitialePlaceShipsCompletion(appContext) {
        console.log(`All ships placed sucessfully.`);
        console.log(`Player One: ${JSON.stringify(appContext.playerOne)}`);
        console.log(`Player Computer: ${JSON.stringify(appContext.playerComputer)}`);
    }

    async function initializePlaceShips(appContext, player) {
        setupPlaceShips(appContext);
    
        for (let currentShipKey in appContext.shipList) {
            let { name: currentShipName, size: currentShipSize } = appContext.shipList[currentShipKey];
            appContext.currentShipName = currentShipName;
            appContext.currentShipSize = currentShipSize;
            updateMessageBox(appContext, `Please place your ${appContext.currentShipName} (${appContext.currentShipSize} slots)`);
            highlightShipPlacementModule.highlightEventListenerModule.addHighlightShipEventListener(appContext, player);
            await submitButtonEventListenerModule.addSubmitButtonEventListener(appContext, player);
        }
        wipeEventListeners(appContext);
        assignRandomShipPlacementForPlayerComputer(appContext);
        consoleLogInitialePlaceShipsCompletion(appContext);
    }
    
    function createShipList(appContext) {
        appContext.shipList = CreateShips(appContext);
    }
    
    function initializePlaceShipsDynamicHTML (appContext) {
        appContext.appElements.messageBox.classList.remove("hidden");
        appContext.appElements.horizontalButton.classList.remove("hidden");
        submitButtonEventListenerModule.toggleSubmitButtonOff(appContext);
    }
    
    function setupPlaceShips(appContext) {
        orientationModule.addOrientationClickEvent(appContext);
        initializePlaceShipsDynamicHTML(appContext);
        createShipList(appContext);
        initializeRandomShipPlacementButton(appContext);
    }
    
    function updateMessageBox (appContext, message) {
        appContext.appElements. messageBox.innerHTML = message;
    }
    
    return {
        initializePlaceShips
    }

})()

module.exports = {
    initializePlaceShipsModule
}