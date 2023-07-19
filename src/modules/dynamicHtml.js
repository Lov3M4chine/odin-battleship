const messageBox = document.getElementById("message-box");
const submitButton = document.getElementById("submit-button");
const horizontalButton = document.getElementById("horizontal-button");
const verticalButton = document.getElementById("vertical-button");
const modeSelectContainer = document.getElementById("mode-select-container");
const mainContainer = document.getElementById("main-container");
let highlightedArray = [];

function createBattlegridForPlayerOne (horizontalSize, verticalSize) {
    const playerOneBattlegridContainer = document.createElement('div');
    playerOneBattlegridContainer.id = 'playerone-battlegrid-container';
  
    const playerOneBattlegrid = document.createElement('div');
    playerOneBattlegrid.id = 'playerone-battlegrid';
    playerOneBattlegrid.className = 'grid grid-rows-[repeat(10,_minmax(0,_1fr))] grid-cols-10';

    for (let i = 0; i < (horizontalSize * verticalSize); i++) {
        let playerOneCell = null;

        playerOneCell = document.createElement('button');
        playerOneCell.id = `playerone-cell-${i}`;
        playerOneCell.className = 'btn bg-primary playerone-cell';
        playerOneCell.title = `cell ${i}`;
        playerOneCell.setAttribute('data-cell-number', i);
        playerOneCell.setAttribute('data-is-highlighted', false);

        playerOneBattlegrid.appendChild(playerOneCell);
    }

    playerOneBattlegridContainer.appendChild(playerOneBattlegrid);
    mainContainer.appendChild(playerOneBattlegridContainer);
  
}

function createBattlegridForPlayerTwo (horizontalSize, verticalSize) {
    const playerTwoBattlegridContainer = document.createElement('div');
    playerTwoBattlegridContainer.id = 'playerTwo-battlegrid-container';
  
    const playerTwoBattlegrid = document.createElement('div');
    playerTwoBattlegrid.id = 'playerTwo-battlegrid';
    playerTwoBattlegrid.className = 'grid grid-rows-[repeat(10,_minmax(0,_1fr))] grid-cols-10';

    for (let i = 0; i < (horizontalSize * verticalSize); i++) {
        let playerTwoCell = null;

        playerTwoCell = document.createElement('button');
        playerTwoCell.id = `playerTwo-cell-${i}`;
        playerTwoCell.className = 'btn bg-primary playertwo-cell hidden';
        playerTwoCell.title = `cell ${i}`;
        playerTwoCell.setAttribute('data-cellNumber', i);

        playerTwoBattlegrid.appendChild(playerTwoCell);
    }

    playerTwoBattlegridContainer.appendChild(playerTwoBattlegrid);
    mainContainer.appendChild(playerTwoBattlegridContainer);
}

function hideModeSelectContainer () {
    modeSelectContainer.classList.add("hidden");
}

function initializePlaceShipsDynamicHTML () {
    messageBox.classList.remove("hidden");
    horizontalButton.classList.remove("hidden");
    toggleSubmitButtonOff();
}

function updateMessageBox (message) {
    messageBox.innerHTML = message;
}

function toggleSubmitButtonOn () {
    submitButton.classList.remove("hidden");
}

function toggleSubmitButtonOff () {
    submitButton.classList.add("hidden");
}

function highlightShipPlacement (cell, playerOne, isVertical, currentShipSize, highlightedArray) {
    let cellNumber = Number(cell.dataset.cellNumber);
    let cellSelected = cellNumber;
    toggleSubmitButtonOn();
    console.log("Beginning cell highlighting...")
    highlightedArray = [];
    console.log("Highlighted array reset from highlightShipPlacement")
    if (isVertical) {
        for (let i = cellNumber; i < (cellNumber + (currentShipSize * playerOne.gameboardState.horizontalSize)); i+playerOne.gameboardState.horizontalSize) {
            let cellToHighlight = document.querySelector(`[data-cell-number="${i}"]`);
            console.log(`Cell to highlight = ${i}`)
            highlightedArray.push(i);
            console.log(`Cell pushed to highlighted array. Highlighted Array: ${highlightedArray}`);
            cellToHighlight.classList.remove("bg-primary");
            cellToHighlight.classList.add("bg-accent");
            console.log("Cell highlighted")
        }
    } else {
        for (let i = cellNumber; i < (cellNumber + currentShipSize); i+=1) {
            let cellToHighlight = document.querySelector(`[data-cell-number="${i}"]`);
            console.log(`Cell to highlight = ${i}`)
            highlightedArray.push(i);
            console.log(`Cell pushed to highlighted array. Highlighted Array: ${highlightedArray}`);
            cellToHighlight.classList.remove("bg-primary");
            cellToHighlight.classList.add("bg-accent");
            console.log("Cell highlighted")
        }
    }

    return {
        cellSelected,
        highlightedArray
    }
}

function removeHighlightedSelections(highlightedArray) {
    console.log(`removeHighlightedSelections array: ${highlightedArray}`)
    for (let i = 0; i < highlightedArray.length; i++) {
        let cellToRemoveHighlight = document.querySelector(`[data-cell-number="${highlightedArray[i]}"]`);
        cellToRemoveHighlight.classList.remove("bg-accent");
        cellToRemoveHighlight.classList.add("bg-primary");
    }
    return highlightedArray;
}

function updateHighlightedFromSelectedToRegistered(highlightedArray) {
    console.log(`updateHighlightedFromSelectedToRegistered array: ${highlightedArray}`)
    for (let i = 0; i < highlightedArray.length; i++) {
        let cellToRemoveHighlight = document.querySelector(`[data-cell-number="${highlightedArray[i]}"]`);
        cellToRemoveHighlight.classList.remove("bg-primary");
        cellToRemoveHighlight.classList.add("bg-secondary");
        console.log(`Color updated to registerd on cell # ${highlightedArray[i]}`);
    }
    return highlightedArray;
}

function toggleOrientation(orientation) {
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

module.exports = { 
    createBattlegridForPlayerOne,
    createBattlegridForPlayerTwo,
    hideModeSelectContainer,
    initializePlaceShipsDynamicHTML,
    updateMessageBox,
    toggleSubmitButtonOn,
    toggleSubmitButtonOff,
    highlightShipPlacement,
    removeHighlightedSelections,
    updateHighlightedFromSelectedToRegistered,
    toggleOrientation
};
