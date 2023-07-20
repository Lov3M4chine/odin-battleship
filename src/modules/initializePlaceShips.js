const { initializePlaceShipsDynamicHTML, updateMessageBox, removeHighlightedSelections, highlightShipPlacement, updateHighlightedFromSelectedToRegistered, toggleSubmitButtonOff } = require("./dynamicHtml");
const { CreateShips } = require("./factories/CreateShips");

let appContext = {
    orientation: {
        isVertical: false
    },
    highlightedArray: [],
    isPlacementValid: true,
    cellSelected: null,
    highlightListeners: {},
    submitButtonListener: null,
    playerOne: null,
    currentShipName: null,
    currentShipSize: null
}


const orientationModule = (function() {
    const horizontalButton = document.getElementById("horizontal-button");
    const verticalButton = document.getElementById("vertical-button");

    function addOrientationClickEvent() {
        const orientationButtons = document.querySelectorAll(".orientation-button");
        orientationButtons.forEach(function(button) {
            button.removeEventListener('click', () => toggleOrientation(appContext.orientation));
            button.addEventListener('click', () => toggleOrientation(appContext.orientation));
        });
        console.log("Orientation click event added");
    }

    function toggleOrientation() {
        if (appContext.orientation.isVertical === true) {
            appContext.orientation.isVertical = false;
            verticalButton.classList.add("hidden");
            horizontalButton.classList.remove("hidden");
        } else {
            appContext.orientation.isVertical = true;
            verticalButton.classList.remove("hidden");
            horizontalButton.classList.add("hidden");
        }
    }

    return {
        addOrientationClickEvent,
    }
})();

const highlightShipPlacementModule = (function() {
    function generateHighlightShipPlacementEventListener() {  
        return function(event) {
            removeHighlightedSelections(appContext.highlightedArray);
            console.log("Previous highlighted selections removed.")
        
            const result = highlightShipPlacement(event.target, appContext.playerOne, appContext.orientation.isVertical, appContext.currentShipSize, appContext.highlightedArray);
            console.log("...current selection highlighted");
    
            appContext.highlightedArray = result.highlightedArray;
            appContext.cellSelected = result.cellSelected;
        };
    }

    function removeOldHighlightListener(cell) {
        if (appContext.highlightListeners[cell.id]) {
            cell.removeEventListener('click', appContext.highlightListeners[cell.id]);
        }
    }

    function processNewHighlightListener(cell) {
        const listener = generateHighlightShipPlacementEventListener(appContext.playerOne, appContext.currentShipSize, appContext.orientation, appContext.highlightedArray);
    
        appContext.highlightListeners[cell.id] = listener;
        cell.addEventListener('click', listener);
    }
    
    function addHighlightShipEventListener() {
        const playerOneCells = document.querySelectorAll(".playerone-cell");
    
        playerOneCells.forEach((cell) => {
            removeOldHighlightListener(cell);
            processNewHighlightListener(cell, appContext.playerOne, appContext.currentShipSize);
        });
    
        console.log("highlightShip Event Listener attached to all cells");
    }

    return {
        addHighlightShipEventListener
    }
})();

const registerShipModule = (function () {
    function processRegistrationSuccess() {
        appContext.playerOne.placeShip(appContext.cellSelected, appContext.orientation.isVertical, appContext.currentShipName, appContext.currentShipSize);
        updateHighlightedFromSelectedToRegistered(appContext.highlightedArray);
        console.log('Placement was successful');
    }
    
    function processRegistrationFailure() {
        console.log("Try again.");
        removeHighlightedSelections(appContext.highlightedArray);
        console.log("Previous highlighted selections removed.");
        appContext.highlightedArray.length = 0;
        highlightShipPlacementModule.addHighlightShipEventListener(appContext.playerOne, appContext.currentShipSize);
    }
    
    function registerPlaceShipForPlayerOne() {
        return new Promise((resolve) => {
            if (checkIsPlacementValid(appContext.cellSelected, appContext.playerOne, appContext.currentShipSize, appContext.orientation.isVertical)) {
                processRegistrationSuccess(appContext.currentShipName, appContext.currentShipSize);
                resolve(true);
            } else {
                processRegistrationFailure(appContext.playerOne, appContext.currentShipSize);
                resolve(false);
            }
        });
    }

    return {
        registerPlaceShipForPlayerOne
    }
})();

const submitButtonEventListenerModule = (function () {
    const submitButton = document.getElementById("submit-button");

    function generateSubmitButtonEventListener(resolve) {
        return async function() {
            let placementSuccessful = await registerShipModule.registerPlaceShipForPlayerOne(appContext.playerOne, appContext.currentShipName, appContext.currentShipSize);
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


function checkIsPlacementValid () {
    let verticalSize = appContext.playerOne.gameboardState.verticalSize; 
    let horizontalSize = appContext.playerOne.gameboardState.horizontalSize;
    if (appContext.orientation.isVertical) {
        for (let i = appContext.cellSelected; i < (appContext.cellSelected + appContext.currentShipSize * verticalSize); i += horizontalSize) {
            if (i >= 100 || (i % verticalSize) >= (appContext.cellSelected % verticalSize + appContext.currentShipSize) || appContext.playerOne.gameboardState.gameboard[i].name) {
                console.log("triggered vertical error");
                appContext.isPlacementValid = false;
                break;
            }
        }
    } else {
        for (let i = appContext.cellSelected; i < (appContext.cellSelected + appContext.currentShipSize); i++) {
            if (i >= 100 || (i % horizontalSize) >= (appContext.cellSelected % horizontalSize + appContext.currentShipSize) || appContext.playerOne.gameboardState.gameboard[i].name) {
                console.log("triggered vertical error");
                appContext.isPlacementValid = false;
                break;
            }
        }
    }
    console.log("check placement complete")
    return appContext.isPlacementValid;
}

function createShipList () {
    const shipList = CreateShips();
    console.log("Ship List Created");
    console.log(`Ship List: ${JSON.stringify(shipList)}`);
    return shipList;
}

async function initializePlaceShips(playerOne) {
    orientationModule.addOrientationClickEvent();
    initializePlaceShipsDynamicHTML();
    const shipList = createShipList();
    appContext.playerOne = playerOne;
    console.log(`PlayerOne: ${JSON.stringify(appContext.playerOne)}`);

    for (let currentShipKey in shipList) {
        let { name: currentShipName, size: currentShipSize } = shipList[currentShipKey];
        appContext.currentShipName = currentShipName;
        appContext.currentShipSize = currentShipSize;
        updateMessageBox(`Please place your ${appContext.currentShipName} (${appContext.currentShipSize} slots)`);
        highlightShipPlacementModule.addHighlightShipEventListener(appContext.currentShipSize);
        await submitButtonEventListenerModule.addSubmitButtonEventListener(appContext.currentShipName, appContext.currentShipSize);
    }
}

module.exports = {
    initializePlaceShips
}