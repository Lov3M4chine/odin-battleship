const ShipFactory = require("./factories/ShipFactory.js");

let carrier = ShipFactory("carrier", 5);
let battleship = ShipFactory("battleship", 4);
let destroyer = ShipFactory("destroyer", 3);
let submarine = ShipFactory("submarine", 3);
let patrol = ShipFactory("patrol boat", 2);

let placeShipsList = [carrier, battleship, destroyer, submarine, patrol];
const messageBox = document.getElementById("message-box");
const submitButton = document.getElementById("submit-button");
let horizontalButton = document.getElementById("horizontal-button");
let isVertical = false;
let highlightedArray = [];

function waitForButtonClick(button) {
    return new Promise(resolve => {
        const onClick = function() {
            button.removeEventListener('click', onClick);
            resolve();
        };
        button.addEventListener('click', onClick);
    });
}

async function initializePlaceShips(playerone) {
    addOrientationClickEvent(isVertical);
    messageBox.classList.remove("hidden");
    horizontalButton.classList.remove("hidden");
    submitButton.classList.add("hidden");

    for (let currentShip of placeShipsList) {
        let currentShipName = currentShip.name;
        let currentShipSize = currentShip.size;

        do {
            placementSuccessful = false;
            messageBox.innerHTML = `Please place your ${currentShipName}`;
            addPlaceShipEventListener(playerone, isVertical, currentShipName, currentShipSize);
            submitButton.classList.remove("hidden");
            await waitForButtonClick(submitButton); 
            submitButton.classList.add("hidden");
        } while (!placementSuccessful);
    }
}


function addPlaceShipEventListener (playerone, isVertical, currentShipName, currentShipSize) {
    const playeroneCells = document.querySelectorAll(".playerone-cell");
    const onClick = function(event) {
        removeHighlightedSelections();
        selectShipPlacement(event.target, playerone, isVertical, currentShipName, currentShipSize);
        playeroneCells.forEach(function(cell) {
            cell.removeEventListener('click', onClick);
        });
    };
    playeroneCells.forEach(function(cell) {
        cell.addEventListener('click', onClick);
    });
}

function addSubmitButtonEventListener(cellSelected, playerone, isVertical, currentShipName, currentShipSize) {
    const onClick = function(event) {
        registerPlaceShipForPlayerone(cellSelected, playerone, isVertical, currentShipName, currentShipSize);
        submitButton.removeEventListener('click', onClick);
    };

    submitButton.addEventListener('click', onClick);
}

function selectShipPlacement (cell, playerone, isVertical, currentShipName, currentShipSize) {
    let cellNumber = Number(cell.dataset.cellNumber);
    let cellSelected = cellNumber;
    addSubmitButtonEventListener(cellSelected, playerone, isVertical, currentShipName, currentShipSize);
    submitButton.classList.remove("hidden");
    if (isVertical === true) {
        for (let i = cellNumber; i < (cellNumber + (currentShipSize * playerone.gameboardState.horizontalSize)); i+playerone.gameboardState.horizontalSize) {
            let cellToHighlight = document.querySelector(`[data-cell-number="${i}"]`);
            highlightedArray.push(i);
            console.log(`Highlighted Array: ${highlightedArray}`);
            cellToHighlight.classList.remove("bg-primary");
            cellToHighlight.classList.add("bg-accent");
        }
    } else {
        for (let i = cellNumber; i < (cellNumber + currentShipSize); i+=1) {
            let cellToHighlight = document.querySelector(`[data-cell-number="${i}"]`);
            highlightedArray.push(i);
            console.log(`Highlighted Array: ${highlightedArray}`);
            cellToHighlight.classList.remove("bg-primary");
            cellToHighlight.classList.add("bg-accent");
        }
    }
    return cellSelected;
}

function removeHighlightedSelections() {
    for (let i = 0; i < highlightedArray.length; i++) {
        let cellToRemoveHighlight = document.querySelector(`[data-cell-number="${highlightedArray[i]}"]`);
        cellToRemoveHighlight.classList.remove("bg-accent");
        cellToRemoveHighlight.classList.add("bg-primary");
    }
    highlightedArray = [];
}

function updateHighlightedSelectionToPermanent() {
    for (let i = 0; i < highlightedArray.length; i++) {
        let cellToRemoveHighlight = document.querySelector(`[data-cell-number="${highlightedArray[i]}"]`);
        cellToRemoveHighlight.classList.remove("bg-primary");
        cellToRemoveHighlight.classList.add("bg-secondary");
    }
}

function registerPlaceShipForPlayerone (cellSelected, playerone, isVertical, currentShipName, currentShipSize) {
    if (checkIsPlacementValid(cellSelected, playerone, isVertical, currentShipSize)) {
        playerone.placeShip(cellSelected, isVertical, currentShipName, currentShipSize);
        updateHighlightedSelectionToPermanent();
        placementSuccessful = true;
    } else {
        messageBox.innerHTML = "Invalid placement. Please try again."
        throw new Error("Ship placement is not valid");
    }
}

function checkIsPlacementValid (cellNumber, playerone, isVertical, currentShipSize) {
    let isPlacementValid = true;
    if (isVertical === true) {
        if (playerone.gameboardState.verticalSize - (cellNumber % playerone.gameboardState.verticalSize) < currentShipSize) {
            isPlacementValid = false;
            messageBox.innerHTML = "Invalid placement. Please try again."
            throw new Error("Ship placement is outside boundaries. Please choose a difference space.");
        }
        for (let i = cellNumber; i < (cellNumber + (currentShipSize * playerone.gameboardState.horizontalSize)); i+=playerone.gameboardState.horizontalSize) {
            if (playerone.gameboardState.gameboard[i].name) {
                isPlacementValid = false;
                messageBox.innerHTML = "Invalid placement. Please try again."
                throw new Error("Ships cannot overlap. Please choose a difference space.");
            } 
        }
    } else {
        if ((playerone.gameboardState.horizontalSize - (cellNumber % playerone.gameboardState.horizontalSize)) < currentShipSize) {
            isPlacementValid = false;
            messageBox.innerHTML = "Invalid placement. Please try again."
            throw new Error("Ship placement is outside boundaries. Please choose a difference space.");
        }
        for (let i = cellNumber; i < (cellNumber + currentShipSize); i+=1) {
            console.log(`name: ${playerone.gameboardState.gameboard[i].name}`);
            if (playerone.gameboardState.gameboard[i].name) {
                isPlacementValid = false;
                messageBox.innerHTML = "Invalid placement. Please try again."
                throw new Error("Ships cannot overlap. Please choose a differen space.")
            } 
        }
    }
    return isPlacementValid;
}

function addOrientationClickEvent(isVertical) {
    const orientationButtons = document.querySelectorAll(".orientation-button");
    const verticalButton = document.getElementById("vertical-button");
    const horizontalButton = document.getElementById("horizontal-button");
    function toggleOrientation() {
        if (isVertical === true) {
            isVertical = false;
            verticalButton.classList.add("hidden");
            horizontalButton.classList.remove("hidden");
        } else {
            isVertical = true;
            verticalButton.classList.remove("hidden");
            horizontalButton.classList.add("hidden");
        }
    }
    orientationButtons.forEach(function(button) {
        // First, remove the old event listener (if it exists)
        button.removeEventListener('click', toggleOrientation);
        // Then, add the event listener back
        button.addEventListener('click', toggleOrientation);
    });
    return isVertical;
}

module.exports = {
    initializePlaceShips,
    addOrientationClickEvent
}