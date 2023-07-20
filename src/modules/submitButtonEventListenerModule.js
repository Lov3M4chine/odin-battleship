const { registerShipModule } = require("./registerShipModule");

const submitButtonEventListenerModule = (function () {

    const submitButton = document.getElementById("submit-button");

    function toggleSubmitButtonOff () {
        submitButton.classList.add("hidden");
    }
    
    function generateSubmitButtonEventListener(resolve, appContext) {
        return async function() {
            let placementSuccessful = await registerShipModule.registerPlaceShipForPlayerOne(appContext);
            if (placementSuccessful) {
                toggleSubmitButtonOff();
                resolve();
            } else {
                console.log('Placement was unsuccessful, trying again');
                toggleSubmitButtonOff();            
            }
        };
    }
    
    function removeOldSubmitButtonListener(appContext) {
        if (appContext.submitButtonListener) {
            submitButton.removeEventListener('click', appContext.submitButtonListener);
        }
    }
    
    function processNewSubmitButtonListener(resolve, appContext) {
        appContext.submitButtonListener = generateSubmitButtonEventListener(resolve, appContext);
        submitButton.addEventListener('click', appContext.submitButtonListener);
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