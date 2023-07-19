const { initializePlaceShipsDynamicHTML, updateMessageBox, removeHighlightedSelections, highlightShipPlacement, updateHighlightedFromSelectedToRegistered } = require("./dynamicHtml");
const { CreateShips } = require("./factories/CreateShips");
const horizontalButton = document.getElementById("horizontal-button");
const verticalButton = document.getElementById("vertical-button");

let highlightedArray = [];
let isPlacementSuccessful = true;
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
        
        const result = highlightShipPlacement(event.target, playerOne, orientation.isVertical, currentShipSize);
        console.log("...current selection highlighted");
    
        highlightedArray = result.highlightedArray;
        cellSelected = result.cellSelected;
    };    
    playerOneCells.forEach(function(cell) {
        cell.addEventListener('click', highlightShipPlacementEventListener);
    });
    console.log("highlightShip Event Listener attached to all cells");
}

function registerPlaceShipForPlayerOne (playerOne, currentShipName, currentShipSize) {
    if (checkIsPlacementValid(cellSelected, playerOne, currentShipSize)) {
        playerOne.placeShip(cellSelected, orientation.isVertical, currentShipName, currentShipSize);
        updateHighlightedFromSelectedToRegistered(highlightedArray);
        isPlacementSuccessful = true;
        return isPlacementSuccessful;
    } else {
        console.log("Try again.")
        addPlaceShipEventListener(playerOne, orientation.isVertical, currentShipName, currentShipSize);
    }
}

function addSubmitButtonEventListener(playerOne, currentShipName, currentShipSize, ) {
    return new Promise(resolve => {
      const submitButton = document.getElementById("submit-button");
  
      const onClick = function(event) {
        registerPlaceShipForPlayerOne(playerOne, currentShipName, currentShipSize);
        submitButton.removeEventListener('click', onClick);
        resolve();
      };
  
      submitButton.addEventListener('click', onClick);
    });
  }

function checkIsPlacementValid (cellNumber, playerOne, currentShipSize) {
    let isPlacementValid = true;
    if (orientation.isVertical) {
        if (playerOne.gameboardState.verticalSize - (cellNumber % playerOne.gameboardState.verticalSize) < currentShipSize) {
            isPlacementValid = false;
        }
        for (let i = cellNumber; i < (cellNumber + (currentShipSize * playerOne.gameboardState.horizontalSize)); i+=playerOne.gameboardState.horizontalSize) {
            if (playerOne.gameboardState.gameboard[i].name) {
                isPlacementValid = false;
            } 
        }
    } else {
        if ((playerOne.gameboardState.horizontalSize - (cellNumber % playerOne.gameboardState.horizontalSize)) < currentShipSize) {
            isPlacementValid = false;
        }
        for (let i = cellNumber; i < (cellNumber + currentShipSize); i+=1) {
            if (playerOne.gameboardState.gameboard[i].name) {
                isPlacementValid = false;
            } 
        }
    }
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
        updateMessageBox(`Please place your ${currentShipName}`);
        console.log("Message box updated.");
        addHighlightShipEventListener(playerOne, currentShipSize);
        await addSubmitButtonEventListener(playerOne, currentShipName, currentShipSize);
        console.log(playerOne);
        console.log(playerOne.ships);
    }
}

module.exports = {
    initializePlaceShips
}