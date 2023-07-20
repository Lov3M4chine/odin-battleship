const { initializePlaceShipsDynamicHTML, updateMessageBox,toggleSubmitButtonOff, toggleSubmitButtonOn } = require("./dynamicHtml");
const { CreateShips } = require("./factories/CreateShips");

let appContext = {
    orientation: {
        isVertical: false
    },
    highlightedArray: [],
    isPlacementValid: null,
    cellSelected: null,
    highlightListeners: {},
    submitButtonListener: null,
    playerOne: null,
    currentShipName: null,
    currentShipSize: null,
    shipList: []
}


const orientationModule = (function() {
    const horizontalButton = document.getElementById("horizontal-button");
    const verticalButton = document.getElementById("vertical-button");

    function addOrientationClickEvent() {
        const orientationButtons = document.querySelectorAll(".orientation-button");
        orientationButtons.forEach(function(button) {
            button.removeEventListener('click', () => toggleOrientation());
            button.addEventListener('click', () => toggleOrientation());
        });
        console.log("Orientation click event added");
    }

    function toggleOrientation() {
        if (appContext.orientation.isVertical === true) {
            appContext.orientation.isVertical = false;
            verticalButton.classList.add("hidden");
            horizontalButton.classList.remove("hidden");
        } else {
            appContext.orientation.isVertical = true;
            verticalButton.classList.remove("hidden");
            horizontalButton.classList.add("hidden");
        }
    }

    return {
        addOrientationClickEvent,
    }
})();

const highlightShipPlacementModule = (function() { 

    const highlightEventListenerModule = (function () {

        function generateHighlightShipPlacementEventListener() {  
            return function(event) {
                highlightModule.removeHighlightedSelections(appContext.highlightedArray);
                console.log("Previous highlighted selections removed.")
            
                highlightModule.highlightShipPlacement(event.target, appContext.playerOne, appContext.orientation.isVertical, appContext.currentShipSize, appContext.highlightedArray);
                console.log("...current selection highlighted");
        
            };
        }
    
        function removeOldHighlightListener(cell) {
            if (appContext.highlightListeners[cell.id]) {
                cell.removeEventListener('click', appContext.highlightListeners[cell.id]);
            }
        }
    
        function processNewHighlightListener(cell) {
            const listener = generateHighlightShipPlacementEventListener();
        
            appContext.highlightListeners[cell.id] = listener;
            cell.addEventListener('click', listener);
        }
        
        function addHighlightShipEventListener() {
            const playerOneCells = document.querySelectorAll(".playerone-cell");
        
            playerOneCells.forEach((cell) => {
                removeOldHighlightListener(cell);
                processNewHighlightListener(cell);
            });
        
            console.log("highlightShip Event Listener attached to all cells");
        }
        return {
            addHighlightShipEventListener
        }
    })();

    const highlightModule =  (function() {

        function highlightShipPlacement (targetedCell) {
            let cellNumber = Number(targetedCell.dataset.cellNumber);
            appContext.cellSelected = cellNumber;
            let verticalSize = playerOne.gameboardState.verticalSize; 
            let horizontalSize = playerOne.gameboardState.horizontalSize;

            console.log("Beginning cell highlighting...");
            appContext.highlightedArray.length = 0;
            toggleSubmitButtonOn();
            checkPlacementModule.checkIsPlacementValid();

            if (appContext.orientation.isVertical) {
                if (appContext.isPlacementValid) {
                    for (let i = cellNumber; i < (cellNumber + appContext.currentShipSize * verticalSize); i += verticalSize) {
                        if (i < 100 && (i % verticalSize) < (cellNumber % verticalSize + appContext.currentShipSize)) {
                            pushAndHighlight(i);
                        } else {
                            if (i >= 0 && i < 100) {
                                break;
                                
                            }
                        }
                    }
                } else {
                    for (let i = cellNumber; i < (cellNumber + appContext.currentShipSize * verticalSize); i += verticalSize) {
                        if (i < 100 && (i % verticalSize) < (cellNumber % verticalSize + appContext.currentShipSize)) {
                            pushAndHighlightSelectionAsInvalid(i);
                        }
                    }
                }
            } else {
                if (appContext.isPlacementValid) {
                    for (let i = cellNumber; i < (cellNumber + appContext.currentShipSize); i++) {
                        if (i < 100 && (i % horizontalSize) >= (cellNumber % horizontalSize)) {
                            pushAndHighlight(i);
                        } else {
                            if (i >= 0 && i < 100) {
                                break;
                            }
                        }
                    }
                } else {
                    for (let i = cellNumber; i < (cellNumber + appContext.currentShipSize); i++) {
                        if (i < 100 && (i % horizontalSize) >= (cellNumber % horizontalSize)) {
                            pushAndHighlightSelectionAsInvalid(i);
                        }
                    }
                }
            }

            console.log(`Cell highlighting complete. Highlight Array = ${appContext.highlightedArray}`);

        }
        
        function pushAndHighlight(i) {
            let cellToHighlight = document.querySelector(`[data-cell-number="${i}"]`);
            appContext.highlightedArray.push(i);
            console.log(`${i} pushed to the array`)
            highlightSelected(cellToHighlight);
        }

        function pushAndHighlightSelectionAsInvalid (i) {
            let cellToHighlightInvalid = document.querySelector(`[data-cell-number="${i}"]`);
            appContext.highlightedArray.push(i);
            console.log(`${i} pushed to the array`)
            highlightInvalid(cellToHighlightInvalid);
        }
        
        function removeHighlightedSelections() {
            for (let i = 0; i < appContext.highlightedArray.length; i++) {
                let cellToRemoveHighlight = document.querySelector(`[data-cell-number="${appContext.highlightedArray[i]}"]`);
                highlightRemove(cellToRemoveHighlight)
            }
        }
        
        function updateHighlightedFromSelectedToRegistered() {
            for (let i = 0; i < appContext.highlightedArray.length; i++) {
                let cellToRegister = document.querySelector(`[data-cell-number="${appContext.highlightedArray[i]}"]`);
                highlightRegistered(cellToRegister);
            }
        }
        
        function highlightSelected (cellToHighlight) {
            cellToHighlight.classList.remove("bg-primary");
            cellToHighlight.classList.add("bg-accent");
        }
        
        function highlightRegistered (cellToRegister) {
            cellToRegister.classList.remove("bg-primary");
            cellToRegister.classList.add("bg-secondary");
        }
        
        function highlightInvalid (cellToHighlightInvalid) {
            cellToHighlightInvalid.classList.remove("bg-primary");
            cellToHighlightInvalid.classList.add("bg-error");
        }
        
        function highlightRemove (cellToRemoveHighlight) {
            cellToRemoveHighlight.classList.remove("bg-error");
            cellToRemoveHighlight.classList.remove("bg-accent");
            cellToRemoveHighlight.classList.add("bg-primary");
        }

        return {
            highlightShipPlacement,
            removeHighlightedSelections,
            updateHighlightedFromSelectedToRegistered
        }
    })();

    const checkPlacementModule = (function() {
        function isCellOutOfBounds(cell) {
            if (cell >= 100) {
                return true;
            }
        }
    
        function isCellBeyondVerticalSize(cell, verticalSize) {
            if ((cell % verticalSize) > (appContext.cellSelected % verticalSize + appContext.currentShipSize)) {
                return true;
            }
        }
    
        function isCellBeyondHorizontalSize(cell, horizontalSize) {
            if((cell % horizontalSize) < (appContext.cellSelected % horizontalSize)) {
                return true
            }
        }
    
        function isCellOccupied(cell) {
            if (appContext.playerOne.gameboardState.gameboard[cell].name) {
                return true;
            }
        }
    
        function loopAndCheckVerticalSelection(verticalSize) {
            let verticalSelectionRange = appContext.cellSelected + appContext.currentShipSize * verticalSize;
            for (let i = appContext.cellSelected; i < verticalSelectionRange; i+=verticalSize) {
                if (isCellOutOfBounds(i) || isCellBeyondVerticalSize(i,verticalSize) || isCellOccupied(i)) {
                    appContext.isPlacementValid = false;
                }
            }
        }
        
        function loopAndCheckHorizontalSelection(horizontalSize) {
            let horizontalSelectionRange = appContext.cellSelected + appContext.currentShipSize;
            for (let i = appContext.cellSelected; i < horizontalSelectionRange; i++) {
                if (isCellOutOfBounds(i) || isCellBeyondHorizontalSize(i, horizontalSize) || isCellOccupied(i)) {
                    appContext.isPlacementValid = false;
                }
            }
        }
    
        function checkIsPlacementValid () {
            let verticalSize = appContext.playerOne.gameboardState.verticalSize; 
            let horizontalSize = appContext.playerOne.gameboardState.horizontalSize;
            appContext.isPlacementValid = true;

            if (appContext.orientation.isVertical) {
                loopAndCheckVerticalSelection(verticalSize);
            } else {
                loopAndCheckHorizontalSelection(horizontalSize);
            }
            console.log("Check if placement is valid: COMPLETE")
        }

        return {
            checkIsPlacementValid
        }
    })();

    return {
        highlightEventListenerModule,
        highlightModule,
        checkPlacementModule
    }

    
})();

const registerShipModule = (function () {

    function processRegistrationSuccess() {
        appContext.playerOne.placeShip(appContext.cellSelected, appContext.orientation.isVertical, appContext.currentShipName, appContext.currentShipSize);
        highlightShipPlacementModule.highlightModule.updateHighlightedFromSelectedToRegistered(appContext.highlightedArray);
        console.log('Placement was successful');
    }
    
    function processRegistrationFailure() {
        console.log("Process registration failed. Please try different placement.");
        highlightShipPlacementModule.highlightModule.removeHighlightedSelections(appContext.highlightedArray);
        console.log("Previous highlighted selections removed.");
        appContext.highlightedArray.length = 0;
        highlightShipPlacementModule.highlightEventListenerModule.addHighlightShipEventListener();
    }
    
    function registerPlaceShipForPlayerOne() {
        return new Promise((resolve) => {
            highlightShipPlacementModule.checkPlacementModule.checkIsPlacementValid()
            if (appContext.isPlacementValid) {
                processRegistrationSuccess();
                resolve(true);
            } else {
                processRegistrationFailure();
                resolve(false);
            }
        });
    }

    return {
        registerPlaceShipForPlayerOne
    }
})();

const submitButtonEventListenerModule = (function () {
    const submitButton = document.getElementById("submit-button");

    function generateSubmitButtonEventListener(resolve) {
        return async function() {
            let placementSuccessful = await registerShipModule.registerPlaceShipForPlayerOne();
            if (placementSuccessful) {
                toggleSubmitButtonOff();
                resolve();
            } else {
                console.log('Placement was unsuccessful, trying again');
                toggleSubmitButtonOff();            
            }
        };
    }
    
    function removeOldSubmitButtonListener() {
        if (appContext.submitButtonListener) {
            submitButton.removeEventListener('click', appContext.submitButtonListener);
        }
    }
    
    function processNewSubmitButtonListener(resolve) {
        appContext.submitButtonListener = generateSubmitButtonEventListener(resolve);
        submitButton.addEventListener('click', appContext.submitButtonListener);
    }
    
    function addSubmitButtonEventListener() {
        return new Promise((resolve) => {
            removeOldSubmitButtonListener();
            processNewSubmitButtonListener(resolve);
            console.log("submitButton Event Listener attached to submit button");
        });
    }

    return {
        addSubmitButtonEventListener
    }
})();

function createShipList() {
    appContext.shipList = CreateShips();
    console.log("Ship creation: COMPLETE");
    console.log(`Ship List: ${JSON.stringify(appContext.shipList)}`);
}

function contextCreation(playerOne) {
    orientationModule.addOrientationClickEvent();
    initializePlaceShipsDynamicHTML();
    createShipList();
    appContext.playerOne = playerOne;
    console.log(playerOne)
}

async function initializePlaceShips(playerOne) {
    contextCreation(playerOne);

    for (let currentShipKey in appContext.shipList) {
        let { name: currentShipName, size: currentShipSize } = appContext.shipList[currentShipKey];
        appContext.currentShipName = currentShipName;
        appContext.currentShipSize = currentShipSize;
        updateMessageBox(`Please place your ${appContext.currentShipName} (${appContext.currentShipSize} slots)`);
        highlightShipPlacementModule.highlightEventListenerModule.addHighlightShipEventListener();
        await submitButtonEventListenerModule.addSubmitButtonEventListener();
    }
}

module.exports = {
    initializePlaceShips
}