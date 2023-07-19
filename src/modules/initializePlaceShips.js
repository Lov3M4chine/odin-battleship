const { initializePlaceShipsDynamicHTML, updateMessageBox, removeHighlightedSelections, highlightShipPlacement, updateHighlightedFromSelectedToRegistered } = require("./dynamicHtml");
const { CreateShips } = require("./factories/CreateShips");

let highlightedArray = [];
let isPlacementSuccessful = true;

function addOrientationClickEvent(orientation) {
    const orientationButtons = document.querySelectorAll(".orientation-button");
    orientationButtons.forEach(function(button) {
        button.removeEventListener('click', () => toggleOrientation(orientation));
        button.addEventListener('click', () => toggleOrientation(orientation));
    });
}

function addHighlightShipEventListener (playerOne, isVertical, currentShipSize) {
    const playerOneCells = document.querySelectorAll(".playerone-cell");
    const highlightShipPlacementEventListener = function(event) {
        removeHighlightedSelections(highlightedArray);
        console.log("Previous highlighted selections removed.")
        
        const result = highlightShipPlacement(event.target, playerOne, isVertical, currentShipSize);
        console.log("...current selection highlighted");
    
        
        highlightedArray = result.highlightedArray;

        const cellSelected = result.cellSelected;
    
        playerOneCells.forEach(function(cell) {
            cell.removeEventListener('click', highlightShipPlacementEventListener);
            console.log("highlightShipPlacementEventListener removed from cell clicked");
        });
    
        return cellSelected;
    };    
    playerOneCells.forEach(function(cell) {
        cell.addEventListener('click', highlightShipPlacementEventListener);
    });
    console.log("highlightShip Event Listener attached to all cells");
}

function registerPlaceShipForPlayerOne (cellSelected, playerOne, isVertical, currentShipName, currentShipSize) {
    if (checkIsPlacementValid(cellSelected, playerOne, isVertical, currentShipSize)) {
        playerOne.placeShip(cellSelected, isVertical, currentShipName, currentShipSize);
        updateHighlightedFromSelectedToRegistered(highlightedArray);
        isPlacementSuccessful = true;
        return isPlacementSuccessful;
    } else {
        console.log("Try again.")
        addPlaceShipEventListener(playerOne, isVertical, currentShipName, currentShipSize);
    }
}

function addSubmitButtonEventListener(cellSelected, playerOne, isVertical, currentShipName, currentShipSize, ) {
    return new Promise(resolve => {
      const submitButton = document.getElementById("submit-button");
  
      const onClick = function(event) {
        registerPlaceShipForPlayerOne(cellSelected, playerOne, isVertical, currentShipName, currentShipSize);
        submitButton.removeEventListener('click', onClick);
        resolve();
      };
  
      submitButton.addEventListener('click', onClick);
    });
  }

function checkIsPlacementValid (cellNumber, playerOne, isVertical, currentShipSize) {
    let isPlacementValid = true;
    if (isVertical) {
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
            console.log(`name: ${playerOne.gameboardState.gameboard[i].name}`);
            if (playerOne.gameboardState.gameboard[i].name) {
                isPlacementValid = false;
            } 
        }
    }
    return isPlacementValid;
}

async function initializePlaceShips(playerOne) {
    let orientation = {
        isVertical: false
      };
    let loopCount = 0;

    addOrientationClickEvent(orientation);
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
        let cellSelected = addHighlightShipEventListener(playerOne, orientation.isVertical, currentShipSize);
        await addSubmitButtonEventListener(cellSelected, playerOne, orientation.isVertical, currentShipName, currentShipSize);
        
    }
    
}

module.exports = {
    initializePlaceShips
}