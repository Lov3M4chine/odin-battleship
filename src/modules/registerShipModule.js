const { highlightShipPlacementModule } = require("./highlightShipPlacementModule");

const registerShipModule = (function () {
    function showPlaceShipFailureAlert(message) {
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('fixed', 'inset-0', 'flex', 'items-center', 'justify-center', 'z-50', 'bg-black', 'bg-opacity-50');
      
        const alertBox = document.createElement('div');
        alertBox.classList.add('alert', 'alert-error', 'flex', 'p-4', 'bg-white', 'rounded-lg', 'shadow-lg', 'mx-auto', 'max-w-3xl');
        alertDiv.appendChild(alertBox);
      
        const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgElement.classList.add('stroke-current', 'shrink-0', 'h-6', 'w-6');
        svgElement.setAttribute('fill', 'none');
        svgElement.setAttribute('viewBox', '0 0 24 24');
        svgElement.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />';
        alertBox.appendChild(svgElement);
      
        const spanElement = document.createElement('span');
        spanElement.textContent = message;
        alertBox.appendChild(spanElement);
      
        const okButton = document.createElement('button');
        okButton.classList.add('btn', 'btn-primary', 'ml-4');
        okButton.textContent = 'OK';
        alertBox.appendChild(okButton);
      
        okButton.addEventListener('click', () => {
          document.body.removeChild(alertDiv);
        });
      
        document.body.appendChild(alertDiv);
      }

    function processRegistrationSuccessForHumanPlayers(appContext) {
        appContext.playerOne.placeShip(appContext.cellSelected, appContext.orientation.isVertical, appContext.currentShipName, appContext.currentShipSize, appContext);
        highlightShipPlacementModule.highlightModule.updateHighlightedFromSelectedToRegistered(appContext);
        console.log('Placement was successful');
    }
    
    function processRegistrationFailureForHumanPlayers(appContext, player) {
        console.log(`registerShipModule appContext: ${appContext}`)
        console.log("Process registration failed. Please try different placement.");
        highlightShipPlacementModule.highlightModule.removeHighlightedSelections(appContext);
        console.log("Previous highlighted selections removed.");
        appContext.highlightedArray.length = 0;
        highlightShipPlacementModule.highlightEventListenerModule.addHighlightShipEventListener(appContext, player);
        showPlaceShipFailureAlert('That placement is invalid. Please try again!');
    }
    
    function registerPlaceShipForHumanPlayers(appContext, player) {
        return new Promise((resolve) => {
            if (appContext.isPlacementValid) {
                processRegistrationSuccessForHumanPlayers(appContext);
                resolve(true);
            } else {
                processRegistrationFailureForHumanPlayers(appContext, player);
                resolve(false);
            }
        });
    }

    function registerPlaceShipForPlayerComputer(appContext) {
        appContext.playerComputer.placeShip(appContext.cellSelected, appContext.orientation.isVertical, appContext.currentShipName, appContext.currentShipSize, appContext);
    }

    return {
        registerPlaceShipForHumanPlayers,
        registerPlaceShipForPlayerComputer
    }
})();

module.exports = {
    registerShipModule
}