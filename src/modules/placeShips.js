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

function waitForButtonClick(button) {
    return new Promise(resolve => {
        button.addEventListener('click', function onClick() {
            button.removeEventListener('click', onClick);
            resolve();
        });
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
        messageBox.innerHTML = `Please place your ${currentShipName}`;
        addPlaceShipEventListener(playerone, isVertical, currentShipName, currentShipSize);
        submitButton.classList.remove("hidden");
        await waitForButtonClick(submitButton); 
        submitButton.classList.add("hidden");
    }
}


function addPlaceShipEventListener (playerone, isVertical, currentShipName, currentShipSize) {
    const playeroneCells = document.querySelectorAll(".playerone-cell");
    playeroneCells.forEach(function(cell) {
        cell.addEventListener('click', function(event) {
            selectShipPlacement(event.target, playerone, isVertical, currentShipName, currentShipSize);
        })
    })
}

function addSubmitButtonEventListener(cellSelected, playerone, isVertical, currentShipName, currentShipSize) {
    submitButton.addEventListener('click', function(event) {
        registerPlaceShipForPlayerone(cellSelected, playerone, isVertical, currentShipName, currentShipSize);
    })
}

function selectShipPlacement (cell, playerone, isVertical, currentShipName, currentShipSize) {
    let cellNumber = Number(cell.dataset.cellNumber);
    let cellSelected = cellNumber;
    addSubmitButtonEventListener(cellSelected, playerone, isVertical, currentShipName, currentShipSize);
    submitButton.classList.remove("hidden");
    if (isVertical) {
        for (let i = cellNumber; i < (cellNumber + (currentShipSize * playerone.gameboardState.horizontalSize)); i+=playerone.gameboardState.horizontalSize) {
            let cellToHighlight = document.querySelector(`[data-cell-number="${i}"]`);
            cellToHighlight.classList.remove("bg-primary");
            cellToHighlight.classList.add("bg-accent");
            submitButton.classList.remove("hidden");
        }
    } else {
        for (let i = cellNumber; i < (cellNumber + currentShipSize); i+=1) {
            let cellToHighlight = document.querySelector(`[data-cell-number="${i}"]`);
            cellToHighlight.classList.remove("bg-primary");
            cellToHighlight.classList.add("bg-accent");
        }
    }
    return cellSelected;
}




function registerPlaceShipForPlayerone (cellSelected, playerone, isVertical, currentShipName, currentShipSize) {
    console.log(`Is Valid? ${checkIsPlacementValid(cellSelected, playerone, isVertical, currentShipSize)}`)
    if (checkIsPlacementValid(cellSelected, playerone, isVertical, currentShipSize)) {
        playerone.placeShip(cellSelected, isVertical, currentShipName, currentShipSize);
    } else {
        throw new Error("Ship placement is not valid");
    }
}

function checkIsPlacementValid (cellNumber, playerone, isVertical, currentShipSize, ) {
    console.log(`Cell Number: ${cellNumber}`);
    console.log(`playerone: ${playerone}`);
    console.log(`isVertical: ${isVertical}`);
    console.log(`currentShipSize: ${currentShipSize}`);
    let isPlacementValid = true;
    if (isVertical) {
        if (playerone.gameboardState.verticalSize - (cellNumber % playerone.gameboardState.verticalSize) < currentShipSize) {
            console.log(`Vertical Remainder: ${cellNumber % playerone.gameboardState.horizontalSize}`);
            console.log(`Vertical Left Over: ${playerone.gameboardState.horizontalSize - currentShipSize}`);
            isPlacementValid = false;
            throw new Error("Ship placement is outside boundaries. Please choose a difference space.");
        }
        for (let i = cellNumber; i < (cellNumber + (currentShipSize * playerone.gameboardState.horizontalSize)); i+=playerone.gameboardState.horizontalSize) {
            if (playerone.gameboardState.gameboard[cellNumber].name) {
                isPlacementValid = false;
                throw new Error("Ships cannot overlap. Please choose a difference space.")
                return isPlacementValid;
            } 
        }
    } else {
        if ((playerone.gameboardState.horizontalSize - (cellNumber % playerone.gameboardState.horizontalSize)) < currentShipSize) {
            console.log(`Horizontal Remainder: ${cellNumber % playerone.gameboardState.horizontalSize}`);
            console.log(`Horizontal Left Over: ${playerone.gameboardState.horizontalSize - currentShipSize}`);
            isPlacementValid = false;
            throw new Error("Ship placement is outside boundaries. Please choose a difference space.")
            return isPlacementValid;
        }
        for (let i = cellNumber; i < (cellNumber + currentShipSize); i+=1) {
            if (playerone.gameboardState.gameboard[cellNumber].name) {
                isPlacementValid = false;
                throw new Error("Ships cannot overlap. Please choose a difference space.")
                return isPlacementValid;
            } 
        }
    }
    return isPlacementValid;
}

function addOrientationClickEvent(isVertical) {
    const orientationButtons = document.querySelectorAll(".orientation-button");
    const verticalButton = document.getElementById("vertical-button");
    const horizontalButton = document.getElementById("horizontal-button");
    orientationButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            if (isVertical === true) {
                isVertical = false;
                verticalButton.classList.add("hidden");
                horizontalButton.classList.remove("hidden");
            } else {
                isVertical = true;
                verticalButton.classList.remove("hidden");
                horizontalButton.classList.add("hidden");
            }
        })
    })
    return isVertical
}

module.exports = {
    initializePlaceShips,
    addOrientationClickEvent
}