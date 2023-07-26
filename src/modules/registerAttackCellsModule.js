const { highlightBattleModeModule } = require("./highlightBattleMode");
const { initializePlaceShipsModule } = require("./initializePlaceShipsModule");

const registerAttackCellsModule = (function () {

    function registerCellHit(appContext) {
        appContext.attackCellData.isCellHit = true;
        appContext.attackCellData.wasPreviousAttackHit = true;
        let currentCellNumber = appContext.attackCellData.cellHTML.dataset.cellNumber;
        appContext.playerOne.receiveAttack(currentCellNumber, appContext.playerOne);
        highlightBattleModeModule.highlightHit(appContext.attackCellData.cellHTML);
        initializePlaceShipsModule.updateMessageBox(appContext, `The enemy is attacking your ${appContext.attackCellData.cellShipName}`);
        if (appContext.attackCellData.calculatedCellNumberToAttack) {
            registerCalculatedAttack(appContext);
        } else {
            registerRandomAttack(appContext);
        }
        appContext.attackCellData.isShipTargeted = true;
        updateIsSunk(appContext);
    }

    function registerCalculatedAttack(appContext) {
        appContext.attackCellData.lastCellHit = appContext.attackCellData.calculatedCellNumberToAttack;
        appContext.attackCellData.previousHitCoordinates.push(appContext.attackCellData.calculatedCellNumberToAttack);
        appContext.attackCellData.calculatedCellNumberToAttack = null;
    }

    function registerRandomAttack(appContext) {
        appContext.attackCellData.lastCellHit = appContext.attackCellData.randomCellNumber;
        appContext.attackCellData.previousHitCoordinates.push(appContext.attackCellData.randomCellNumber);
    }

    function updateIsSunk (appContext) {
        if (appContext.playerOne.ships[appContext.attackCellData.cellShipName].isSunk()) {
            appContext.attackCellData.wasPreviousAttackSunk = true;
            initializePlaceShipsModule.updateMessageBox(appContext, `The enemy has sunk your ${appContext.attackCellData.cellShipName}!!!`);
        }
    }

    return {
        registerCellHit
    }
})();

module.exports = {
    registerAttackCellsModule
}