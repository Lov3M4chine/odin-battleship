const { randomizeCellSelected } = require("./computerPlayerInitialization");
const { highlightBattleModeModule } = require("./highlightBattleMode");
const { initializePlaceShipsModule } = require("./initializePlaceShipsModule");
const { highlightShipPlacementModule } = require("./highlightShipPlacementModule");
const { registerShipModule } = require("./registerShipModule");

const computerAIModule = (function () {

    function processWithTargetedShip(appContext) {
        console.log("Processing as Targeted ship");
        if (appContext.attackCellData.wasPreviousAttackSunk) {
            processWithPreviousSunk(appContext);
        } else {
            processWithoutPreviousSunk(appContext);
        }
    }

    function processWithPreviousSunk(appContext) {
        console.log("The previous attack sunk a ship");
        processPreviousSunkData(appContext);
        appContext.attackCellData.randomCellNumber = randomizeCellSelected(appContext);
        appContext.attackCellData.cellShipName = appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.randomCellNumber].name;
        appContext.attackCellData.cellHTML = document.getElementById(`playerone-cell-${appContext.attackCellData.randomCellNumber}`);
        validateAttackCellModule.validateRandomCell(appContext)
        processAttack(appContext);
    }

    function processPreviousSunkData(appContext) {
        console.log(`Previous Attack Sunk: ${appContext.attackCellData.wasPreviousAttackSunk}`);
        appContext.attackCellData.wasPreviousAttackSunk = false;
        appContext.attackCellData.isShipTargeted = false;
        appContext.attackCellData.previousHitCoordinates = [];
        appContext.attackCellData.calculatedCellNumberToAttack = null;
        appContext.orientation.isVertical = null;
        (console.log("isVertical reset to null"));
        appContext.attackCellData.lastCellHit = null;
        console.log("Previous sunk, hit, and coordinate reset");
        initializePlaceShipsModule.updateMessageBox(appContext, `It's your turn.`);
    }

    function processWithoutPreviousSunk(appContext) {
        console.log("The previous attack did NOT sink a ship.");
        if (appContext.attackCellData.previousHitCoordinates.length === 2) {
            processWithTwoCoordinates(appContext);
        } else {
            processWithoutTwoCoordinates(appContext);
        }
    }

    function processWithTwoCoordinates(appContext) {
        console.log("Processing with Two Coordinates")
        console.log("Calculating if ship is vertical.");
        updateIsVertical(appContext);
        randomizeAttackCell(appContext);
        console.log(`Calculated Attack Cell Number: ${appContext.attackCellData.calculatedCellNumberToAttack}`);
        processAttack(appContext);
    }

    function processWithoutTwoCoordinates(appContext) {
        console.log("Processing without two coordinates");
        console.log("Need to calculate attack based on previous hit");
        randomizeAttackCell(appContext);
        console.log(`Calculated Attack Cell Number: ${appContext.attackCellData.calculatedCellNumberToAttack}`);
        processAttack(appContext);
    }

    function processAttack(appContext) {
        console.log("Processing attack....");
        if (appContext.attackCellData.cellShipName) {
            processWithName(appContext);
        } else {
            processWithNoName(appContext);
        }
        console.log("....attack processed");
    }

    function processWithName(appContext) {
        (console.log("Cell has a ship name."));
        console.log(`Ship Name: ${appContext.attackCellData.cellShipName}`);
        if (wasCellPreviouslySelected(appContext)) {
            (console.log("Cell was already selected, trying again."));
            computerPlayerAttack(appContext);
        } else {
            registerCellHit(appContext);
        }
    }

    function processWithNoName(appContext) {
        console.log("Cell does not have a ship name.");
        console.log(`Ship Name: ${appContext.attackCellData.cellShipName}`);
        if (wasCellPreviouslySelected(appContext)) {
            (console.log("Cell was already selected, trying again."));
            computerPlayerAttack(appContext);
        } else {
            processMiss(appContext);
        }
    }

    function processMiss(appContext) {
        if (appContext.attackCellData.calculatedCellNumberToAttack) {
            console.log("Cell has not been selected previously and is a miss.");
            appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.calculatedCellNumberToAttack].isMiss = true;
            highlightBattleModeModule.highlightMiss(appContext.attackCellData.cellHTML);
        } else {
            console.log("Cell has not been selected previously and is a miss.");
            appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.randomCellNumber].isMiss = true;
            highlightBattleModeModule.highlightMiss(appContext.attackCellData.cellHTML);
        }

    }

    function wasCellPreviouslySelected (appContext) {
        console.log(`Is Cell Hit: ${appContext.attackCellData.isCellHit}`);
        console.log(`Is Cell Miss: ${appContext.attackCellData.isCellMiss}`);
        if (appContext.attackCellData.isCellHit || appContext.attackCellData.isCellMiss) {
            return true;
        }
    }

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

    function registerCellHit(appContext) {
        console.log("Registering cell hit...")
        appContext.attackCellData.isCellHit = true;
        console.log("IsCellHit marked to true");
        appContext.attackCellData.wasPreviousAttackHit = true;
        console.log("PreviousAttackHit marked to true");
        console.log(`HTML: ${appContext.attackCellData.cellHTML}`);
        let currentCellNumber = appContext.attackCellData.cellHTML.dataset.cellNumber;
        console.log(currentCellNumber);
        appContext.playerOne.receiveAttack(currentCellNumber, appContext.playerOne);
        console.log(appContext.attackCellData.cellHTML)
        highlightBattleModeModule.highlightHit(appContext.attackCellData.cellHTML);
        initializePlaceShipsModule.updateMessageBox(appContext, `The enemy is attacking your ${appContext.attackCellData.cellShipName}`);
        if (appContext.attackCellData.calculatedCellNumberToAttack) {
            registerCalculatedAttack(appContext);
        } else {
            registerRandomAttack(appContext);
        }
        appContext.attackCellData.isShipTargeted = true;
        updateIsSunk(appContext);
        console.log("...registration complete");
    }

    function registerCalculatedAttack(appContext) {
        appContext.attackCellData.lastCellHit = appContext.attackCellData.calculatedCellNumberToAttack;
        appContext.attackCellData.previousHitCoordinates.push(appContext.attackCellData.calculatedCellNumberToAttack);
        console.log("Coordinate pushed to array");
        console.log(`Computer successfully hit player @ ${appContext.attackCellData.calculatedCellNumberToAttack}`)
        appContext.attackCellData.calculatedCellNumberToAttack = null;
    }

    function registerRandomAttack(appContext) {
        appContext.attackCellData.lastCellHit = appContext.attackCellData.randomCellNumber;
        appContext.attackCellData.previousHitCoordinates.push(appContext.attackCellData.randomCellNumber);
        console.log("Coordinate pushed to array")
        console.log(`Computer successfully hit player @ ${appContext.attackCellData.randomCellNumber}`);
    }

    function updateIsVertical(appContext) {
        if ((Math.abs(appContext.attackCellData.previousHitCoordinates[0] - appContext.attackCellData.previousHitCoordinates[1]) === appContext.verticalSize)) {
            appContext.orientation.isVertical = true;
            console.log(`Is Vertical set to true`)
        } else {
            appContext.orientation.isVertical = false;
            console.log(`Is Vertical set to false`)
        }
    }

    function updateIsSunk (appContext) {
        const sunk = appContext.playerOne.ships[appContext.attackCellData.cellShipName].isSunk();
        console.log(`SUNK: ${sunk}`)
        if (appContext.playerOne.ships[appContext.attackCellData.cellShipName].isSunk()) {
            appContext.attackCellData.wasPreviousAttackSunk = true;
            console.log("IsSunk marked to True")
            initializePlaceShipsModule.updateMessageBox(appContext, `The enemy has sunk your ${appContext.attackCellData.cellShipName}!!!`);
        }
    }

    const validateAttackCellModule = (function () {

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
    
        function validateAttackCell(appContext) {
            appContext.playerOne.currenShipSize = 0;
            appContext.cellSelected = appContext.attackCellData.calculatedCellNumberToAttack;
            console.log("Validating attackcell...");
            if (highlightShipPlacementModule.checkPlacementModule.isCellOutOfBounds(appContext.attackCellData.calculatedCellNumberToAttack, appContext) || isCellBeyondHoriztonalSize(appContext) || wasCellPreviouslySelected(appContext)) {
                console.log("Cell is not valid, trying again.");
                appContext.attackCellData.validateAttackCellCollection.push(appContext.attackCellData.calculatedCellNumberToAttack);
                randomizeAttackCell(appContext);
            } else {
                console.log("....attackCell validated");
            }
        }

        function validateRandomCell(appContext) {
            console.log("Validating randomCellNumber....");
            if (highlightShipPlacementModule.checkPlacementModule.isCellOutOfBounds(appContext.attackCellData.randomCellNumber, appContext)) {
                console.log("Cell is out of bounds, trying again.");
                computerPlayerAttack(appContext);
            } else if (wasCellPreviouslySelected(appContext)) {
                console.log("Cell was previously selected, trying again.");
                computerPlayerAttack(appContext);
            } else {
                console.log("....randomCellNumber validated");
            }
        }
    
        return {
            validateAttackCell,
            validateRandomCell,
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
            console.log(`randomPossibleCellNumberSmall = ${randomPossibleCellNumberSmall}`)
            console.log(`randomPossibleCellNumberLarge = ${randomPossibleCellNumberLarge}`)
        } else if (appContext.orientation.isVertical === false) {
            randomPossibleCellNumberSmall = smallestCoordinate - 1;
            randomPossibleCellNumberLarge = largestCoordinate + 1;
            console.log(`randomPossibleCellNumberSmall = ${randomPossibleCellNumberSmall}`)
            console.log(`randomPossibleCellNumberLarge = ${randomPossibleCellNumberLarge}`)
        } else if (appContext.orientation.isVertical === null) {
            randomizeTheFourNumbers = true;
            console.log("Four Numbers randomized set to true")
        }

        return {
            randomPossibleCellNumberSmall,
            randomPossibleCellNumberLarge,
            randomizeTheFourNumbers
        }
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

    function randomizeAttackCell(appContext) {
        let calculatedCells = calculateRandomPossibleCells(appContext);
        let randomValue = Math.random();
        let numbers = []

        if (calculatedCells.randomizeTheFourNumbers) {
            console.log(`Last cell hit: ${appContext.attackCellData.lastCellHit}`);
            console.log(`isVertical: ${appContext.orientation.isVertical}`);
            if (appContext.orientation.isVertical) {
                numbers = [
                    (appContext.attackCellData.lastCellHit + appContext.verticalSize),
                    (appContext.attackCellData.lastCellHit - appContext.verticalSize)
                ]
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

              console.log(`Four Numbers: ${numbers}`);
              const randomIndex = getRandomInteger(0, numbers.length - 1);
              const randomNumber = numbers[randomIndex];
              console.log(`Random Number: ${randomNumber}`);
              appContext.attackCellData.calculatedCellNumberToAttack = randomNumber;
                let calculatedCellNumber = appContext.attackCellData.calculatedCellNumberToAttack;
                if ((calculatedCellNumber >= 0) && (calculatedCellNumber < (appContext.horizontalSize * appContext.verticalSize)) && (!compareValidationCollection(appContext, numbers))) {
                    console.log(`calculatedCellNumber:  ${calculatedCellNumber}`);
                    console.log(`gameboard:  ${JSON.stringify(appContext.playerOne.gameboardState.gameboard)}`);
                    console.log(`gameboard @ calculatedCellNumber:  ${JSON.stringify(appContext.playerOne.gameboardState.gameboard[calculatedCellNumber])}`);
                    console.log(`calculatedCellNumber IS HIT:  ${JSON.stringify(appContext.playerOne.gameboardState.gameboard[calculatedCellNumber].isHit)}`);
                    appContext.attackCellData.isCellHit = appContext.playerOne.gameboardState.gameboard[calculatedCellNumber].isHit;
                    appContext.attackCellData.isCellMiss = appContext.playerOne.gameboardState.gameboard[calculatedCellNumber].isMiss;
                    appContext.attackCellData.cellShipName = appContext.playerOne.gameboardState.gameboard[calculatedCellNumber].name;
                    appContext.attackCellData.cellHTML = document.getElementById(`playerone-cell-${calculatedCellNumber}`);
                    console.log("cellData refreshed with calculated cell");
                    validateAttackCellModule.validateAttackCell(appContext);
                } else {
                    console.log("Cell is out of bounds");
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
                    console.log("cellData refreshed with calculated cell");
                    console.log(`Calculated Attack Cell Number: ${appContext.attackCellData.calculatedCellNumberToAttack}`);
                    validateAttackCellModule.validateAttackCell(appContext);
                } else {
                    console.log("Cell is out of bounds");
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
                    console.log("cellData refreshed with calculated cell");
                    console.log(`Calculated Attack Cell Number: ${appContext.attackCellData.calculatedCellNumberToAttack}`);
                    validateAttackCellModule.validateAttackCell(appContext);
                } else {
                    console.log("Cell is out of bounds");
                    appContext.attackCellData.validateAttackCellCollection.push(appContext.attackCellData.calculatedCellNumberToAttack);
                    randomizeAttackCell(appContext);
                }
            }
        }
    }

    function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

    function computerPlayerAttack(appContext) {
        if (appContext.attackCellData.isShipTargeted) {
            processWithTargetedShip(appContext);
        } else {
            console.log("Processing as NON Targeted ship");
            appContext.orientation.isVertical = null;
            (console.log("isVertical reset to null"));
            appContext.attackCellData.randomCellNumber = randomizeCellSelected(appContext);
            console.log(`Randomized cell number generated: ${appContext.attackCellData.randomCellNumber}`);
            appContext.attackCellData.cellShipName = appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.randomCellNumber].name;
            appContext.attackCellData.cellHTML = document.getElementById(`playerone-cell-${appContext.attackCellData.randomCellNumber}`);
            appContext.attackCellData.isCellHit = appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.randomCellNumber].isHit;
            appContext.attackCellData.isCellMiss = appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.randomCellNumber].isMiss;
            validateAttackCellModule.validateRandomCell(appContext)
            processAttack(appContext);
        }
    }

    return {
        computerPlayerAttack,
        checkBothPlayersIfAllShipsSunk
    }
})();

const computerAttackTurnInitializationModule = (function() {
    function computerPlayerAttackTurnInitialization(appContext) {
        computerAIModule.checkBothPlayersIfAllShipsSunk(appContext);
        appContext.attackCellData.calculatedCellNumberToAttack = null;
        console.log("Computer player turn is starting....");
        computerAIModule.computerPlayerAttack(appContext);
        console.log("Computer player turn has ended....");
        computerAIModule.checkBothPlayersIfAllShipsSunk(appContext);
    }

    return {
        computerPlayerAttackTurnInitialization
    }
})();

module.exports = {
    computerAttackTurnInitializationModule
}