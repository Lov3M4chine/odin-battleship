const highlightShipPlacementModule = (function() { 

    const highlightEventListenerModule = (function () {

        function generateHighlightShipPlacementEventListener(appContext, player) {  
            return function(event) {
                highlightModule.removeHighlightedSelections(appContext);
                highlightModule.highlightShipPlacement(event.target, appContext, player);
        
            };
        }
    
        function removeOldHighlightListener(cell, appContext) {
            if (appContext.highlightListeners[cell.id]) {
                cell.removeEventListener('click', appContext.highlightListeners[cell.id]);
            }
        }
    
        function processNewHighlightListener(cell, appContext, player) {
            const listener = generateHighlightShipPlacementEventListener(appContext, player);
            appContext.highlightListeners[cell.id] = listener;
            cell.addEventListener('click', listener);
        }
        
        function addHighlightShipEventListener(appContext, player) {
            const playerOneCells = document.querySelectorAll(".playerone-cell");
            playerOneCells.forEach((cell) => {
                removeOldHighlightListener(cell, appContext);
                processNewHighlightListener(cell, appContext, player);
            });
        }
        return {
            addHighlightShipEventListener
        }
    })();

    const highlightModule =  (function() {

        function toggleSubmitButtonOn (appContext) {
            appContext.appElements.submitButton.classList.remove("hidden");
        }

        function highlightShipPlacement (targetedCell, appContext, player) {
            let cellNumber = Number(targetedCell.dataset.cellNumber);
            appContext.cellSelected = cellNumber;

            console.log("Beginning cell highlighting...");
            appContext.highlightedArray.length = 0;
            toggleSubmitButtonOn(appContext);
            checkPlacementModule.checkIsPlacementValid(appContext, player);

            if (appContext.orientation.isVertical) {
                if (appContext.isPlacementValid) {
                    for (let i = cellNumber; i < (cellNumber + appContext.currentShipSize * appContext.verticalSize); i += appContext.verticalSize) {
                        if (i < (appContext.horizontalSize * appContext.verticalSize) && (i % appContext.verticalSize) < (cellNumber % appContext.verticalSize + appContext.currentShipSize)) {
                            pushAndHighlight(i, appContext);
                        } else {
                            if (i >= 0 && i < (appContext.horizontalSize * appContext.verticalSize)) {
                                break;
                                
                            }
                        }
                    }
                } else {
                    for (let i = cellNumber; i < (cellNumber + appContext.currentShipSize * appContext.verticalSize); i += appContext.verticalSize) {
                        if (i < (appContext.horizontalSize * appContext.verticalSize) && (i % appContext.verticalSize) < (cellNumber % appContext.verticalSize + appContext.currentShipSize)) {
                            pushAndHighlightSelectionAsInvalid(i, appContext);
                        }
                    }
                }
            } else {
                if (appContext.isPlacementValid) {
                    for (let i = cellNumber; i < (cellNumber + appContext.currentShipSize); i++) {
                        if (i < (appContext.horizontalSize * appContext.verticalSize) && (i % appContext.horizontalSize) >= (cellNumber % appContext.horizontalSize)) {
                            pushAndHighlight(i,appContext);
                        } else {
                            if (i >= 0 && i < (appContext.horizontalSize * appContext.verticalSize)) {
                                break;
                            }
                        }
                    }
                } else {
                    for (let i = cellNumber; i < (cellNumber + appContext.currentShipSize); i++) {
                        if (i < (appContext.horizontalSize * appContext.verticalSize) && (i % appContext.horizontalSize) >= (cellNumber % appContext.horizontalSize)) {
                            pushAndHighlightSelectionAsInvalid(i, appContext);
                        }
                    }
                }
            }
        }
        
        function pushAndHighlight(i, appContext) {
            let cellToHighlight = document.querySelector(`[data-cell-number="${i}"]`);
            appContext.highlightedArray.push(i);
            highlightSelected(cellToHighlight);
        }

        function pushAndHighlightSelectionAsInvalid (i, appContext) {
            let cellToHighlightInvalid = document.querySelector(`[data-cell-number="${i}"]`);
            appContext.highlightedArray.push(i);
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
        function isCellOutOfBounds(cell, appContext) {
            if (cell >= (appContext.horizontalSize * appContext.verticalSize)) {
                return true;
            }
        }
    
        function isCellBeyondVerticalSize(cell, appContext) {
            if ((cell % appContext.verticalSize) > (appContext.cellSelected % appContext.verticalSize + appContext.currentShipSize)) {
                return true;
            }
        }
    
        function isCellBeyondHorizontalSize(cell, appContext) {
            if((cell % appContext.horizontalSize) < (appContext.cellSelected % appContext.horizontalSize)) {
                return true
            }
        }
    
        function isCellOccupied(cell, player) {
            if (player.gameboardState.gameboard[cell].name) {
                return true;
            }
        }
    
        function loopAndCheckVerticalSelection(appContext, player) {
            let verticalSelectionRange = appContext.cellSelected + appContext.currentShipSize * appContext.verticalSize;
            for (let i = appContext.cellSelected; i < verticalSelectionRange; i+=appContext.verticalSize) {
                if (isCellOutOfBounds(i, appContext) || isCellBeyondVerticalSize(i, appContext) || isCellOccupied(i, player)) {
                    appContext.isPlacementValid = false;
                }
            }
        }
        
        function loopAndCheckHorizontalSelection(appContext, player) {
            let horizontalSelectionRange = appContext.cellSelected + appContext.currentShipSize;
            for (let i = appContext.cellSelected; i < horizontalSelectionRange; i++) {
                if (isCellOutOfBounds(i, appContext) || isCellBeyondHorizontalSize(i, appContext) || isCellOccupied(i, player)) {
                    appContext.isPlacementValid = false;
                }
            }
        }
    
        function checkIsPlacementValid (appContext, player) {
            appContext.isPlacementValid = true;

            if (appContext.orientation.isVertical) {
                loopAndCheckVerticalSelection(appContext, player);
            } else {
                loopAndCheckHorizontalSelection(appContext, player);
            }
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