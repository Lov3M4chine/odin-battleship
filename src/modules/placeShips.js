const { updateHighlightedFromSelectedToRegistered } = require("./dynamicHtml");

let isPlacementSuccessful = true;

function registerPlaceShipForPlayerOne (cellSelected, playerOne, isVertical, currentShipName, currentShipSize, highlightedArray) {
    console.log(`registerPlaceShipForPlayerOne array: ${highlightedArray}`)
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

function addSubmitButtonEventListener(cellSelected, playerOne, isVertical, currentShipName, currentShipSize, highlightedArray) {
    console.log(`addSubmitButtonEventListener array: ${highlightedArray}`)
    return new Promise(resolve => {
      const submitButton = document.getElementById("submit-button");
  
      const onClick = function(event) {
        registerPlaceShipForPlayerOne(cellSelected, playerOne, isVertical, currentShipName, currentShipSize, highlightedArray);
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

module.exports = {
    registerPlaceShipForPlayerOne,
    addSubmitButtonEventListener
}