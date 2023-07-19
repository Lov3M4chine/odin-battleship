const { initializePlaceShipsDynamicHTML, updateMessageBox, removeHighlightedSelections, highlightShipPlacement } = require("./dynamicHtml");
const { CreateShips } = require("./factories/CreateShips");
const { addSubmitButtonEventListener } = require("./placeShips");
let highlightedArray = [];

function addOrientationClickEvent(orientation) {
    const orientationButtons = document.querySelectorAll(".orientation-button");
    orientationButtons.forEach(function(button) {
        button.removeEventListener('click', () => toggleOrientation(orientation));
        button.addEventListener('click', () => toggleOrientation(orientation));
    });
}

function addHighlightShipEventListener (playerOne, isVertical, currentShipSize, highlightedArray) {
    console.log(`addHighlightShipEventListener array: ${highlightedArray}`)
    const playerOneCells = document.querySelectorAll(".playerone-cell");
    const highlightShipPlacementEventListener = function(event) {
        removeHighlightedSelections(highlightedArray);
        console.log("Previous highlighted selections removed.")
        highlightShipPlacement(event.target, playerOne, isVertical, currentShipSize, highlightedArray);
        console.log("...current selection highlighted");
        playerOneCells.forEach(function(cell) {
            cell.removeEventListener('click', highlightShipPlacementEventListener);
            console.log("highlightShipPlacementEventListener removed from cell clicked");
        });
    };
    playerOneCells.forEach(function(cell) {
        cell.addEventListener('click', highlightShipPlacementEventListener);
    });
    console.log("highlightShip Event Listener attached to all cells");
    return highlightedArray;
}

async function initializePlaceShips(playerOne) {
    console.log(`initializePlaceShips array: ${highlightedArray}`)
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
        addHighlightShipEventListener(playerOne, orientation.isVertical, currentShipSize, highlightedArray);
        await addSubmitButtonEventListener(addHighlightShipEventListener.cellSelected, playerOne, orientation.isVertical, currentShipName, currentShipSize, highlightedArray);
    }
    
}

module.exports = {
    initializePlaceShips,
}