const { registerShipModule } = require("./registerShipModule");

const winStateModule = (function() {
    function arePlayerOneShipsSunk(appContext) {
        if (appContext.playerOne.checkIfPlayerShipsSunk()) {
            return true;
        } else {
            return false;
        }
    }
    
    function arePlayerComputerShipsSunk(appContext) {
        if (appContext.playerComputer.checkIfPlayerShipsSunk()) {
            return true;
        } else {
            return false;
        }
    }
    
    function checkBothPlayersIfAllShipsSunk(appContext) {
        if (arePlayerComputerShipsSunk (appContext)) {
            registerShipModule.showAlert('Congratulations!!! You have bested the computer and defeated all their ships.');
        } 
        if (arePlayerOneShipsSunk(appContext)) {
            registerShipModule.showAlert('Tough day! You were defeated this time.');
        }
    }

    return {
        checkBothPlayersIfAllShipsSunk
    }
})();

module.exports = {
    winStateModule
}

