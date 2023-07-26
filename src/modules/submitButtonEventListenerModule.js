const { registerShipModule } = require("./registerShipModule");

const submitButtonEventListenerModule = (function () {

    function toggleSubmitButtonOff (appContext) {
        appContext.appElements.submitButton.classList.add("hidden");
    }
    
    function generateSubmitButtonEventListener(resolve, appContext, player) {
        return async function() {
            let placementSuccessful = await registerShipModule.registerPlaceShipForHumanPlayers(appContext, player);
            if (placementSuccessful) {
                toggleSubmitButtonOff(appContext);
                resolve();
            } else {
                console.log('Placement was unsuccessful, trying again');
                toggleSubmitButtonOff(appContext);            
            }
        };
    }
    
    function removeOldSubmitButtonListener(appContext) {
        if (appContext.submitButtonListener) {
            appContext.appElements.submitButton.removeEventListener('click', appContext.submitButtonListener);
        }
    }
    
    function processNewSubmitButtonListener(resolve, appContext, player) {
        appContext.submitButtonListener = generateSubmitButtonEventListener(resolve, appContext, player);
        appContext.appElements.submitButton.addEventListener('click', appContext.submitButtonListener);
    }
    
    function addSubmitButtonEventListener(appContext, player) {
        return new Promise((resolve) => {
            removeOldSubmitButtonListener(appContext);
            processNewSubmitButtonListener(resolve, appContext, player);
        });
    }

    return {
        addSubmitButtonEventListener,
        toggleSubmitButtonOff
    }
})();

module.exports = {
    submitButtonEventListenerModule
}