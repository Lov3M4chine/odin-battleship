const { CreateShips } = require("./factories/CreateShips");
const { highlightShipPlacementModule } = require("./highlightShipPlacementModule");
const { orientationModule } = require("./orientationModule");
const { submitButtonEventListenerModule } = require("./submitButtonEventListenerModule");

const messageBox = document.getElementById("message-box");
const horizontalButton = document.getElementById("horizontal-button");



function createShipList(appContext) {
    appContext.shipList = CreateShips(appContext);
    console.log("Ship creation: COMPLETE");
    console.log(`Ship List: ${JSON.stringify(appContext.shipList)}`);
}

function initializePlaceShipsDynamicHTML () {
    messageBox.classList.remove("hidden");
    horizontalButton.classList.remove("hidden");
    submitButtonEventListenerModule.toggleSubmitButtonOff();
    console.log("Ship placement screen dynamic html updated");
}

function contextCreation(appContext) {
    orientationModule.addOrientationClickEvent(appContext);
    initializePlaceShipsDynamicHTML();
    createShipList(appContext);
}

function updateMessageBox (message) {
    messageBox.innerHTML = message;
    console.log("Message box updated.");
}

async function initializePlaceShips(appContext) {
    contextCreation(appContext);

    for (let currentShipKey in appContext.shipList) {
        let { name: currentShipName, size: currentShipSize } = appContext.shipList[currentShipKey];
        appContext.currentShipName = currentShipName;
        appContext.currentShipSize = currentShipSize;
        updateMessageBox(`Please place your ${appContext.currentShipName} (${appContext.currentShipSize} slots)`);
        highlightShipPlacementModule.highlightEventListenerModule.addHighlightShipEventListener(appContext);
        await submitButtonEventListenerModule.addSubmitButtonEventListener(appContext);
    }
}

module.exports = {
    initializePlaceShips
}