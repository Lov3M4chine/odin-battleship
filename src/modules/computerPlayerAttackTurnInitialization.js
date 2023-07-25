const { randomizeCellSelected } = require("./computerPlayerInitialization");
const { highlightBattleModeModule } = require("./highlightBattleMode");
const { initializePlaceShipsModule } = require("./initializePlaceShipsModule");

const computerAIModule = (function () {

    function computerPlayerAttack(appContext) {
        let cellData = {
            randomCellNumber: randomizeCellSelected(appContext),
            cellNumberToAttack: randomizeCellSelected(appContext),
            isCellHit: false,
            isCellMiss: false,
            cellShipName: null,
            cellHTML: null,
            wasPreviousAttackHit: false,
            wasPreviousAttackSunk: false,
            previousHitCoordinates: [],
        }

        updateCellData (cellData, appContext);
        

            if (cellData.cellShipName) {
                if (cellData.wasPreviousAttackHit) {
                    if (cellData.wasPreviousAttackSunk) {
                        cellData.wasPreviousAttackSunk = false;
                        cellData.wasPreviousAttackHit = false;
                        appContext.previousHitCoordinates = [];
                        if (cellData.isCellHit || cellData.isCellMiss) {
                            computerPlayerAttack(appContext);
                        } else {
                            updateCellData(cellData, appContext);
                            registerCellHit(cellData, appContext);
                            // if (arePlayerOneShipsSunk(appContext)) {

                            // }
                        }
                    }
                    if (appContext.previousHitCoordinates.length === 2) {
                        updateIsVertical(appContext);
                        calculateRandomPossibleCells(cellData, appContext);
                        randomizeAttackCell(calculateRandomPossibleCells.randomPossibleCellNumberSmall, calculateRandomPossibleCells.randomPossibleCellNumberLarge);
                        updateCellData(cellData, appContext);
                        registerCellHit(cellData, appContext);
                    } else {
                        calculateRandomPossibleCells(cellData, appContext)
                        randomizeAttackCell(calculateRandomPossibleCells.randomPossibleCellNumberSmall, calculateRandomPossibleCells.randomPossibleCellNumberLarge);
                        updateCellData(cellData, appContext);
                        registerCellHit(cellData, appContext);
                    }
                } else {
                    updateCellData(cellData, appContext);
                    registerCellHit(cellData, appContext);
                    updateIsSunk(cellData, appContext);
                    // if (arePlayerOneShipsSunk(appContext)) {
                            
                    // }
                }
            } else {
                if (cellData.isCellHit || cellData.isCellMiss) {
                    computerPlayerAttack(appContext);
                } else {
                    updateCellData(cellData, appContext);
                    cellData.isCellMiss = true;
                    cellData.wasPreviousAttackHit = false;
                    highlightBattleModeModule.highlightMiss(cellData.cellHTML);
                }
            }
    }

    function updateCellData (cellData, appContext) {
        cellData.isCellHit = appContext.playerOne.gameboardState.gameboard[cellData.cellNumberToAttack].isHit;
        cellData.isCellMiss = appContext.playerOne.gameboardState.gameboard[cellData.cellNumberToAttack].isMiss;
        cellData.cellShipName = appContext.playerOne.gameboardState.gameboard[cellData.cellNumberToAttack].name;
        cellData.cellHTML = document.getElementById(`playerone-cell-${cellData.cellNumberToAttack}`);
    }

    function arePlayerOneShipsSunk(appContext) {
        if (appContext.playerOne.checkIfAllShipsSunk()) {
            return true;
        } else {
            return false;
        }
    }

    function registerCellHit(cellData, appContext) {
        cellData.isCellHit = true;
        cellData.wasPreviousAttackHit = true;
        cellData.previousHitCoordinates.push(cellData.cellNumberToAttack);
        appContext.playerOne.receiveAttack(cellData.cellHTML, appContext.playerComputer);
        highlightBattleModeModule.highlightHit(cellData.cellHTML);
        initializePlaceShipsModule.updateMessageBox(appContext, `The enemy attacked your ${cellData.cellShipName}`);
    }

    function updateIsVertical(appContext) {
        if ((Math.abs(cellData.previousHitCoordinates[0] - cellData.previousHitCoordinates[0]) === appContext.verticalSize)) {
            appContext.isVertical = true
        } else {
            appContext.isVertical = false;
        }
    }

    function updateIsSunk (cellData, appContext) {
        if (appContext.playerOne.ships[cellData.cellShipName].isSunk) {
            cellData.wasPreviousAttackSunk = true;
            initializePlaceShipsModule.updateMessageBox(appContext, `The enemy has sunk your ${cellData.cellShipName}!!!`);
        }
    }

    function calculateRandomPossibleCells(cellData, appContext) {
        let smallestCoordinate = Math.min(...cellData.previousHitCoordinates);
        let largestCoordinate = Math.max(...cellData.previousHitCoordinates);
        if (appContext.isVertical) {
            let randomPossibleCellNumberSmall = smallestCoordinate - appContext.verticalSize;
            let randomPossibleCellNumberLarge = largestCoordinate + appContext.verticalSize;
        } else {
            let randomPossibleCellNumberSmall = smallestCoordinate - 1;
            let randomPossibleCellNumberLarge = largestCoordinate + 1;
        }
        return {
            randomPossibleCellNumberSmall,
            randomPossibleCellNumberLarge
        }
    }

    function randomizeAttackCell(cellData, randomPossibleCellNumberSmall, randomPossibleCellNumberLarge) {
        var randomValue = Math.random();

        if (randomValue < 0.5) {
            cellData.cellNumberToAttack = randomPossibleCellNumberSmall;
        } else {
            cellData.cellNumberToAttack =  randomPossibleCellNumberLarge;
        }
    }

    return {
        computerPlayerAttack
    }
})();

const computerAttackTurnInitializationModule = (function() {
    function computerPlayerAttackTurnInitialization(appContext) {
        console.log("Computer player turn is starting....");
        initializePlaceShipsModule.updateMessageBox(appContext, `The enemy is attacking`);
        computerAIModule.computerPlayerAttack(appContext);
        console.log("Computer player turn has ended....");
    }

    return {
        computerPlayerAttackTurnInitialization
    }
})();

module.exports = {
    computerAttackTurnInitializationModule
}