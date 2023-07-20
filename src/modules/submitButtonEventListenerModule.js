const { registerShipModule } = require("./registerShipModule");

const submitButtonEventListenerModule = (function () {

    

    function toggleSubmitButtonOff (appContext) {
        appContext.appElements.submitButton.classList.add("hidden");
    }
    
    function generateSubmitButtonEventListener(resolve, appContext) {
        return async function() {
            let placementSuccessful = await registerShipModule.registerPlaceShipForPlayerOne(appContext);
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
    
    function processNewSubmitButtonListener(resolve, appContext) {
        appContext.submitButtonListener = generateSubmitButtonEventListener(resolve, appContext);
        appContext.appElements.submitButton.addEventListener('click', appContext.submitButtonListener);
    }
    
    function addSubmitButtonEventListener(appContext) {
        return new Promise((resolve) => {
            removeOldSubmitButtonListener(appContext);
            processNewSubmitButtonListener(resolve, appContext);
            console.log("submitButton Event Listener attached to submit button");
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