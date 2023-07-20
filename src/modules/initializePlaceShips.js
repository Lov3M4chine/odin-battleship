const { initializePlaceShipsDynamicHTML, updateMessageBox, removeHighlightedSelections, highlightShipPlacement, updateHighlightedFromSelectedToRegistered, toggleSubmitButtonOff } = require("./dynamicHtml");
const { CreateShips } = require("./factories/CreateShips");
const horizontalButton = document.getElementById("horizontal-button");
const verticalButton = document.getElementById("vertical-button");

let highlightedArray = [];
let isPlacementValid = true;
let orientation = {
    isVertical: false
  };
let cellSelected;
let highlightListeners = {};
let submitButtonListener;

function addOrientationClickEvent() {
    const orientationButtons = document.querySelectorAll(".orientation-button");
    orientationButtons.forEach(function(button) {
        button.removeEventListener('click', () => toggleOrientation(orientation));
        button.addEventListener('click', () => toggleOrientation(orientation));
    });
    console.log("Orientation click event added");
}

function toggleOrientation() {
    if (orientation.isVertical === true) {
        orientation.isVertical = false;
        verticalButton.classList.add("hidden");
        horizontalButton.classList.remove("hidden");
    } else {
        orientation.isVertical = true;
        verticalButton.classList.remove("hidden");
        horizontalButton.classList.add("hidden");
    }
}

function generateHighlightShipPlacementEventListener(playerOne, currentShipSize, orientation, highlightedArray) {  
    return function(event) {
        removeHighlightedSelections(highlightedArray);
        console.log("Previous highlighted selections removed.")
    
        const result = highlightShipPlacement(event.target, playerOne, orientation.isVertical, currentShipSize, highlightedArray);
        console.log("...current selection highlighted");

        highlightedArray = result.highlightedArray;
        cellSelected = result.cellSelected;
    };
}

function removeOldHighlightListener(cell) {
    if (highlightListeners[cell.id]) {
        cell.removeEventListener('click', highlightListeners[cell.id]);
    }
}

function processNewHighlightListener(cell, playerOne, currentShipSize) {
    const listener = generateHighlightShipPlacementEventListener(playerOne, currentShipSize, orientation, highlightedArray);

    highlightListeners[cell.id] = listener;
    cell.addEventListener('click', listener);
}

function addHighlightShipEventListener(playerOne, currentShipSize) {
    const playerOneCells = document.querySelectorAll(".playerone-cell");

    playerOneCells.forEach((cell) => {
        removeOldHighlightListener(cell);
        processNewHighlightListener(cell, playerOne, currentShipSize);
    });

    console.log("highlightShip Event Listener attached to all cells");
}

function processRegistrationSuccess(currentShipName, currentShipSize) {
    playerOne.placeShip(cellSelected, orientation.isVertical, currentShipName, currentShipSize);
    updateHighlightedFromSelectedToRegistered(highlightedArray);
    console.log('Placement was successful');
}

function processRegistrationFailure(playerOne, currentShipSize) {
    console.log("Try again.");
    removeHighlightedSelections(highlightedArray);
    console.log("Previous highlighted selections removed.");
    highlightedArray.length = 0;
    addHighlightShipEventListener(playerOne, currentShipSize);
}

function registerPlaceShipForPlayerOne(playerOne, currentShipName, currentShipSize) {
    return new Promise((resolve) => {
        if (checkIsPlacementValid(cellSelected, playerOne, currentShipSize, orientation.isVertical)) {
            processRegistrationSuccess(currentShipName, currentShipSize);
            resolve(true);
        } else {
            processRegistrationFailure(playerOne, currentShipSize);
            resolve(false);
        }
    });
}

function generateSubmitButtonEventListener(playerOne, currentShipName, currentShipSize, resolve) {
    return async function() {
        let placementSuccessful = await registerPlaceShipForPlayerOne(playerOne, currentShipName, currentShipSize);
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
    const submitButton = document.getElementById("submit-button");
    if (submitButtonListener) {
        submitButton.removeEventListener('click', submitButtonListener);
    }
}

function processNewSubmitButtonListener(playerOne, currentShipName, currentShipSize, resolve) {
    const submitButton = document.getElementById("submit-button");
    submitButtonListener = generateSubmitButtonEventListener(playerOne, currentShipName, currentShipSize, resolve);
    submitButton.addEventListener('click', submitButtonListener);
}

function addSubmitButtonEventListener(playerOne, currentShipName, currentShipSize) {
    return new Promise((resolve) => {
        removeOldSubmitButtonListener();
        processNewSubmitButtonListener(playerOne, currentShipName, currentShipSize, resolve);
        console.log("submitButton Event Listener attached to submit button");
    });
}

function checkIsPlacementValid (cellNumber, playerOne, currentShipSize, isVertical) {
    let verticalSize = playerOne.gameboardState.verticalSize; 
    let horizontalSize = playerOne.gameboardState.horizontalSize;
    if (isVertical) {
        for (let i = cellNumber; i < (cellNumber + currentShipSize * verticalSize); i += horizontalSize) {
            if (i >= 100 || (i % verticalSize) >= (cellNumber % verticalSize + currentShipSize) || playerOne.gameboardState.gameboard[i].name) {
                console.log("triggered vertical error");
                isPlacementValid = false;
                break;
            }
        }
    } else {
        for (let i = cellNumber; i < (cellNumber + currentShipSize); i++) {
            if (i >= 100 || (i % horizontalSize) >= (cellNumber % horizontalSize + currentShipSize) || playerOne.gameboardState.gameboard[i].name) {
                console.log("triggered vertical error");
                isPlacementValid = false;
                break;
            }
        }
    }
    console.log("check placement complete")
    return isPlacementValid;
}

function createShipList () {
    const shipList = CreateShips();
    console.log("Ship List Created");
    console.log(`Ship List: ${JSON.stringify(shipList)}`);
    return shipList;
}

async function initializePlaceShips(playerOne) {
    addOrientationClickEvent();
    initializePlaceShipsDynamicHTML();
    const shipList = createShipList();

    for (let currentShipKey in shipList) {
        let { name: currentShipName, size: currentShipSize } = shipList[currentShipKey];
        updateMessageBox(`Please place your ${currentShipName} (${currentShipSize} slots)`);
        addHighlightShipEventListener(playerOne, currentShipSize);
        await addSubmitButtonEventListener(playerOne, currentShipName, currentShipSize);
    }
}

module.exports = {
    initializePlaceShips
}