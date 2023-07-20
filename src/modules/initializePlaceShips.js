const { CreateShips } = require("./factories/CreateShips");
const { highlightShipPlacementModule } = require("./highlightShipPlacementModule");
const { orientationModule } = require("./orientationModule");
const { registerShipModule } = require("./registerShipModule");

const messageBox = document.getElementById("message-box");
const horizontalButton = document.getElementById("horizontal-button");

let appContext = {
    orientation: {
        isVertical: false
    },
    highlightedArray: [],
    isPlacementValid: null,
    cellSelected: null,
    highlightListeners: {},
    submitButtonListener: null,
    playerOne: null,
    currentShipName: null,
    currentShipSize: null,
    shipList: []
}

const submitButtonEventListenerModule = (function () {
    
    function generateSubmitButtonEventListener(resolve) {
        return async function() {
            let placementSuccessful = await registerShipModule.registerPlaceShipForPlayerOne(appContext);
            if (placementSuccessful) {
                toggleSubmitButtonOff();
                resolve();
            } else {
                console.log('Placement was unsuccessful, trying again');
                toggleSubmitButtonOff();            
            }
        };
    }
    
    function removeOldSubmitButtonListener() {
        if (appContext.submitButtonListener) {
            submitButton.removeEventListener('click', appContext.submitButtonListener);
        }
    }
    
    function processNewSubmitButtonListener(resolve) {
        appContext.submitButtonListener = generateSubmitButtonEventListener(resolve);
        submitButton.addEventListener('click', appContext.submitButtonListener);
    }
    
    function addSubmitButtonEventListener() {
        return new Promise((resolve) => {
            removeOldSubmitButtonListener();
            processNewSubmitButtonListener(resolve);
            console.log("submitButton Event Listener attached to submit button");
        });
    }

    return {
        addSubmitButtonEventListener
    }
})();

function createShipList() {
    appContext.shipList = CreateShips();
    console.log("Ship creation: COMPLETE");
    console.log(`Ship List: ${JSON.stringify(appContext.shipList)}`);
}

function toggleSubmitButtonOff () {
    submitButton.classList.add("hidden");
}

function initializePlaceShipsDynamicHTML () {
    messageBox.classList.remove("hidden");
    horizontalButton.classList.remove("hidden");
    toggleSubmitButtonOff();
    console.log("Ship placement screen dynamic html updated");
}

function contextCreation(playerOne) {
    orientationModule.addOrientationClickEvent(appContext);
    initializePlaceShipsDynamicHTML();
    createShipList();
    appContext.playerOne = playerOne;
    console.log(playerOne)
}

function updateMessageBox (message) {
    messageBox.innerHTML = message;
    console.log("Message box updated.");
}

async function initializePlaceShips(playerOne) {
    contextCreation(playerOne);

    for (let currentShipKey in appContext.shipList) {
        let { name: currentShipName, size: currentShipSize } = appContext.shipList[currentShipKey];
        appContext.currentShipName = currentShipName;
        appContext.currentShipSize = currentShipSize;
        updateMessageBox(`Please place your ${appContext.currentShipName} (${appContext.currentShipSize} slots)`);
        highlightShipPlacementModule.highlightEventListenerModule.addHighlightShipEventListener(appContext);
        await submitButtonEventListenerModule.addSubmitButtonEventListener();
    }
}

module.exports = {
    initializePlaceShips
}