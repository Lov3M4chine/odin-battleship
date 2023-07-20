const highlightShipPlacementModule = (function() { 

    const highlightEventListenerModule = (function () {

        function generateHighlightShipPlacementEventListener(appContext) { 
            console.log(`generateHighlightShipPlacementEventListener appContext: ${appContext}`)
 
            return function(event) {
                highlightModule.removeHighlightedSelections(appContext);
                console.log("Previous highlighted selections removed.")
            
                highlightModule.highlightShipPlacement(event.target, appContext);
                console.log("...current selection highlighted");
        
            };
        }
    
        function removeOldHighlightListener(cell, appContext) {
            console.log(`removeOldHighlightListener appContext: ${appContext}`)
            if (appContext.highlightListeners[cell.id]) {
                cell.removeEventListener('click', appContext.highlightListeners[cell.id]);
            }
        }
    
        function processNewHighlightListener(cell, appContext) {
            console.log(`processNewHighlightListener appContext: ${appContext}`)

            const listener = generateHighlightShipPlacementEventListener(appContext);
            

            appContext.highlightListeners[cell.id] = listener;
            cell.addEventListener('click', listener);
        }
        
        function addHighlightShipEventListener(appContext) {
            console.log(`addHighlightShipEventListener appContext: ${appContext}`)
            const playerOneCells = document.querySelectorAll(".playerone-cell");
        
            playerOneCells.forEach((cell) => {
                removeOldHighlightListener(cell, appContext);
                processNewHighlightListener(cell, appContext);
            });
        
            console.log("highlightShip Event Listener attached to all cells");
        }
        return {
            addHighlightShipEventListener
        }
    })();

    const highlightModule =  (function() {
        const submitButton = document.getElementById("submit-button");

        function toggleSubmitButtonOn () {
            submitButton.classList.remove("hidden");
        }

        function highlightShipPlacement (targetedCell, appContext) {
            let cellNumber = Number(targetedCell.dataset.cellNumber);
            appContext.cellSelected = cellNumber;
            let verticalSize = appContext.playerOne.gameboardState.verticalSize; 
            let horizontalSize = appContext.playerOne.gameboardState.horizontalSize;

            console.log("Beginning cell highlighting...");
            appContext.highlightedArray.length = 0;
            toggleSubmitButtonOn();
            checkPlacementModule.checkIsPlacementValid(appContext);

            if (appContext.orientation.isVertical) {
                if (appContext.isPlacementValid) {
                    for (let i = cellNumber; i < (cellNumber + appContext.currentShipSize * verticalSize); i += verticalSize) {
                        if (i < 100 && (i % verticalSize) < (cellNumber % verticalSize + appContext.currentShipSize)) {
                            pushAndHighlight(i, appContext);
                        } else {
                            if (i >= 0 && i < 100) {
                                break;
                                
                            }
                        }
                    }
                } else {
                    for (let i = cellNumber; i < (cellNumber + appContext.currentShipSize * verticalSize); i += verticalSize) {
                        if (i < 100 && (i % verticalSize) < (cellNumber % verticalSize + appContext.currentShipSize)) {
                            pushAndHighlightSelectionAsInvalid(i, appContext);
                        }
                    }
                }
            } else {
                if (appContext.isPlacementValid) {
                    for (let i = cellNumber; i < (cellNumber + appContext.currentShipSize); i++) {
                        if (i < 100 && (i % horizontalSize) >= (cellNumber % horizontalSize)) {
                            pushAndHighlight(i,appContext);
                        } else {
                            if (i >= 0 && i < 100) {
                                break;
                            }
                        }
                    }
                } else {
                    for (let i = cellNumber; i < (cellNumber + appContext.currentShipSize); i++) {
                        if (i < 100 && (i % horizontalSize) >= (cellNumber % horizontalSize)) {
                            pushAndHighlightSelectionAsInvalid(i, appContext);
                        }
                    }
                }
            }

            console.log(`Cell highlighting complete. Highlight Array = ${appContext.highlightedArray}`);

        }
        
        function pushAndHighlight(i, appContext) {
            let cellToHighlight = document.querySelector(`[data-cell-number="${i}"]`);
            appContext.highlightedArray.push(i);
            console.log(`${i} pushed to the array`)
            highlightSelected(cellToHighlight);
        }

        function pushAndHighlightSelectionAsInvalid (i, appContext) {
            let cellToHighlightInvalid = document.querySelector(`[data-cell-number="${i}"]`);
            appContext.highlightedArray.push(i);
            console.log(`${i} pushed to the array`)
            highlightInvalid(cellToHighlightInvalid);
        }
        
        function removeHighlightedSelections(appContext) {
            for (let i = 0; i < appContext.highlightedArray.length; i++) {
                let cellToRemoveHighlight = document.querySelector(`[data-cell-number="${appContext.highlightedArray[i]}"]`);
                highlightRemove(cellToRemoveHighlight)
            }
        }
        
        function updateHighlightedFromSelectedToRegistered(appContext) {
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
    
        function isCellBeyondVerticalSize(cell, verticalSize, appContext) {
            if ((cell % verticalSize) > (appContext.cellSelected % verticalSize + appContext.currentShipSize)) {
                return true;
            }
        }
    
        function isCellBeyondHorizontalSize(cell, horizontalSize, appContext) {
            if((cell % horizontalSize) < (appContext.cellSelected % horizontalSize)) {
                return true
            }
        }
    
        function isCellOccupied(cell, appContext) {
            if (appContext.playerOne.gameboardState.gameboard[cell].name) {
                return true;
            }
        }
    
        function loopAndCheckVerticalSelection(verticalSize, appContext) {
            let verticalSelectionRange = appContext.cellSelected + appContext.currentShipSize * verticalSize;
            for (let i = appContext.cellSelected; i < verticalSelectionRange; i+=verticalSize) {
                if (isCellOutOfBounds(i) || isCellBeyondVerticalSize(i, verticalSize, appContext) || isCellOccupied(i, appContext)) {
                    appContext.isPlacementValid = false;
                }
            }
        }
        
        function loopAndCheckHorizontalSelection(horizontalSize, appContext) {
            let horizontalSelectionRange = appContext.cellSelected + appContext.currentShipSize;
            for (let i = appContext.cellSelected; i < horizontalSelectionRange; i++) {
                if (isCellOutOfBounds(i) || isCellBeyondHorizontalSize(i, horizontalSize, appContext) || isCellOccupied(i,appContext)) {
                    appContext.isPlacementValid = false;
                }
            }
        }
    
        function checkIsPlacementValid (appContext) {
            let verticalSize = appContext.playerOne.gameboardState.verticalSize; 
            let horizontalSize = appContext.playerOne.gameboardState.horizontalSize;
            appContext.isPlacementValid = true;

            if (appContext.orientation.isVertical) {
                loopAndCheckVerticalSelection(verticalSize, appContext);
            } else {
                loopAndCheckHorizontalSelection(horizontalSize, appContext);
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

module.exports = {
    highlightShipPlacementModule
}