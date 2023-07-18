const ShipFactory = require("./ShipFactory.js");

let carrier = ShipFactory("carrier", 5);
let battleship = ShipFactory("battleship", 4);
let destroyer = ShipFactory("destroyer", 3);
let submarine = ShipFactory("submarine", 3);
let patrol = ShipFactory("patrol boat", 2);

let placeShipsList = [carrier, battleship, destroyer, submarine, patrol];
const messageBox = document.getElementById("message-box");
const submitButton = document.getElementById("submit-button");
let horizontalButton = document.getElementById("horizontal-button");

function initializePlaceShips (playerone, isVertical = false) {
    for (let i = 0; i < placeShipsList.length; i++) {
        let currentShip = placeShipsList[i];
        let currentShipName = currentShip.name;
        let currentShipSize = currentShip.size;

        messageBox.innerHTML = `Please place your ${currentShipName}`;
        messageBox.classList.remove("hidden");
        horizontalButton.classList.remove("hidden");
        submitButton.classList.add("hidden");

        addOrientationClickEvent(isVertical);
        addPlaceShipEventListener(playerone, isVertical, currentShipName, currentShipSize)
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

function addSubmitButtonEventListener(cell, playerone, isVertical, currentShipName, currentShipSize) {
    submitButton.addEventListener('click', function(event) {
        registerPlaceShipForPlayerone(cell, playerone, isVertical, currentShipName, currentShipSize);
    })
}

function selectShipPlacement (cell, playerone, isVertical, currentShipName, currentShipSize) {
    let cellNumber = Number(cell.getAttribute('data-cellNumber'));
    let cellSelected = cellNumber;
    if (isVertical) {
        for (let i = cellNumber; i < (cellNumber + (currentShipSize * playerone.gameboardState.horizontalSize)); i+=playerone.gameboardState.horizontalSize) {
            let cellToHighlight = document.querySelector(`[data-cellNumber="${i}"]`);
            console.log(cellToHighlight.data-cellNumber);
            cellToHighlight.classList.add("bg-accent");
            addSubmitButtonEventListener(cell, playerone, isVertical, currentShipName, currentShipSize);
            submitButton.classList.remove("hidden");
        }
    } else {
        for (let i = cellNumber; i < (cellNumber + currentShipSize); i+=1) {
            let cellToHighlight = document.querySelector(`[data-cellNumber="${i}"]`);
            console.log(cellToHighlight.data-cellNumber);
            cellToHighlight.classList.add("bg-accent");
            addSubmitButtonEventListener(cell, playerone, isVertical, currentShipName, currentShipSize);
            submitButton.classList.remove("hidden");
        }
    }
    return cellSelected;
}


function registerPlaceShipForPlayerone (cell, playerone, isVertical, currentShipName, currentShipSize) {
    let cellNumber = cell.getAttribute('data-cellNumber');
    if (checkIsPlacementValid(cellNumber, playerone, isVertical, currentShipSize)) {
        playerone.placeShip(currentShipName, currentShipSize)
        cell.classList.add("bg-secondary");
    }
}

function checkIsPlacementValid (cellNumber, playerone, isVertical, currentShipSize, ) {
    let isPlacementValid = true;
    if (isVertical) {
        if ((cellNumber % playerone.gameboardState.verticalSize) < currentShipSize) {
            isPlacementValid = false;
            alert("Ship placement is outside boundaries. Please choose a difference space.")
            return isPlacementValid;
        }
        for (let i = cellNumber; i < (cellNumber + (size * playerone.gameboardState.horizontalSize)); i+=playerone.gameboardState.horizontalSize) {
            if (playerone.gameboardState.gameboard[cellNumber].name !== null) {
                isPlacementValid = false;
                alert("Ships cannot overlap. Please choose a difference space.")
                return isPlacementValid;
            } 
        }
    } else {
        if ((cellNumber % playerone.gameboardState.horizontalSize) < currentShipSize) {
            isPlacementValid = false;
            alert("Ship placement is outside boundaries. Please choose a difference space.")
            return isPlacementValid;
        }
        for (let i = cellNumber; i < (cellNumber + size); i+=1) {
            if (playerone.gameboardState.gameboard[cellNumber].name !== null) {
                isPlacementValid = false;
                alert("Ships cannot overlap. Please choose a difference space.")
                return isPlacementValid;
            } 
        }
    }
}

function addOrientationClickEvent(isVertical) {
    const orientationButtons = document.querySelectorAll(".orientation-button");
    const verticalButton = document.getElementById("vertical-button");
    const horizontalButton = document.getElementById("horizontal-button");
    orientationButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            if (isVertical) {
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
}