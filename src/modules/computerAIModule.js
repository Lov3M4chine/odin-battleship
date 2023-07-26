const { highlightBattleModeModule } = require("./highlightBattleMode");
const { initializePlaceShipsModule } = require("./initializePlaceShipsModule");
const { highlightShipPlacementModule } = require("./highlightShipPlacementModule");
const { registerAttackCellsModule } = require("./registerAttackCellsModule");
const { randomizeCellSelected } = require("./computerPlayerInitialization");
const { winStateModule } = require("./winStateModule");

const computerAIModule = (function () {

    const processingModule = (function () {

        function processWithTargetedShip(appContext) {
            if (appContext.attackCellData.wasPreviousAttackSunk) {
                processWithPreviousSunk(appContext);
            } else {
                processWithoutPreviousSunk(appContext);
            }
        }
    
        function processWithPreviousSunk(appContext) {
            processPreviousSunkData(appContext);
            appContext.attackCellData.randomCellNumber = randomizeCellSelected(appContext);
            appContext.attackCellData.cellShipName = appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.randomCellNumber].name;
            appContext.attackCellData.cellHTML = document.getElementById(`playerone-cell-${appContext.attackCellData.randomCellNumber}`);
            validateCellsModule.validateRandomCell(appContext)
            processAttack(appContext);
        }
    
        function processPreviousSunkData(appContext) {
            appContext.attackCellData.wasPreviousAttackSunk = false;
            appContext.attackCellData.isShipTargeted = false;
            appContext.attackCellData.previousHitCoordinates = [];
            appContext.attackCellData.calculatedCellNumberToAttack = null;
            appContext.orientation.isVertical = null;
            appContext.attackCellData.lastCellHit = null;
            initializePlaceShipsModule.updateMessageBox(appContext, `It's your turn.`);
        }
    
        function processWithoutPreviousSunk(appContext) {
            if (appContext.attackCellData.previousHitCoordinates.length === 2) {
                processWithTwoCoordinates(appContext);
            } else {
                processWithoutTwoCoordinates(appContext);
            }
        }
    
        function processWithTwoCoordinates(appContext) {
            updateIsVertical(appContext);
            randomizeAttackCell(appContext);
            processAttack(appContext);
        }
    
        function processWithoutTwoCoordinates(appContext) {
            randomizeAttackCell(appContext);
            processAttack(appContext);
        }
    
        function processAttack(appContext) {
            if (appContext.attackCellData.cellShipName) {
                processWithName(appContext);
            } else {
                processWithNoName(appContext);
            }
        }
    
        function processWithName(appContext) {
            if (validateCellsModule.wasCellPreviouslySelected(appContext)) {
                computerAttackTurnInitializationModule.computerPlayerAttack(appContext);
            } else {
                registerAttackCellsModule.registerCellHit(appContext);
            }
        }
    
        function processWithNoName(appContext) {
            if (validateCellsModule.wasCellPreviouslySelected(appContext)) {
                computerAttackTurnInitializationModule.computerPlayerAttack(appContext);
            } else {
                processMiss(appContext);
            }
        }
    
        function processMiss(appContext) {
            if (appContext.attackCellData.calculatedCellNumberToAttack) {
                appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.calculatedCellNumberToAttack].isMiss = true;
                highlightBattleModeModule.highlightMiss(appContext.attackCellData.cellHTML);
            } else {
                appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.randomCellNumber].isMiss = true;
                highlightBattleModeModule.highlightMiss(appContext.attackCellData.cellHTML);
            }    
        }

        function updateIsVertical(appContext) {
            if ((Math.abs(appContext.attackCellData.previousHitCoordinates[0] - appContext.attackCellData.previousHitCoordinates[1]) === appContext.verticalSize)) {
                appContext.orientation.isVertical = true;
            } else {
                appContext.orientation.isVertical = false;
            }
        }

        return {
            processWithTargetedShip,
            processAttack
        }

    })();

    const validateCellsModule = (function () {

        function isCellBeyondHoriztonalSize(appContext) {
            if ((appContext.attackCellData.lastCellHit % appContext.verticalSize) === 1) {
                if ((appContext.attackCellData.calculatedCellNumberToAttack % appContext.verticalSize) === 0) {
                    return true;
                }
            } else if ((appContext.attackCellData.lastCellHit % appContext.verticalSize) === 0) {
                if ((appContext.attackCellData.calculatedCellNumberToAttack % appContext.verticalSize) === 9) {
                    return true;
                }
            }
        }

        function wasCellPreviouslySelected (appContext) {
            if (appContext.attackCellData.isCellHit || appContext.attackCellData.isCellMiss) {
                return true;
            }
        }
    
        function validateAttackCell(appContext) {
            appContext.playerOne.currenShipSize = 0;
            appContext.cellSelected = appContext.attackCellData.calculatedCellNumberToAttack;
            if (highlightShipPlacementModule.checkPlacementModule.isCellOutOfBounds(appContext.attackCellData.calculatedCellNumberToAttack, appContext) || isCellBeyondHoriztonalSize(appContext) || wasCellPreviouslySelected(appContext)) {
                appContext.attackCellData.validateAttackCellCollection.push(appContext.attackCellData.calculatedCellNumberToAttack);
                randomizeAttackCell(appContext);
            } else {
            }
        }

        function validateRandomCell(appContext) {
            if (highlightShipPlacementModule.checkPlacementModule.isCellOutOfBounds(appContext.attackCellData.randomCellNumber, appContext)) {
                computerAttackTurnInitializationModule.computerPlayerAttack(appContext);
            } else if (wasCellPreviouslySelected(appContext)) {
                computerAttackTurnInitializationModule.computerPlayerAttack(appContext);
            } else {
            }
        }
    
        return {
            validateAttackCell,
            validateRandomCell,
            wasCellPreviouslySelected
        }
    })();

 

    return {
        processingModule,
        validateCellsModule,
    }
})()

const computerAttackTurnInitializationModule = (function() {

    function computerPlayerAttack(appContext) {
        if (appContext.attackCellData.isShipTargeted) {
            computerAIModule.processingModule.processWithTargetedShip(appContext);
        } else {
            appContext.orientation.isVertical = null;
            appContext.attackCellData.randomCellNumber = randomizeCellSelected(appContext);
            appContext.attackCellData.cellShipName = appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.randomCellNumber].name;
            appContext.attackCellData.cellHTML = document.getElementById(`playerone-cell-${appContext.attackCellData.randomCellNumber}`);
            appContext.attackCellData.isCellHit = appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.randomCellNumber].isHit;
            appContext.attackCellData.isCellMiss = appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.randomCellNumber].isMiss;
            computerAIModule.validateCellsModule.validateRandomCell(appContext)
            computerAIModule.processingModule.processAttack(appContext);
        }
    }

    function computerPlayerAttackTurnInitialization(appContext) {
        appContext.attackCellData.calculatedCellNumberToAttack = null;
        computerPlayerAttack(appContext);
        winStateModule.checkBothPlayersIfAllShipsSunk(appContext);
    }

    return {
        computerPlayerAttack,
        computerPlayerAttackTurnInitialization
    }
})();

function calculateRandomPossibleCells(appContext) {
    let smallestCoordinate = Math.min(...appContext.attackCellData.previousHitCoordinates);
    let largestCoordinate = Math.max(...appContext.attackCellData.previousHitCoordinates);
    let randomPossibleCellNumberSmall;
    let randomPossibleCellNumberLarge;
    let randomizeTheFourNumbers = false;

    if (appContext.orientation.isVertical === true) {
        randomPossibleCellNumberSmall = smallestCoordinate - appContext.verticalSize;
        randomPossibleCellNumberLarge = largestCoordinate + appContext.verticalSize;
    } else if (appContext.orientation.isVertical === false) {
        randomPossibleCellNumberSmall = smallestCoordinate - 1;
        randomPossibleCellNumberLarge = largestCoordinate + 1;
    } else if (appContext.orientation.isVertical === null) {
        randomizeTheFourNumbers = true;
    }

    return {
        randomPossibleCellNumberSmall,
        randomPossibleCellNumberLarge,
        randomizeTheFourNumbers
    }
}

function randomizeAttackCell(appContext) {

    let calculatedCells = calculateRandomPossibleCells(appContext);
    let randomValue = Math.random();
    let numbers = []

    if (calculatedCells.randomizeTheFourNumbers) {
        if (appContext.orientation.isVertical) {
            numbers = [
                (appContext.attackCellData.lastCellHit + appContext.verticalSize),
                (appContext.attackCellData.lastCellHit - appContext.verticalSize)
            ];
            if (compareValidationCollection(appContext, numbers)) {
                appContext.orientation.isVertical = false;
            }
        } else if (appContext.orientation.isVertical === false) {
            numbers = [
                (appContext.attackCellData.lastCellHit + 1),
                (appContext.attackCellData.lastCellHit - 1),
            ];
            if (compareValidationCollection(appContext, numbers)) {
                appContext.orientation.isVertical = true;
            }
        } else {
            numbers = [
                (appContext.attackCellData.lastCellHit + 1),
                (appContext.attackCellData.lastCellHit - 1),
                (appContext.attackCellData.lastCellHit + appContext.verticalSize),
                (appContext.attackCellData.lastCellHit - appContext.verticalSize)
              ];
        }
          const randomIndex = getRandomInteger(0, numbers.length - 1);
          const randomNumber = numbers[randomIndex];
          appContext.attackCellData.calculatedCellNumberToAttack = randomNumber;
            let calculatedCellNumber = appContext.attackCellData.calculatedCellNumberToAttack;
            if ((calculatedCellNumber >= 0) && (calculatedCellNumber < (appContext.horizontalSize * appContext.verticalSize)) && (!compareValidationCollection(appContext, numbers))) {
                appContext.attackCellData.isCellHit = appContext.playerOne.gameboardState.gameboard[calculatedCellNumber].isHit;
                appContext.attackCellData.isCellMiss = appContext.playerOne.gameboardState.gameboard[calculatedCellNumber].isMiss;
                appContext.attackCellData.cellShipName = appContext.playerOne.gameboardState.gameboard[calculatedCellNumber].name;
                appContext.attackCellData.cellHTML = document.getElementById(`playerone-cell-${calculatedCellNumber}`);
                computerAIModule.validateCellsModule.validateAttackCell(appContext);
            } else {
                appContext.attackCellData.validateAttackCellCollection.push(appContext.attackCellData.calculatedCellNumberToAttack);
                randomizeAttackCell(appContext);
            }
    } else {
        if (randomValue < 0.5) {
            appContext.attackCellData.calculatedCellNumberToAttack = calculatedCells.randomPossibleCellNumberSmall;
            let calculatedCellNumber = appContext.attackCellData.calculatedCellNumberToAttack;
            if ((calculatedCellNumber >= 0) && (calculatedCellNumber < (appContext.horizontalSize * appContext.verticalSize)) && (!compareValidationCollection(appContext, numbers))) {
                appContext.attackCellData.isCellHit = appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.calculatedCellNumberToAttack].isHit;
                appContext.attackCellData.isCellMiss = appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.calculatedCellNumberToAttack].isMiss;
                appContext.attackCellData.cellShipName = appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.calculatedCellNumberToAttack].name;
                appContext.attackCellData.cellHTML = document.getElementById(`playerone-cell-${appContext.attackCellData.calculatedCellNumberToAttack}`);
                computerAIModule.validateCellsModule.validateAttackCell(appContext);
            } else {
                appContext.attackCellData.validateAttackCellCollection.push(appContext.attackCellData.calculatedCellNumberToAttack);
                randomizeAttackCell(appContext);
            }
        } else {
            appContext.attackCellData.calculatedCellNumberToAttack =  calculatedCells.randomPossibleCellNumberLarge;
            let calculatedCellNumber = appContext.attackCellData.calculatedCellNumberToAttack;
            if ((calculatedCellNumber >= 0) && (calculatedCellNumber < (appContext.horizontalSize * appContext.verticalSize)) && (!compareValidationCollection(appContext, numbers))) {
                appContext.attackCellData.isCellHit = appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.calculatedCellNumberToAttack].isHit;
                appContext.attackCellData.isCellMiss = appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.calculatedCellNumberToAttack].isMiss;
                appContext.attackCellData.cellShipName = appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.calculatedCellNumberToAttack].name;
                appContext.attackCellData.cellHTML = document.getElementById(`playerone-cell-${appContext.attackCellData.calculatedCellNumberToAttack}`);
                computerAIModule.validateCellsModule.validateAttackCell(appContext);
            } else {
                appContext.attackCellData.validateAttackCellCollection.push(appContext.attackCellData.calculatedCellNumberToAttack);
                randomizeAttackCell(appContext);
            }
        }
    }
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function compareValidationCollection(appContext, numbersArr) {
    let collectionArray = appContext.attackCellData.validateAttackCellCollection;
    if (collectionArray.length !== numbersArr.length) return false;
    collectionArray.sort();
    numbersArr.sort();
    for (let i = 0; i < collectionArray.length; i++) {
        if (collectionArray[i] !== numbersArr[i]) return false;
    }
    return true;
}

module.exports = {
    computerAIModule,
    computerAttackTurnInitializationModule
}