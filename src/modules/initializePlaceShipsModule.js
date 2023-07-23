const { assignRandomShipPlacementForPlayerComputer } = require("./computerPlayerInitialization");
const { CreateShips } = require("./factories/CreateShips");
const { highlightShipPlacementModule } = require("./highlightShipPlacementModule");
const { orientationModule } = require("./orientationModule");
const { submitButtonEventListenerModule } = require("./submitButtonEventListenerModule");

const initializePlaceShipsModule = (function ()  {

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
        console.log(appContext.playerOne);
        assignRandomShipPlacementForPlayerComputer(appContext);
        console.log(appContext.playerComputer);

    }
    


    function createShipList(appContext) {
        appContext.shipList = CreateShips(appContext);
        console.log("Ship creation: COMPLETE");
        console.log(`Ship List: ${JSON.stringify(appContext.shipList)}`);
    }
    
    function initializePlaceShipsDynamicHTML (appContext) {
        appContext.appElements.messageBox.classList.remove("hidden");
        appContext.appElements.horizontalButton.classList.remove("hidden");
        submitButtonEventListenerModule.toggleSubmitButtonOff(appContext);
        console.log("Ship placement screen dynamic html updated");
    }
    
    function setupPlaceShips(appContext) {
        orientationModule.addOrientationClickEvent(appContext);
        initializePlaceShipsDynamicHTML(appContext);
        createShipList(appContext);
    }
    
    function updateMessageBox (appContext, message) {
        appContext.appElements. messageBox.innerHTML = message;
        console.log("Message box updated.");
    }
    
    return {
        initializePlaceShips
    }

})()

module.exports = {
    initializePlaceShipsModule
}