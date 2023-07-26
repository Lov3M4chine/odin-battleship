const { computerAttackTurnInitializationModule } = require("./computerAIModule");
const { highlightBattleModeModule } = require("./highlightBattleMode");
const { initializePlaceShipsModule } = require("./initializePlaceShipsModule");
const { winStateModule } = require("./winStateModule");


function initializeBattleMode (appContext) {
    hideRandomShipPlacementButton(appContext);
    hideOrientationButton(appContext);
    showPlayerComputerBattlegrid(appContext);
    showBattlegridLabels(appContext);
    initializePlaceShipsModule.updateMessageBox(appContext, `It's your turn to attack.`);
    addAttackEventListeners(appContext);
}

function showBattlegridLabels(appContext) {
    appContext.appElements.playerOneBattlegridLabel.classList.remove("hidden");
    appContext.appElements.playerComputerBattlegridLabel.classList.remove("hidden");
}

function hideOrientationButton(appContext) {
        appContext.appElements.verticalButton.classList.add("hidden");
        appContext.appElements.horizontalButton.classList.add("hidden");
}

function showPlayerComputerBattlegrid (appContext) {
    appContext.appElements.playerComputerBattlegrid.classList.remove('hidden');
}

function hideRandomShipPlacementButton (appContext) {
    appContext.appElements.chooseForMeButton.classList.add("hidden");
}

function addAttackEventListeners (appContext) {
    const playerComputerCells = document.querySelectorAll(".player-computer-cell");
    playerComputerCells.forEach((cell) => {
        cell.attackEventListener = attackEventListener(appContext, cell);
        cell.addEventListener('click', cell.attackEventListener);
    });
}

let attackEventListener = function (appContext) {
    return function (event) {
        let cellNumber = event.target.getAttribute('data-cellNumber');
        let cell = (appContext.playerComputer.gameboardState.gameboard[cellNumber]);
        let cellShipName = cell.name;

        appContext.playerComputer.receiveAttack(cellNumber, appContext.playerComputer);
        removeAttackEventListeners(event.target);
        winStateModule.checkBothPlayersIfAllShipsSunk(appContext);

        if (cell.isHit) {
            highlightBattleModeModule.highlightHit(event.target);
            if (appContext.playerComputer.ships[cellShipName].isSunk()) {
                initializePlaceShipsModule.updateMessageBox(appContext, `Good job! You sunk their ${cellShipName}`);
                highlightBattleModeModule.highlightSunk(appContext.playerComputer.ships[cellShipName].coordinates);
            }
        } else {
            highlightBattleModeModule.highlightMiss(event.target);
        }
        computerAttackTurnInitializationModule.computerPlayerAttackTurnInitialization(appContext);   
    }
};

function removeAttackEventListeners(cell) {
    cell.removeEventListener('click', cell.attackEventListener);
}





module.exports = {
    initializeBattleMode
}