const messageBox = document.getElementById("message-box");
const submitButton = document.getElementById("submit-button");
const horizontalButton = document.getElementById("horizontal-button");
const modeSelectContainer = document.getElementById("mode-select-container");
const mainContainer = document.getElementById("main-container");

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
    console.log("Ship placement screen dynamic html updated");
}

function updateMessageBox (message) {
    messageBox.innerHTML = message;
    console.log("Message box updated.");
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
    let verticalSize = playerOne.gameboardState.verticalSize; 
    let horizontalSize = playerOne.gameboardState.horizontalSize;
    console.log("Beginning cell highlighting...");
    highlightedArray.length = 0;
    toggleSubmitButtonOn();
    if (isVertical) {
        for (let i = cellNumber; i < (cellNumber + currentShipSize * verticalSize); i += verticalSize) {
            if (i < 100 && (i % verticalSize) < (cellNumber % verticalSize + currentShipSize)) {
                pushAndHighlight(i, highlightedArray);
            }
        }
    } else {
        for (let i = cellNumber; i < (cellNumber + currentShipSize); i++) {
            if (i < 100 && (i % horizontalSize) >= (cellNumber % horizontalSize)) {
                pushAndHighlight(i, highlightedArray);
            }
        }
    }
    console.log(`Cell highlighting complete. Highlight Array = ${highlightedArray}`);

    return {
        cellSelected,
        highlightedArray
    }
}

function pushAndHighlight(i, highlightedArray, ) {
    let cellToHighlight = document.querySelector(`[data-cell-number="${i}"]`);
    highlightedArray.push(i);
    console.log(`${i} pushed to the array`)
    cellToHighlight.classList.remove("bg-primary");
    cellToHighlight.classList.add("bg-accent");
}

function removeHighlightedSelections(highlightedArray) {
    for (let i = 0; i < highlightedArray.length; i++) {
        let cellToRemoveHighlight = document.querySelector(`[data-cell-number="${highlightedArray[i]}"]`);
        cellToRemoveHighlight.classList.remove("bg-accent");
        cellToRemoveHighlight.classList.add("bg-primary");
    }
    return highlightedArray;
}

function updateHighlightedFromSelectedToRegistered(highlightedArray) {
    for (let i = 0; i < highlightedArray.length; i++) {
        let cellToRemoveHighlight = document.querySelector(`[data-cell-number="${highlightedArray[i]}"]`);
        cellToRemoveHighlight.classList.remove("bg-primary");
        cellToRemoveHighlight.classList.add("bg-secondary");
        console.log(`Color updated to registerd on cell # ${highlightedArray[i]}`);
    }
    return highlightedArray;
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
};
