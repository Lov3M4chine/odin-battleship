const { showRandomShipPlacementButton } = require("./chooseShipPlacementForMe");
const { assignRandomShipPlacementForPlayerComputer } = require("./computerPlayerInitialization");
const { CreateShips } = require("./factories/CreateShips");
const { highlightShipPlacementModule } = require("./highlightShipPlacementModule");
const { orientationModule } = require("./orientationModule");
const { submitButtonEventListenerModule } = require("./submitButtonEventListenerModule");

const initializePlaceShipsModule = (function ()  {

    function consoleLogInitializePlaceShipsCompletion(appContext) {
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
        highlightShipPlacementModule.highlightEventListenerModule.wipeEventListeners(appContext);
        assignRandomShipPlacementForPlayerComputer(appContext);
        consoleLogInitializePlaceShipsCompletion(appContext);
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
        showRandomShipPlacementButton(appContext);
    }
    
    function updateMessageBox (appContext, message) {
        appContext.appElements. messageBox.innerHTML = message;
    }
    
    return {
        initializePlaceShips,
        updateMessageBox
    }

})()

module.exports = {
    initializePlaceShipsModule
}