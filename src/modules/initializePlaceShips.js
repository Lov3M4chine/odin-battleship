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

function addOrientationClickEvent() {
    const orientationButtons = document.querySelectorAll(".orientation-button");
    orientationButtons.forEach(function(button) {
        button.removeEventListener('click', () => toggleOrientation(orientation));
        button.addEventListener('click', () => toggleOrientation(orientation));
    });
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

function addHighlightShipEventListener (playerOne, currentShipSize) {
    const playerOneCells = document.querySelectorAll(".playerone-cell");
    const highlightShipPlacementEventListener = function(event) {
        
        removeHighlightedSelections(highlightedArray);
        console.log("Previous highlighted selections removed.")
        
        const result = highlightShipPlacement(event.target, playerOne, orientation.isVertical, currentShipSize, highlightedArray);
        console.log("...current selection highlighted");
    
        highlightedArray = result.highlightedArray;
        cellSelected = result.cellSelected;
    };    
    playerOneCells.forEach(function(cell) {
        cell.removeEventListener('click', highlightShipPlacementEventListener);
        cell.addEventListener('click', highlightShipPlacementEventListener);
    });
    console.log("highlightShip Event Listener attached to all cells");
}

function registerPlaceShipForPlayerOne(playerOne, currentShipName, currentShipSize) {
    return new Promise((resolve) => {
        if (checkIsPlacementValid(cellSelected, playerOne, currentShipSize, orientation.isVertical)) {
            playerOne.placeShip(cellSelected, orientation.isVertical, currentShipName, currentShipSize);
            updateHighlightedFromSelectedToRegistered(highlightedArray);
            console.log('Placement was successful');
            resolve(true);
        } else {
            console.log("Try again.");

            removeHighlightedSelections(highlightedArray);
            console.log("Previous highlighted selections removed.");

            highlightedArray.length = 0;
            addHighlightShipEventListener(playerOne, currentShipSize);


            resolve(false);
        }
    });
}

function addSubmitButtonEventListener(playerOne, currentShipName, currentShipSize) {
    return new Promise(async (resolve) => {
        const submitButton = document.getElementById("submit-button");

        const onClick = async function(event) {
            let placementSuccessful = await registerPlaceShipForPlayerOne(playerOne, currentShipName, currentShipSize);
            if (placementSuccessful) {
                toggleSubmitButtonOff();
                submitButton.removeEventListener('click', onClick);
                resolve();
            } else {
                console.log('Placement was unsuccessful, trying again');
                toggleSubmitButtonOff();
                submitButton.removeEventListener('click', onClick);
                
            }
        };

        submitButton.addEventListener('click', onClick);
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



async function initializePlaceShips(playerOne) {
    let loopCount = 0;
    addOrientationClickEvent();
    console.log("Orientation click event added");
    initializePlaceShipsDynamicHTML();
    console.log("Ship placement screen dynamic html updated");
    const shipList = CreateShips();
    console.log("Ship List Created");
    console.log(`Ship List: ${JSON.stringify(shipList)}`);

    for (let currentShipKey in shipList) {
        loopCount += 1;
        console.log(`Loop ${loopCount} of shipList`);
        let currentShip = shipList[currentShipKey];
        let currentShipName = currentShip.name;
        console.log(`Ship Name: ${currentShipName}`);
        let currentShipSize = currentShip.size;
        console.log(`Ship Size: ${currentShipSize}`);
        updateMessageBox(`Please place your ${currentShipName} (${currentShipSize} slots)`);
        console.log("Message box updated.");
        addHighlightShipEventListener(playerOne, currentShipSize);
        while (true) {
            try {
                await addSubmitButtonEventListener(playerOne, currentShipName, currentShipSize);
                break;
            } catch (error) {
                console.log('Re-attaching submit button event listener');
            }
        }
        console.log(playerOne);
        console.log(playerOne.ships);
    }
}

module.exports = {
    initializePlaceShips
}