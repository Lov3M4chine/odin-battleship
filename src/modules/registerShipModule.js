const { highlightShipPlacementModule } = require("./highlightShipPlacementModule");

const registerShipModule = (function () {

    function processRegistrationSuccess(appContext) {
        appContext.playerOne.placeShip(appContext.cellSelected, appContext.orientation.isVertical, appContext.currentShipName, appContext.currentShipSize, appContext);
        highlightShipPlacementModule.highlightModule.updateHighlightedFromSelectedToRegistered(appContext);
        console.log('Placement was successful');
    }
    
    function processRegistrationFailure(appContext) {
        console.log(`registerShipModule appContext: ${appContext}`)
        console.log("Process registration failed. Please try different placement.");
        highlightShipPlacementModule.highlightModule.removeHighlightedSelections(appContext);
        console.log("Previous highlighted selections removed.");
        appContext.highlightedArray.length = 0;
        highlightShipPlacementModule.highlightEventListenerModule.addHighlightShipEventListener(appContext);
    }
    
    function registerPlaceShipForPlayerOne(appContext) {
        return new Promise((resolve) => {
            if (appContext.isPlacementValid) {
                processRegistrationSuccess(appContext);
                resolve(true);
            } else {
                processRegistrationFailure(appContext);
                resolve(false);
            }
        });
    }

    return {
        registerPlaceShipForPlayerOne
    }
})();

module.exports = {
    registerShipModule
}