const { highlightBattleModeModule } = require("./highlightBattleMode");
const { initializePlaceShipsModule } = require("./initializePlaceShipsModule");


function initializeBattleMode (appContext) {
    console.log("Initializing BattleMode...");
    hideRandomShipPlacementButton(appContext);
    hideOrientationButton(appContext);
    showPlayerComputerBattlegrid(appContext);
    showBattlegridLabels(appContext);
    initializePlaceShipsModule.updateMessageBox(appContext, `Begin your attack!`);
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
    console.log("Event listeners added");
}

let attackEventListener = function (appContext) {
    return function (event) {
        let cellNumber = event.target.getAttribute('data-cellNumber');
        console.log(`Cell Number: ${cellNumber}`);
        let cell = (appContext.playerComputer.gameboardState.gameboard[cellNumber]);
        console.log(`Cell: ${cell}`);
        let cellShipName = cell.name;
        console.log(`cellShipName: ${cellShipName}`);
        appContext.playerComputer.receiveAttack(event.target, appContext.playerComputer);
        console.log(`Attack registered on playerComputer @ ${event.target.getAttribute('data-cellNumber')}`);
        console.log(appContext.playerComputer);
        removeAttackEventListeners(event.target);
        if (cell.isHit) {
            highlightBattleModeModule.highlightHit(event.target);
            if (appContext.playerComputer.ships[cellShipName].isSunk()) {
                highlightBattleModeModule.highlightSunk(appContext.playerComputer.ships[cellShipName].coordinates);
            }
        }
    }
};

function removeAttackEventListeners(cell) {
    cell.removeEventListener('click', cell.attackEventListener);
    console.log("Event listener removed");
}





module.exports = {
    initializeBattleMode
}