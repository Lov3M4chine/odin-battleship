/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/addGameModeClickEvents.js":
/*!***********************************************!*\
  !*** ./src/modules/addGameModeClickEvents.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(/*! ./playerModeInitializations */ "./src/modules/playerModeInitializations.js"),
  initializeOnePlayerMode = _require.initializeOnePlayerMode;
function addGameModeClickEvents(appContext) {
  appContext.appElements.onePlayerMode.addEventListener('click', function () {
    initializeOnePlayerMode(appContext);
  });
}
module.exports = {
  addGameModeClickEvents: addGameModeClickEvents
};

/***/ }),

/***/ "./src/modules/chooseShipPlacementForMe.js":
/*!*************************************************!*\
  !*** ./src/modules/chooseShipPlacementForMe.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(/*! ./computerPlayerInitialization */ "./src/modules/computerPlayerInitialization.js"),
  randomizeVariablesForPlaceShips = _require.randomizeVariablesForPlaceShips,
  assignRandomShipPlacementForPlayerComputer = _require.assignRandomShipPlacementForPlayerComputer;
var _require2 = __webpack_require__(/*! ./highlightShipPlacementModule */ "./src/modules/highlightShipPlacementModule.js"),
  highlightShipPlacementModule = _require2.highlightShipPlacementModule;
var _require3 = __webpack_require__(/*! ./submitButtonEventListenerModule */ "./src/modules/submitButtonEventListenerModule.js"),
  submitButtonEventListenerModule = _require3.submitButtonEventListenerModule;
function showRandomShipPlacementButton(appContext) {
  appContext.appElements.chooseForMeButton.classList.remove("hidden");
}
function attachEventListenerToRandomShipPlacementButton(appContext) {
  return new Promise(function (resolve) {
    appContext.appElements.chooseForMeButton.addEventListener('click', function () {
      highlightShipPlacementModule.highlightModule.removeHighlightedSelections(appContext);
      submitButtonEventListenerModule.toggleSubmitButtonOff(appContext);
      assignRandomShipPlacementForPlayerOne(appContext);
      resolve();
    }, {
      once: true
    });
  });
}
function processRandomShipPlacementForPlayerOne(appContext, currentShipKey) {
  var _appContext$shipList$ = appContext.shipList[currentShipKey],
    currentShipName = _appContext$shipList$.name,
    currentShipSize = _appContext$shipList$.size;
  randomizeVariablesForPlaceShips(appContext);
  appContext.currentShipName = currentShipName;
  appContext.currentShipSize = currentShipSize;
  highlightShipPlacementModule.checkPlacementModule.checkIsPlacementValid(appContext, appContext.playerOne);
  if (appContext.isPlacementValid) {
    appContext.playerOne.placeShip(appContext.cellSelected, appContext.orientation.isVertical, appContext.currentShipName, appContext.currentShipSize, appContext);
  } else {
    processRandomShipPlacementForPlayerOne(appContext, currentShipKey);
  }
}
function assignRandomShipPlacementForPlayerOne(appContext) {
  for (var currentShipKey in appContext.shipList) {
    processRandomShipPlacementForPlayerOne(appContext, currentShipKey);
  }
  highlightAutomatedShipPlacementForPlayerOne(appContext);
  highlightShipPlacementModule.highlightEventListenerModule.wipeEventListeners(appContext);
  assignRandomShipPlacementForPlayerComputer(appContext);
}
function highlightAutomatedShipPlacementForPlayerOne(appContext) {
  var playerOneCells = document.querySelectorAll(".playerone-cell");
  playerOneCells.forEach(function (cell) {
    var cellNumber = Number(cell.dataset.cellNumber);
    if (appContext.playerOne.gameboardState.gameboard[cellNumber].name !== null) {
      highlightShipPlacementModule.highlightModule.highlightRegistered(cell);
    }
  });
}
module.exports = {
  showRandomShipPlacementButton: showRandomShipPlacementButton,
  attachEventListenerToRandomShipPlacementButton: attachEventListenerToRandomShipPlacementButton
};

/***/ }),

/***/ "./src/modules/computerAIModule.js":
/*!*****************************************!*\
  !*** ./src/modules/computerAIModule.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var _require = __webpack_require__(/*! ./highlightBattleMode */ "./src/modules/highlightBattleMode.js"),
  highlightBattleModeModule = _require.highlightBattleModeModule;
var _require2 = __webpack_require__(/*! ./initializePlaceShipsModule */ "./src/modules/initializePlaceShipsModule.js"),
  initializePlaceShipsModule = _require2.initializePlaceShipsModule;
var _require3 = __webpack_require__(/*! ./highlightShipPlacementModule */ "./src/modules/highlightShipPlacementModule.js"),
  highlightShipPlacementModule = _require3.highlightShipPlacementModule;
var _require4 = __webpack_require__(/*! ./registerAttackCellsModule */ "./src/modules/registerAttackCellsModule.js"),
  registerAttackCellsModule = _require4.registerAttackCellsModule;
var _require5 = __webpack_require__(/*! ./computerPlayerInitialization */ "./src/modules/computerPlayerInitialization.js"),
  randomizeCellSelected = _require5.randomizeCellSelected;
var _require6 = __webpack_require__(/*! ./winStateModule */ "./src/modules/winStateModule.js"),
  winStateModule = _require6.winStateModule;
var computerAIModule = function () {
  var processingModule = function () {
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
      appContext.attackCellData.cellHTML = document.getElementById("playerone-cell-".concat(appContext.attackCellData.randomCellNumber));
      validateCellsModule.validateRandomCell(appContext);
      processAttack(appContext);
    }
    function processPreviousSunkData(appContext) {
      appContext.attackCellData.wasPreviousAttackSunk = false;
      appContext.attackCellData.isShipTargeted = false;
      appContext.attackCellData.previousHitCoordinates = [];
      appContext.attackCellData.calculatedCellNumberToAttack = null;
      appContext.orientation.isVertical = null;
      appContext.attackCellData.lastCellHit = null;
      initializePlaceShipsModule.updateMessageBox(appContext, "It's your turn.");
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
      if (Math.abs(appContext.attackCellData.previousHitCoordinates[0] - appContext.attackCellData.previousHitCoordinates[1]) === appContext.verticalSize) {
        appContext.orientation.isVertical = true;
      } else {
        appContext.orientation.isVertical = false;
      }
    }
    return {
      processWithTargetedShip: processWithTargetedShip,
      processAttack: processAttack
    };
  }();
  var validateCellsModule = function () {
    function isCellBeyondHoriztonalSize(appContext) {
      if (appContext.attackCellData.lastCellHit % appContext.verticalSize === 1) {
        if (appContext.attackCellData.calculatedCellNumberToAttack % appContext.verticalSize === 0) {
          return true;
        }
      } else if (appContext.attackCellData.lastCellHit % appContext.verticalSize === 0) {
        if (appContext.attackCellData.calculatedCellNumberToAttack % appContext.verticalSize === 9) {
          return true;
        }
      }
    }
    function wasCellPreviouslySelected(appContext) {
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
      } else {}
    }
    function validateRandomCell(appContext) {
      if (highlightShipPlacementModule.checkPlacementModule.isCellOutOfBounds(appContext.attackCellData.randomCellNumber, appContext)) {
        computerAttackTurnInitializationModule.computerPlayerAttack(appContext);
      } else if (wasCellPreviouslySelected(appContext)) {
        computerAttackTurnInitializationModule.computerPlayerAttack(appContext);
      } else {}
    }
    return {
      validateAttackCell: validateAttackCell,
      validateRandomCell: validateRandomCell,
      wasCellPreviouslySelected: wasCellPreviouslySelected
    };
  }();
  return {
    processingModule: processingModule,
    validateCellsModule: validateCellsModule
  };
}();
var computerAttackTurnInitializationModule = function () {
  function computerPlayerAttack(appContext) {
    if (appContext.attackCellData.isShipTargeted) {
      computerAIModule.processingModule.processWithTargetedShip(appContext);
    } else {
      appContext.orientation.isVertical = null;
      appContext.attackCellData.randomCellNumber = randomizeCellSelected(appContext);
      appContext.attackCellData.cellShipName = appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.randomCellNumber].name;
      appContext.attackCellData.cellHTML = document.getElementById("playerone-cell-".concat(appContext.attackCellData.randomCellNumber));
      appContext.attackCellData.isCellHit = appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.randomCellNumber].isHit;
      appContext.attackCellData.isCellMiss = appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.randomCellNumber].isMiss;
      computerAIModule.validateCellsModule.validateRandomCell(appContext);
      computerAIModule.processingModule.processAttack(appContext);
    }
  }
  function computerPlayerAttackTurnInitialization(appContext) {
    appContext.attackCellData.calculatedCellNumberToAttack = null;
    computerPlayerAttack(appContext);
    winStateModule.checkBothPlayersIfAllShipsSunk(appContext);
  }
  return {
    computerPlayerAttack: computerPlayerAttack,
    computerPlayerAttackTurnInitialization: computerPlayerAttackTurnInitialization
  };
}();
function calculateRandomPossibleCells(appContext) {
  var smallestCoordinate = Math.min.apply(Math, _toConsumableArray(appContext.attackCellData.previousHitCoordinates));
  var largestCoordinate = Math.max.apply(Math, _toConsumableArray(appContext.attackCellData.previousHitCoordinates));
  var randomPossibleCellNumberSmall;
  var randomPossibleCellNumberLarge;
  var randomizeTheFourNumbers = false;
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
    randomPossibleCellNumberSmall: randomPossibleCellNumberSmall,
    randomPossibleCellNumberLarge: randomPossibleCellNumberLarge,
    randomizeTheFourNumbers: randomizeTheFourNumbers
  };
}
function randomizeAttackCell(appContext) {
  var calculatedCells = calculateRandomPossibleCells(appContext);
  var randomValue = Math.random();
  var numbers = [];
  if (calculatedCells.randomizeTheFourNumbers) {
    if (appContext.orientation.isVertical) {
      numbers = [appContext.attackCellData.lastCellHit + appContext.verticalSize, appContext.attackCellData.lastCellHit - appContext.verticalSize];
      if (compareValidationCollection(appContext, numbers)) {
        appContext.orientation.isVertical = false;
      }
    } else if (appContext.orientation.isVertical === false) {
      numbers = [appContext.attackCellData.lastCellHit + 1, appContext.attackCellData.lastCellHit - 1];
      if (compareValidationCollection(appContext, numbers)) {
        appContext.orientation.isVertical = true;
      }
    } else {
      numbers = [appContext.attackCellData.lastCellHit + 1, appContext.attackCellData.lastCellHit - 1, appContext.attackCellData.lastCellHit + appContext.verticalSize, appContext.attackCellData.lastCellHit - appContext.verticalSize];
    }
    var randomIndex = getRandomInteger(0, numbers.length - 1);
    var randomNumber = numbers[randomIndex];
    appContext.attackCellData.calculatedCellNumberToAttack = randomNumber;
    var calculatedCellNumber = appContext.attackCellData.calculatedCellNumberToAttack;
    if (calculatedCellNumber >= 0 && calculatedCellNumber < appContext.horizontalSize * appContext.verticalSize && !compareValidationCollection(appContext, numbers)) {
      appContext.attackCellData.isCellHit = appContext.playerOne.gameboardState.gameboard[calculatedCellNumber].isHit;
      appContext.attackCellData.isCellMiss = appContext.playerOne.gameboardState.gameboard[calculatedCellNumber].isMiss;
      appContext.attackCellData.cellShipName = appContext.playerOne.gameboardState.gameboard[calculatedCellNumber].name;
      appContext.attackCellData.cellHTML = document.getElementById("playerone-cell-".concat(calculatedCellNumber));
      computerAIModule.validateCellsModule.validateAttackCell(appContext);
    } else {
      appContext.attackCellData.validateAttackCellCollection.push(appContext.attackCellData.calculatedCellNumberToAttack);
      randomizeAttackCell(appContext);
    }
  } else {
    if (randomValue < 0.5) {
      appContext.attackCellData.calculatedCellNumberToAttack = calculatedCells.randomPossibleCellNumberSmall;
      var _calculatedCellNumber = appContext.attackCellData.calculatedCellNumberToAttack;
      if (_calculatedCellNumber >= 0 && _calculatedCellNumber < appContext.horizontalSize * appContext.verticalSize && !compareValidationCollection(appContext, numbers)) {
        appContext.attackCellData.isCellHit = appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.calculatedCellNumberToAttack].isHit;
        appContext.attackCellData.isCellMiss = appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.calculatedCellNumberToAttack].isMiss;
        appContext.attackCellData.cellShipName = appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.calculatedCellNumberToAttack].name;
        appContext.attackCellData.cellHTML = document.getElementById("playerone-cell-".concat(appContext.attackCellData.calculatedCellNumberToAttack));
        computerAIModule.validateCellsModule.validateAttackCell(appContext);
      } else {
        appContext.attackCellData.validateAttackCellCollection.push(appContext.attackCellData.calculatedCellNumberToAttack);
        randomizeAttackCell(appContext);
      }
    } else {
      appContext.attackCellData.calculatedCellNumberToAttack = calculatedCells.randomPossibleCellNumberLarge;
      var _calculatedCellNumber2 = appContext.attackCellData.calculatedCellNumberToAttack;
      if (_calculatedCellNumber2 >= 0 && _calculatedCellNumber2 < appContext.horizontalSize * appContext.verticalSize && !compareValidationCollection(appContext, numbers)) {
        appContext.attackCellData.isCellHit = appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.calculatedCellNumberToAttack].isHit;
        appContext.attackCellData.isCellMiss = appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.calculatedCellNumberToAttack].isMiss;
        appContext.attackCellData.cellShipName = appContext.playerOne.gameboardState.gameboard[appContext.attackCellData.calculatedCellNumberToAttack].name;
        appContext.attackCellData.cellHTML = document.getElementById("playerone-cell-".concat(appContext.attackCellData.calculatedCellNumberToAttack));
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
  var collectionArray = appContext.attackCellData.validateAttackCellCollection;
  if (collectionArray.length !== numbersArr.length) return false;
  collectionArray.sort();
  numbersArr.sort();
  for (var i = 0; i < collectionArray.length; i++) {
    if (collectionArray[i] !== numbersArr[i]) return false;
  }
  return true;
}
module.exports = {
  computerAIModule: computerAIModule,
  computerAttackTurnInitializationModule: computerAttackTurnInitializationModule
};

/***/ }),

/***/ "./src/modules/computerPlayerInitialization.js":
/*!*****************************************************!*\
  !*** ./src/modules/computerPlayerInitialization.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(/*! ./highlightShipPlacementModule */ "./src/modules/highlightShipPlacementModule.js"),
  highlightShipPlacementModule = _require.highlightShipPlacementModule;
var _require2 = __webpack_require__(/*! ./registerShipModule */ "./src/modules/registerShipModule.js"),
  registerShipModule = _require2.registerShipModule;
function assignRandomShipPlacementForPlayerComputer(appContext) {
  for (var currentShipKey in appContext.shipList) {
    processRandomShipPlacementForPlayerComputer(appContext, currentShipKey);
  }
}
function processRandomShipPlacementForPlayerComputer(appContext, currentShipKey) {
  var _appContext$shipList$ = appContext.shipList[currentShipKey],
    currentShipName = _appContext$shipList$.name,
    currentShipSize = _appContext$shipList$.size;
  randomizeVariablesForPlaceShips(appContext);
  appContext.currentShipName = currentShipName;
  appContext.currentShipSize = currentShipSize;
  highlightShipPlacementModule.checkPlacementModule.checkIsPlacementValid(appContext, appContext.playerComputer);
  if (appContext.isPlacementValid) {
    registerShipModule.registerPlaceShipForPlayerComputer(appContext);
  } else {
    processRandomShipPlacementForPlayerComputer(appContext, currentShipKey);
  }
}
function randomizeVariablesForPlaceShips(appContext) {
  appContext.cellSelected = randomizeCellSelected(appContext);
  appContext.orientation.isVertical = Math.random() < 0.5;
}
function randomizeCellSelected(appContext) {
  return Math.floor(Math.random() * (appContext.horizontalSize * appContext.verticalSize));
}
module.exports = {
  assignRandomShipPlacementForPlayerComputer: assignRandomShipPlacementForPlayerComputer,
  randomizeVariablesForPlaceShips: randomizeVariablesForPlaceShips,
  randomizeCellSelected: randomizeCellSelected
};

/***/ }),

/***/ "./src/modules/errorHandlingModule.js":
/*!********************************************!*\
  !*** ./src/modules/errorHandlingModule.js ***!
  \********************************************/
/***/ ((module) => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function validateInput(value, type, errorMessage) {
  if (_typeof(value) !== type) {
    throw new Error(errorMessage);
  }
}
function validateAppContext(appContext) {
  validateInput(appContext, "object", "appContext must be an object");
  validateInput(appContext.horizontalSize, "number", "horizontalSize must be an integer");
  validateInput(appContext.verticalSize, "number", "verticalSize must be an integer");
  if (appContext.horizontalSize < 7 || appContext.verticalSize < 7) {
    throw new Error("horizontal and vertical sizes should be at least 7");
  }
}
function validatePlaceShipInputs(cellSelected, isVertical, appContext) {
  validateInput(cellSelected, "number", "cellSelected must be an integer.");
  validateInput(isVertical, "boolean", "isVertical must be a boolean.");
  if (cellSelected < 0 || cellSelected >= appContext.horizontalSize * appContext.verticalSize) {
    throw new Error("cellSelected must be greater than or equal to zero and less than gameboard boundaries. It represents the initial cell the ship starts on.");
  }
}
module.exports = {
  validateInput: validateInput,
  validateAppContext: validateAppContext,
  validatePlaceShipInputs: validatePlaceShipInputs
};

/***/ }),

/***/ "./src/modules/factories/CreateBattlegrid.js":
/*!***************************************************!*\
  !*** ./src/modules/factories/CreateBattlegrid.js ***!
  \***************************************************/
/***/ ((module) => {

var CreateBattlegrid = function () {
  function createBattlegridForPlayerOne(appContext) {
    var playerOneBattlegridContainer = document.createElement('div');
    playerOneBattlegridContainer.id = 'playerone-battlegrid-container';
    var playerOneBattlegridLabel = document.createElement('button');
    playerOneBattlegridLabel.innerText = 'Your Fleet';
    playerOneBattlegridLabel.id = 'playerone-battlegrid-label';
    playerOneBattlegridLabel.className = 'btn bg-secondary text-secondary-content text-2xl w-full hidden';
    var playerOneBattlegrid = document.createElement('div');
    playerOneBattlegrid.id = 'playerone-battlegrid';
    playerOneBattlegrid.className = 'grid grid-rows-[repeat(10,_minmax(0,_1fr))] grid-cols-10';
    for (var i = 0; i < appContext.horizontalSize * appContext.verticalSize; i++) {
      var playerOneCell = null;
      playerOneCell = document.createElement('button');
      playerOneCell.id = "playerone-cell-".concat(i);
      playerOneCell.className = 'btn bg-primary playerone-cell';
      playerOneCell.title = "cell ".concat(i);
      playerOneCell.setAttribute('data-cell-number', i);
      playerOneCell.setAttribute('data-is-highlighted', false);
      playerOneBattlegrid.appendChild(playerOneCell);
    }
    playerOneBattlegridContainer.appendChild(playerOneBattlegridLabel);
    playerOneBattlegridContainer.appendChild(playerOneBattlegrid);
    appContext.appElements.battlegridsContainer.appendChild(playerOneBattlegridContainer);
    appContext.appElements.playerOneBattlegridLabel = playerOneBattlegridLabel;
  }
  function createBattlegridForPlayerComputer(appContext) {
    var playerComputerBattlegridContainer = document.createElement('div');
    playerComputerBattlegridContainer.id = 'player-computer-battlegrid-container';
    var playerComputerBattlegridLabel = document.createElement('button');
    playerComputerBattlegridLabel.innerText = "Opponent's Fleet";
    playerComputerBattlegridLabel.id = 'player-computer-battlegrid-label';
    playerComputerBattlegridLabel.className = 'btn bg-secondary text-secondary-content text-2xl w-full hidden';
    var playerComputerBattlegrid = document.createElement('div');
    playerComputerBattlegrid.id = 'player-computer-battlegrid';
    playerComputerBattlegrid.className = 'grid grid-rows-[repeat(10,_minmax(0,_1fr))] grid-cols-10 hidden';
    appContext.appElements.playerComputerBattlegrid = playerComputerBattlegrid;
    for (var i = 0; i < appContext.horizontalSize * appContext.verticalSize; i++) {
      var playerComputerCell = null;
      playerComputerCell = document.createElement('button');
      playerComputerCell.id = "player-computer-cell-".concat(i);
      playerComputerCell.className = 'btn bg-primary player-computer-cell';
      playerComputerCell.title = "cell ".concat(i);
      playerComputerCell.setAttribute('data-cellNumber', i);
      playerComputerBattlegrid.appendChild(playerComputerCell);
    }
    playerComputerBattlegridContainer.appendChild(playerComputerBattlegridLabel);
    playerComputerBattlegridContainer.appendChild(playerComputerBattlegrid);
    appContext.appElements.battlegridsContainer.appendChild(playerComputerBattlegridContainer);
    appContext.appElements.playerComputerBattlegridLabel = playerComputerBattlegridLabel;
  }
  return {
    createBattlegridForPlayerOne: createBattlegridForPlayerOne,
    createBattlegridForPlayerComputer: createBattlegridForPlayerComputer
  };
}();
module.exports = {
  CreateBattlegrid: CreateBattlegrid
};

/***/ }),

/***/ "./src/modules/factories/CreatePlayers.js":
/*!************************************************!*\
  !*** ./src/modules/factories/CreatePlayers.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var PlayerFactory = __webpack_require__(/*! ./PlayerFactory */ "./src/modules/factories/PlayerFactory.js");
var CreatePlayersForOnePlayerMode = function CreatePlayersForOnePlayerMode(appContext) {
  appContext.playerOne = PlayerFactory(appContext);
  appContext.playerComputer = PlayerFactory(appContext);
};
module.exports = {
  CreatePlayersForOnePlayerMode: CreatePlayersForOnePlayerMode
};

/***/ }),

/***/ "./src/modules/factories/CreateShips.js":
/*!**********************************************!*\
  !*** ./src/modules/factories/CreateShips.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(/*! ./ShipFactory */ "./src/modules/factories/ShipFactory.js"),
  ShipFactory = _require.ShipFactory;
var CreateShips = function CreateShips() {
  var carrier = ShipFactory("carrier", 5);
  var battleship = ShipFactory("battleship", 4);
  var destroyer = ShipFactory("destroyer", 3);
  var submarine = ShipFactory("submarine", 3);
  var patrol = ShipFactory("patrol boat", 2);
  return {
    carrier: carrier,
    battleship: battleship,
    destroyer: destroyer,
    submarine: submarine,
    patrol: patrol
  };
};
module.exports = {
  CreateShips: CreateShips
};

/***/ }),

/***/ "./src/modules/factories/GameboardFactory.js":
/*!***************************************************!*\
  !*** ./src/modules/factories/GameboardFactory.js ***!
  \***************************************************/
/***/ ((module) => {

var GameboardFactory = function GameboardFactory() {
  function createGameboard(appContext) {
    // Error Checking
    if (!Number.isInteger(appContext.horizontalSize) || !Number.isInteger(appContext.verticalSize)) {
      throw new Error('Horizontal and Vertical Size must be integers');
    }
    if (appContext.horizontalSize < 8 || appContext.verticalSize < 8) {
      throw new Error("Horizontal and Vertical Size must be at least 7");
    }

    // Gameboard creation
    var gameboard = [];
    for (var i = 0; i < appContext.horizontalSize * appContext.verticalSize; i++) {
      gameboard.push({
        cell: i,
        isHit: false,
        isMiss: false,
        name: null
      });
    }
    return {
      gameboard: gameboard
    };
  }
  return {
    createGameboard: createGameboard
  };
};
module.exports = {
  GameboardFactory: GameboardFactory
};

/***/ }),

/***/ "./src/modules/factories/PlayerFactory.js":
/*!************************************************!*\
  !*** ./src/modules/factories/PlayerFactory.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(/*! ../errorHandlingModule.js */ "./src/modules/errorHandlingModule.js"),
  validatePlaceShipInputs = _require.validatePlaceShipInputs;
var _require2 = __webpack_require__(/*! ./GameboardFactory.js */ "./src/modules/factories/GameboardFactory.js"),
  GameboardFactory = _require2.GameboardFactory;
var _require3 = __webpack_require__(/*! ./ShipFactory.js */ "./src/modules/factories/ShipFactory.js"),
  ShipFactory = _require3.ShipFactory;
var PlayerFactory = function PlayerFactory(appContext) {
  var gameboardFactory = GameboardFactory(appContext);
  var gameboardState = gameboardFactory.createGameboard(appContext);
  var ships = {};
  function placeShip(cellSelected, isVertical, name, size, appContext) {
    var newShip = ShipFactory(name, size);
    this.ships[name] = newShip;
    this.ships[name].size = size;

    // Error Handling
    validatePlaceShipInputs(cellSelected, isVertical, appContext);

    // Ship Placement
    if (isVertical) {
      for (var i = cellSelected; i < cellSelected + size * appContext.horizontalSize; i += appContext.horizontalSize) {
        this.gameboardState.gameboard[i].name = name;
        newShip.coordinates.push(i);
      }
      this.ships[name].coordinates = newShip.coordinates;
    } else {
      for (var _i = cellSelected; _i < cellSelected + size; _i += 1) {
        this.gameboardState.gameboard[_i].name = name;
        newShip.coordinates.push(_i);
      }
      this.ships[name].coordinates = newShip.coordinates;
    }
    return this.ships;
  }
  function receiveAttack(cellNumber, player) {
    var name = player.gameboardState.gameboard[cellNumber].name;
    var ship = player.ships[name];
    if (name !== null) {
      player.gameboardState.gameboard[cellNumber].isHit = true;
      ship.hit();
    } else {
      player.gameboardState.gameboard[cellNumber].isMiss = true;
    }
  }
  function checkIfPlayerShipsSunk() {
    var allShipsSunk = true;
    for (var shipKey in ships) {
      var ship = ships[shipKey];
      if (ship.isSunk() === false) {
        allShipsSunk = false;
        return allShipsSunk;
      }
    }
    return allShipsSunk;
  }
  return {
    placeShip: placeShip,
    receiveAttack: receiveAttack,
    checkIfPlayerShipsSunk: checkIfPlayerShipsSunk,
    gameboardState: gameboardState,
    ships: ships
  };
};
module.exports = PlayerFactory;

/***/ }),

/***/ "./src/modules/factories/ShipFactory.js":
/*!**********************************************!*\
  !*** ./src/modules/factories/ShipFactory.js ***!
  \**********************************************/
/***/ ((module) => {

var ShipFactory = function ShipFactory(name, size) {
  if (!Number.isInteger(size) || size < 1) {
    throw new Error('Invalid ship length: must be a positive integer.');
  }
  if (typeof name !== 'string' || name.trim() === '') {
    throw new Error('Invalid ship name: must be a non-empty string.');
  }
  var coordinates = [];
  var hits = 0;
  var hit = function hit() {
    if (hits < size) {
      hits += 1;
    }
  };
  var getHits = function getHits() {
    return hits;
  };
  var isSunk = function isSunk() {
    return hits >= size;
  };
  return {
    hit: hit,
    getHits: getHits,
    isSunk: isSunk,
    name: name,
    size: size,
    coordinates: coordinates
  };
};
module.exports = {
  ShipFactory: ShipFactory
};

/***/ }),

/***/ "./src/modules/highlightBattleMode.js":
/*!********************************************!*\
  !*** ./src/modules/highlightBattleMode.js ***!
  \********************************************/
/***/ ((module) => {

var highlightBattleModeModule = function () {
  function highlightHit(cell) {
    cell.classList.remove("bg-primary");
    cell.classList.remove("bg-secondary");
    cell.classList.add("bg-accent");
  }
  function highlightMiss(cell) {
    cell.classList.remove("bg-primary");
    cell.classList.add("bg-priamry-focus");
  }
  function highlightSunk(shipCoordinates) {
    shipCoordinates.forEach(function (coordinate) {
      var cellToRegister = document.getElementById("player-computer-cell-".concat(coordinate));
      cellToRegister.classList.remove("bg-accent");
      cellToRegister.classList.add("bg-secondary");
    });
  }
  return {
    highlightHit: highlightHit,
    highlightMiss: highlightMiss,
    highlightSunk: highlightSunk
  };
}();
module.exports = {
  highlightBattleModeModule: highlightBattleModeModule
};

/***/ }),

/***/ "./src/modules/highlightShipPlacementModule.js":
/*!*****************************************************!*\
  !*** ./src/modules/highlightShipPlacementModule.js ***!
  \*****************************************************/
/***/ ((module) => {

var highlightShipPlacementModule = function () {
  var highlightEventListenerModule = function () {
    function generateHighlightShipPlacementEventListener(appContext, player) {
      return function (event) {
        highlightModule.removeHighlightedSelections(appContext);
        highlightModule.highlightShipPlacement(event.target, appContext, player);
      };
    }
    function wipeEventListeners(appContext) {
      var playerOneCells = document.querySelectorAll(".playerone-cell");
      playerOneCells.forEach(function (cell) {
        highlightShipPlacementModule.highlightEventListenerModule.removeOldHighlightListener(cell, appContext);
      });
    }
    function removeOldHighlightListener(cell, appContext) {
      if (appContext.highlightListeners[cell.id]) {
        cell.removeEventListener('click', appContext.highlightListeners[cell.id]);
      }
    }
    function processNewHighlightListener(cell, appContext, player) {
      var listener = generateHighlightShipPlacementEventListener(appContext, player);
      appContext.highlightListeners[cell.id] = listener;
      cell.addEventListener('click', listener);
    }
    function addHighlightShipEventListener(appContext, player) {
      var playerOneCells = document.querySelectorAll(".playerone-cell");
      playerOneCells.forEach(function (cell) {
        removeOldHighlightListener(cell, appContext);
        processNewHighlightListener(cell, appContext, player);
      });
    }
    return {
      addHighlightShipEventListener: addHighlightShipEventListener,
      removeOldHighlightListener: removeOldHighlightListener,
      wipeEventListeners: wipeEventListeners
    };
  }();
  var highlightModule = function () {
    function toggleSubmitButtonOn(appContext) {
      appContext.appElements.submitButton.classList.remove("hidden");
    }
    function highlightShipPlacement(targetedCell, appContext, player) {
      var cellNumber = Number(targetedCell.dataset.cellNumber);
      appContext.cellSelected = cellNumber;
      appContext.highlightedArray.length = 0;
      toggleSubmitButtonOn(appContext);
      checkPlacementModule.checkIsPlacementValid(appContext, player);
      if (appContext.orientation.isVertical) {
        if (appContext.isPlacementValid) {
          for (var i = cellNumber; i < cellNumber + appContext.currentShipSize * appContext.verticalSize; i += appContext.verticalSize) {
            if (i < appContext.horizontalSize * appContext.verticalSize && i % appContext.verticalSize < cellNumber % appContext.verticalSize + appContext.currentShipSize) {
              pushAndHighlight(i, appContext);
            } else {
              if (i >= 0 && i < appContext.horizontalSize * appContext.verticalSize) {
                break;
              }
            }
          }
        } else {
          for (var _i = cellNumber; _i < cellNumber + appContext.currentShipSize * appContext.verticalSize; _i += appContext.verticalSize) {
            if (_i < appContext.horizontalSize * appContext.verticalSize && _i % appContext.verticalSize < cellNumber % appContext.verticalSize + appContext.currentShipSize) {
              pushAndHighlightSelectionAsInvalid(_i, appContext);
            }
          }
        }
      } else {
        if (appContext.isPlacementValid) {
          for (var _i2 = cellNumber; _i2 < cellNumber + appContext.currentShipSize; _i2++) {
            if (_i2 < appContext.horizontalSize * appContext.verticalSize && _i2 % appContext.horizontalSize >= cellNumber % appContext.horizontalSize) {
              pushAndHighlight(_i2, appContext);
            } else {
              if (_i2 >= 0 && _i2 < appContext.horizontalSize * appContext.verticalSize) {
                break;
              }
            }
          }
        } else {
          for (var _i3 = cellNumber; _i3 < cellNumber + appContext.currentShipSize; _i3++) {
            if (_i3 < appContext.horizontalSize * appContext.verticalSize && _i3 % appContext.horizontalSize >= cellNumber % appContext.horizontalSize) {
              pushAndHighlightSelectionAsInvalid(_i3, appContext);
            }
          }
        }
      }
    }
    function pushAndHighlight(i, appContext) {
      var cellToHighlight = document.querySelector("[data-cell-number=\"".concat(i, "\"]"));
      appContext.highlightedArray.push(i);
      highlightSelected(cellToHighlight);
    }
    function pushAndHighlightSelectionAsInvalid(i, appContext) {
      var cellToHighlightInvalid = document.querySelector("[data-cell-number=\"".concat(i, "\"]"));
      appContext.highlightedArray.push(i);
      highlightInvalid(cellToHighlightInvalid);
    }
    function removeHighlightedSelections(appContext) {
      for (var i = 0; i < appContext.highlightedArray.length; i++) {
        var cellToRemoveHighlight = document.querySelector("[data-cell-number=\"".concat(appContext.highlightedArray[i], "\"]"));
        highlightRemove(cellToRemoveHighlight);
      }
    }
    function updateHighlightedFromSelectedToRegistered(appContext) {
      for (var i = 0; i < appContext.highlightedArray.length; i++) {
        var cellToRegister = document.querySelector("[data-cell-number=\"".concat(appContext.highlightedArray[i], "\"]"));
        highlightRegistered(cellToRegister);
      }
    }
    function highlightSelected(cellToHighlight) {
      cellToHighlight.classList.remove("bg-primary");
      cellToHighlight.classList.add("bg-accent");
    }
    function highlightRegistered(cellToRegister) {
      cellToRegister.classList.remove("bg-primary");
      cellToRegister.classList.add("bg-secondary");
    }
    function highlightInvalid(cellToHighlightInvalid) {
      cellToHighlightInvalid.classList.remove("bg-primary");
      cellToHighlightInvalid.classList.add("bg-error");
    }
    function highlightRemove(cellToRemoveHighlight) {
      cellToRemoveHighlight.classList.remove("bg-error");
      cellToRemoveHighlight.classList.remove("bg-accent");
      cellToRemoveHighlight.classList.add("bg-primary");
    }
    return {
      highlightShipPlacement: highlightShipPlacement,
      removeHighlightedSelections: removeHighlightedSelections,
      updateHighlightedFromSelectedToRegistered: updateHighlightedFromSelectedToRegistered,
      highlightRegistered: highlightRegistered
    };
  }();
  var checkPlacementModule = function () {
    function isCellOutOfBounds(cell, appContext) {
      if (cell >= appContext.horizontalSize * appContext.verticalSize) {
        return true;
      }
    }
    function isCellBeyondVerticalSize(cell, appContext) {
      if (cell % appContext.verticalSize > appContext.cellSelected % appContext.verticalSize + appContext.currentShipSize) {
        return true;
      }
    }
    function isCellBeyondHorizontalSize(cell, appContext) {
      if (cell % appContext.horizontalSize < appContext.cellSelected % appContext.horizontalSize) {
        return true;
      }
    }
    function isCellOccupied(cell, player) {
      if (player.gameboardState.gameboard[cell].name) {
        return true;
      }
    }
    function loopAndCheckVerticalSelection(appContext, player) {
      var verticalSelectionRange = appContext.cellSelected + appContext.currentShipSize * appContext.verticalSize;
      for (var i = appContext.cellSelected; i < verticalSelectionRange; i += appContext.verticalSize) {
        if (isCellOutOfBounds(i, appContext) || isCellBeyondVerticalSize(i, appContext) || isCellOccupied(i, player)) {
          appContext.isPlacementValid = false;
        }
      }
    }
    function loopAndCheckHorizontalSelection(appContext, player) {
      var horizontalSelectionRange = appContext.cellSelected + appContext.currentShipSize;
      for (var i = appContext.cellSelected; i < horizontalSelectionRange; i++) {
        if (isCellOutOfBounds(i, appContext) || isCellBeyondHorizontalSize(i, appContext) || isCellOccupied(i, player)) {
          appContext.isPlacementValid = false;
        }
      }
    }
    function checkIsPlacementValid(appContext, player) {
      appContext.isPlacementValid = true;
      if (appContext.orientation.isVertical) {
        loopAndCheckVerticalSelection(appContext, player);
      } else {
        loopAndCheckHorizontalSelection(appContext, player);
      }
    }
    return {
      checkIsPlacementValid: checkIsPlacementValid,
      isCellOutOfBounds: isCellOutOfBounds
    };
  }();
  return {
    highlightEventListenerModule: highlightEventListenerModule,
    highlightModule: highlightModule,
    checkPlacementModule: checkPlacementModule
  };
}();
module.exports = {
  highlightShipPlacementModule: highlightShipPlacementModule
};

/***/ }),

/***/ "./src/modules/initializeBattleMode.js":
/*!*********************************************!*\
  !*** ./src/modules/initializeBattleMode.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(/*! ./computerAIModule */ "./src/modules/computerAIModule.js"),
  computerAttackTurnInitializationModule = _require.computerAttackTurnInitializationModule;
var _require2 = __webpack_require__(/*! ./highlightBattleMode */ "./src/modules/highlightBattleMode.js"),
  highlightBattleModeModule = _require2.highlightBattleModeModule;
var _require3 = __webpack_require__(/*! ./initializePlaceShipsModule */ "./src/modules/initializePlaceShipsModule.js"),
  initializePlaceShipsModule = _require3.initializePlaceShipsModule;
var _require4 = __webpack_require__(/*! ./winStateModule */ "./src/modules/winStateModule.js"),
  winStateModule = _require4.winStateModule;
function initializeBattleMode(appContext) {
  hideRandomShipPlacementButton(appContext);
  hideOrientationButton(appContext);
  showPlayerComputerBattlegrid(appContext);
  showBattlegridLabels(appContext);
  initializePlaceShipsModule.updateMessageBox(appContext, "It's your turn to attack.");
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
function showPlayerComputerBattlegrid(appContext) {
  appContext.appElements.playerComputerBattlegrid.classList.remove('hidden');
}
function hideRandomShipPlacementButton(appContext) {
  appContext.appElements.chooseForMeButton.classList.add("hidden");
}
function addAttackEventListeners(appContext) {
  var playerComputerCells = document.querySelectorAll(".player-computer-cell");
  playerComputerCells.forEach(function (cell) {
    cell.attackEventListener = attackEventListener(appContext, cell);
    cell.addEventListener('click', cell.attackEventListener);
  });
}
var attackEventListener = function attackEventListener(appContext) {
  return function (event) {
    var cellNumber = event.target.getAttribute('data-cellNumber');
    var cell = appContext.playerComputer.gameboardState.gameboard[cellNumber];
    var cellShipName = cell.name;
    appContext.playerComputer.receiveAttack(cellNumber, appContext.playerComputer);
    removeAttackEventListeners(event.target);
    winStateModule.checkBothPlayersIfAllShipsSunk(appContext);
    if (cell.isHit) {
      highlightBattleModeModule.highlightHit(event.target);
      if (appContext.playerComputer.ships[cellShipName].isSunk()) {
        initializePlaceShipsModule.updateMessageBox(appContext, "Good job! You sunk their ".concat(cellShipName));
        highlightBattleModeModule.highlightSunk(appContext.playerComputer.ships[cellShipName].coordinates);
      }
    } else {
      highlightBattleModeModule.highlightMiss(event.target);
    }
    computerAttackTurnInitializationModule.computerPlayerAttackTurnInitialization(appContext);
  };
};
function removeAttackEventListeners(cell) {
  cell.removeEventListener('click', cell.attackEventListener);
}
module.exports = {
  initializeBattleMode: initializeBattleMode
};

/***/ }),

/***/ "./src/modules/initializePlaceShipsModule.js":
/*!***************************************************!*\
  !*** ./src/modules/initializePlaceShipsModule.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var _require = __webpack_require__(/*! ./chooseShipPlacementForMe */ "./src/modules/chooseShipPlacementForMe.js"),
  showRandomShipPlacementButton = _require.showRandomShipPlacementButton;
var _require2 = __webpack_require__(/*! ./computerPlayerInitialization */ "./src/modules/computerPlayerInitialization.js"),
  assignRandomShipPlacementForPlayerComputer = _require2.assignRandomShipPlacementForPlayerComputer;
var _require3 = __webpack_require__(/*! ./factories/CreateShips */ "./src/modules/factories/CreateShips.js"),
  CreateShips = _require3.CreateShips;
var _require4 = __webpack_require__(/*! ./highlightShipPlacementModule */ "./src/modules/highlightShipPlacementModule.js"),
  highlightShipPlacementModule = _require4.highlightShipPlacementModule;
var _require5 = __webpack_require__(/*! ./orientationModule */ "./src/modules/orientationModule.js"),
  orientationModule = _require5.orientationModule;
var _require6 = __webpack_require__(/*! ./submitButtonEventListenerModule */ "./src/modules/submitButtonEventListenerModule.js"),
  submitButtonEventListenerModule = _require6.submitButtonEventListenerModule;
var initializePlaceShipsModule = function () {
  function initializePlaceShips(_x, _x2) {
    return _initializePlaceShips.apply(this, arguments);
  }
  function _initializePlaceShips() {
    _initializePlaceShips = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(appContext, player) {
      var currentShipKey, _appContext$shipList$, currentShipName, currentShipSize;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setupPlaceShips(appContext);
            _context.t0 = _regeneratorRuntime().keys(appContext.shipList);
          case 2:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 13;
              break;
            }
            currentShipKey = _context.t1.value;
            _appContext$shipList$ = appContext.shipList[currentShipKey], currentShipName = _appContext$shipList$.name, currentShipSize = _appContext$shipList$.size;
            appContext.currentShipName = currentShipName;
            appContext.currentShipSize = currentShipSize;
            updateMessageBox(appContext, "Please place your ".concat(appContext.currentShipName, " (").concat(appContext.currentShipSize, " slots)"));
            highlightShipPlacementModule.highlightEventListenerModule.addHighlightShipEventListener(appContext, player);
            _context.next = 11;
            return submitButtonEventListenerModule.addSubmitButtonEventListener(appContext, player);
          case 11:
            _context.next = 2;
            break;
          case 13:
            highlightShipPlacementModule.highlightEventListenerModule.wipeEventListeners(appContext);
            assignRandomShipPlacementForPlayerComputer(appContext);
          case 15:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return _initializePlaceShips.apply(this, arguments);
  }
  function createShipList(appContext) {
    appContext.shipList = CreateShips(appContext);
  }
  function initializePlaceShipsDynamicHTML(appContext) {
    appContext.appElements.messageBox.classList.remove("hidden");
    appContext.appElements.horizontalButton.classList.remove("hidden");
    submitButtonEventListenerModule.toggleSubmitButtonOff(appContext);
  }
  function setupPlaceShips(appContext) {
    orientationModule.addOrientationClickEvent(appContext);
    initializePlaceShipsDynamicHTML(appContext);
    createShipList(appContext);
    showRandomShipPlacementButton(appContext);
  }
  function updateMessageBox(appContext, message) {
    appContext.appElements.messageBox.innerHTML = message;
  }
  return {
    initializePlaceShips: initializePlaceShips,
    updateMessageBox: updateMessageBox
  };
}();
module.exports = {
  initializePlaceShipsModule: initializePlaceShipsModule
};

/***/ }),

/***/ "./src/modules/orientationModule.js":
/*!******************************************!*\
  !*** ./src/modules/orientationModule.js ***!
  \******************************************/
/***/ ((module) => {

var orientationModule = function () {
  function addOrientationClickEvent(appContext) {
    var orientationButtons = document.querySelectorAll(".orientation-button");
    orientationButtons.forEach(function (button) {
      button.removeEventListener('click', function () {
        return toggleOrientation(appContext);
      });
      button.addEventListener('click', function () {
        return toggleOrientation(appContext);
      });
    });
  }
  function toggleOrientation(appContext) {
    if (appContext.orientation.isVertical === true) {
      appContext.orientation.isVertical = false;
      appContext.appElements.verticalButton.classList.add("hidden");
      appContext.appElements.horizontalButton.classList.remove("hidden");
    } else {
      appContext.orientation.isVertical = true;
      appContext.appElements.verticalButton.classList.remove("hidden");
      appContext.appElements.horizontalButton.classList.add("hidden");
    }
  }
  return {
    addOrientationClickEvent: addOrientationClickEvent
  };
}();
module.exports = {
  orientationModule: orientationModule
};

/***/ }),

/***/ "./src/modules/playerModeInitializations.js":
/*!**************************************************!*\
  !*** ./src/modules/playerModeInitializations.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var _require = __webpack_require__(/*! ./chooseShipPlacementForMe */ "./src/modules/chooseShipPlacementForMe.js"),
  attachEventListenerToRandomShipPlacementButton = _require.attachEventListenerToRandomShipPlacementButton;
var _require2 = __webpack_require__(/*! ./factories/CreateBattlegrid */ "./src/modules/factories/CreateBattlegrid.js"),
  CreateBattlegrid = _require2.CreateBattlegrid;
var _require3 = __webpack_require__(/*! ./factories/CreatePlayers */ "./src/modules/factories/CreatePlayers.js"),
  CreatePlayersForOnePlayerMode = _require3.CreatePlayersForOnePlayerMode;
var _require4 = __webpack_require__(/*! ./initializeBattleMode */ "./src/modules/initializeBattleMode.js"),
  initializeBattleMode = _require4.initializeBattleMode;
var _require5 = __webpack_require__(/*! ./initializePlaceShipsModule.js */ "./src/modules/initializePlaceShipsModule.js"),
  initializePlaceShipsModule = _require5.initializePlaceShipsModule;
function hideModeSelectContainer(appContext) {
  appContext.appElements.startGameContainer.classList.add("hidden");
}
;
function hideLogo() {
  var logo = document.getElementById("logo");
  logo.classList.add("hidden");
}
function hideThemeSelector() {
  var themeSelector = document.getElementById("theme-selector");
  themeSelector.classList.add("hidden");
}
function initializeOnePlayerMode(_x) {
  return _initializeOnePlayerMode.apply(this, arguments);
}
function _initializeOnePlayerMode() {
  _initializeOnePlayerMode = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(appContext) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          hideModeSelectContainer(appContext);
          hideLogo();
          hideThemeSelector();
          CreateBattlegrid.createBattlegridForPlayerOne(appContext);
          CreatePlayersForOnePlayerMode(appContext);
          _context.next = 7;
          return Promise.race([initializePlaceShipsModule.initializePlaceShips(appContext, appContext.playerOne), attachEventListenerToRandomShipPlacementButton(appContext)]);
        case 7:
          CreateBattlegrid.createBattlegridForPlayerComputer(appContext);
          initializeBattleMode(appContext);
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _initializeOnePlayerMode.apply(this, arguments);
}
module.exports = {
  initializeOnePlayerMode: initializeOnePlayerMode
};

/***/ }),

/***/ "./src/modules/registerAttackCellsModule.js":
/*!**************************************************!*\
  !*** ./src/modules/registerAttackCellsModule.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(/*! ./highlightBattleMode */ "./src/modules/highlightBattleMode.js"),
  highlightBattleModeModule = _require.highlightBattleModeModule;
var _require2 = __webpack_require__(/*! ./initializePlaceShipsModule */ "./src/modules/initializePlaceShipsModule.js"),
  initializePlaceShipsModule = _require2.initializePlaceShipsModule;
var registerAttackCellsModule = function () {
  function registerCellHit(appContext) {
    appContext.attackCellData.isCellHit = true;
    appContext.attackCellData.wasPreviousAttackHit = true;
    var currentCellNumber = appContext.attackCellData.cellHTML.dataset.cellNumber;
    appContext.playerOne.receiveAttack(currentCellNumber, appContext.playerOne);
    highlightBattleModeModule.highlightHit(appContext.attackCellData.cellHTML);
    initializePlaceShipsModule.updateMessageBox(appContext, "The enemy is attacking your ".concat(appContext.attackCellData.cellShipName));
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
  function updateIsSunk(appContext) {
    if (appContext.playerOne.ships[appContext.attackCellData.cellShipName].isSunk()) {
      appContext.attackCellData.wasPreviousAttackSunk = true;
      initializePlaceShipsModule.updateMessageBox(appContext, "The enemy has sunk your ".concat(appContext.attackCellData.cellShipName, "!!!"));
    }
  }
  return {
    registerCellHit: registerCellHit
  };
}();
module.exports = {
  registerAttackCellsModule: registerAttackCellsModule
};

/***/ }),

/***/ "./src/modules/registerShipModule.js":
/*!*******************************************!*\
  !*** ./src/modules/registerShipModule.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(/*! ./highlightShipPlacementModule */ "./src/modules/highlightShipPlacementModule.js"),
  highlightShipPlacementModule = _require.highlightShipPlacementModule;
var registerShipModule = function () {
  function showAlert(message) {
    var alertDiv = document.createElement('div');
    alertDiv.classList.add('fixed', 'inset-0', 'flex', 'items-center', 'justify-center', 'z-50', 'bg-black', 'bg-opacity-50');
    var alertBox = document.createElement('div');
    alertBox.classList.add('alert', 'alert-error', 'flex', 'p-4', 'bg-white', 'rounded-lg', 'shadow-lg', 'mx-auto', 'max-w-3xl');
    alertDiv.appendChild(alertBox);
    var svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElement.classList.add('stroke-current', 'shrink-0', 'h-6', 'w-6');
    svgElement.setAttribute('fill', 'none');
    svgElement.setAttribute('viewBox', '0 0 24 24');
    svgElement.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />';
    alertBox.appendChild(svgElement);
    var spanElement = document.createElement('span');
    spanElement.textContent = message;
    alertBox.appendChild(spanElement);
    var okButton = document.createElement('button');
    okButton.classList.add('btn', 'btn-primary', 'ml-4');
    okButton.textContent = 'OK';
    alertBox.appendChild(okButton);
    okButton.addEventListener('click', function () {
      document.body.removeChild(alertDiv);
    });
    document.body.appendChild(alertDiv);
  }
  function processRegistrationSuccessForHumanPlayers(appContext) {
    appContext.playerOne.placeShip(appContext.cellSelected, appContext.orientation.isVertical, appContext.currentShipName, appContext.currentShipSize, appContext);
    highlightShipPlacementModule.highlightModule.updateHighlightedFromSelectedToRegistered(appContext);
    appContext.appElements.chooseForMeButton.classList.add("hidden");
  }
  function processRegistrationFailureForHumanPlayers(appContext, player) {
    highlightShipPlacementModule.highlightModule.removeHighlightedSelections(appContext);
    appContext.highlightedArray.length = 0;
    highlightShipPlacementModule.highlightEventListenerModule.addHighlightShipEventListener(appContext, player);
    showAlert('That placement is invalid. Please try again!');
  }
  function registerPlaceShipForHumanPlayers(appContext, player) {
    return new Promise(function (resolve) {
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
    registerPlaceShipForHumanPlayers: registerPlaceShipForHumanPlayers,
    registerPlaceShipForPlayerComputer: registerPlaceShipForPlayerComputer,
    showAlert: showAlert
  };
}();
module.exports = {
  registerShipModule: registerShipModule
};

/***/ }),

/***/ "./src/modules/submitButtonEventListenerModule.js":
/*!********************************************************!*\
  !*** ./src/modules/submitButtonEventListenerModule.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var _require = __webpack_require__(/*! ./registerShipModule */ "./src/modules/registerShipModule.js"),
  registerShipModule = _require.registerShipModule;
var submitButtonEventListenerModule = function () {
  function toggleSubmitButtonOff(appContext) {
    appContext.appElements.submitButton.classList.add("hidden");
  }
  function generateSubmitButtonEventListener(resolve, appContext, player) {
    return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var placementSuccessful;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return registerShipModule.registerPlaceShipForHumanPlayers(appContext, player);
          case 2:
            placementSuccessful = _context.sent;
            if (placementSuccessful) {
              toggleSubmitButtonOff(appContext);
              resolve();
            } else {
              toggleSubmitButtonOff(appContext);
            }
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
  }
  function removeOldSubmitButtonListener(appContext) {
    if (appContext.submitButtonListener) {
      appContext.appElements.submitButton.removeEventListener('click', appContext.submitButtonListener);
    }
  }
  function processNewSubmitButtonListener(resolve, appContext, player) {
    appContext.submitButtonListener = generateSubmitButtonEventListener(resolve, appContext, player);
    appContext.appElements.submitButton.addEventListener('click', appContext.submitButtonListener);
  }
  function addSubmitButtonEventListener(appContext, player) {
    return new Promise(function (resolve) {
      removeOldSubmitButtonListener(appContext);
      processNewSubmitButtonListener(resolve, appContext, player);
    });
  }
  return {
    addSubmitButtonEventListener: addSubmitButtonEventListener,
    toggleSubmitButtonOff: toggleSubmitButtonOff
  };
}();
module.exports = {
  submitButtonEventListenerModule: submitButtonEventListenerModule
};

/***/ }),

/***/ "./src/modules/winStateModule.js":
/*!***************************************!*\
  !*** ./src/modules/winStateModule.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(/*! ./registerShipModule */ "./src/modules/registerShipModule.js"),
  registerShipModule = _require.registerShipModule;
var winStateModule = function () {
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
    if (arePlayerComputerShipsSunk(appContext)) {
      registerShipModule.showAlert('Congratulations!!! You have bested the computer and defeated all their ships.');
    }
    if (arePlayerOneShipsSunk(appContext)) {
      registerShipModule.showAlert('Tough day! You were defeated this time.');
    }
  }
  return {
    checkBothPlayersIfAllShipsSunk: checkBothPlayersIfAllShipsSunk
  };
}();
module.exports = {
  winStateModule: winStateModule
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/styles.css":
/*!********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/styles.css ***!
  \********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*
! tailwindcss v3.3.2 | MIT License | https://tailwindcss.com
*//*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

::before,
::after {
  --tw-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
*/

html {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -moz-tab-size: 4; /* 3 */
  -o-tab-size: 4;
     tab-size: 4; /* 3 */
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */
  font-feature-settings: normal; /* 5 */
  font-variation-settings: normal; /* 6 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

body {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
1. Use the user's configured \`mono\` font family by default.
2. Correct the odd \`em\` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

input::placeholder,
textarea::placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled {
  cursor: default;
}

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden] {
  display: none;
}

:root,
[data-theme] {
  background-color: hsl(var(--b1) / var(--tw-bg-opacity, 1));
  color: hsl(var(--bc) / var(--tw-text-opacity, 1));
}

html {
  -webkit-tap-highlight-color: transparent;
}

:root {
  color-scheme: light;
  --pf: 259 94% 44%;
  --sf: 314 100% 40%;
  --af: 174 75% 39%;
  --nf: 214 20% 14%;
  --in: 198 93% 60%;
  --su: 158 64% 52%;
  --wa: 43 96% 56%;
  --er: 0 91% 71%;
  --inc: 198 100% 12%;
  --suc: 158 100% 10%;
  --wac: 43 100% 11%;
  --erc: 0 100% 14%;
  --rounded-box: 1rem;
  --rounded-btn: 0.5rem;
  --rounded-badge: 1.9rem;
  --animation-btn: 0.25s;
  --animation-input: .2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --p: 259 94% 51%;
  --pc: 259 96% 91%;
  --s: 314 100% 47%;
  --sc: 314 100% 91%;
  --a: 174 75% 46%;
  --ac: 174 75% 11%;
  --n: 214 20% 21%;
  --nc: 212 19% 87%;
  --b1: 0 0% 100%;
  --b2: 0 0% 95%;
  --b3: 180 2% 90%;
  --bc: 215 28% 17%;
}

@media (prefers-color-scheme: dark) {

  :root {
    color-scheme: dark;
    --pf: 262 80% 43%;
    --sf: 316 70% 43%;
    --af: 175 70% 34%;
    --in: 198 93% 60%;
    --su: 158 64% 52%;
    --wa: 43 96% 56%;
    --er: 0 91% 71%;
    --inc: 198 100% 12%;
    --suc: 158 100% 10%;
    --wac: 43 100% 11%;
    --erc: 0 100% 14%;
    --rounded-box: 1rem;
    --rounded-btn: 0.5rem;
    --rounded-badge: 1.9rem;
    --animation-btn: 0.25s;
    --animation-input: .2s;
    --btn-text-case: uppercase;
    --btn-focus-scale: 0.95;
    --border-btn: 1px;
    --tab-border: 1px;
    --tab-radius: 0.5rem;
    --p: 262 80% 50%;
    --pc: 0 0% 100%;
    --s: 316 70% 50%;
    --sc: 0 0% 100%;
    --a: 175 70% 41%;
    --ac: 0 0% 100%;
    --n: 213 18% 20%;
    --nf: 212 17% 17%;
    --nc: 220 13% 69%;
    --b1: 212 18% 14%;
    --b2: 213 18% 12%;
    --b3: 213 18% 10%;
    --bc: 220 13% 69%;
  }
}

[data-theme=light] {
  color-scheme: light;
  --pf: 259 94% 44%;
  --sf: 314 100% 40%;
  --af: 174 75% 39%;
  --nf: 214 20% 14%;
  --in: 198 93% 60%;
  --su: 158 64% 52%;
  --wa: 43 96% 56%;
  --er: 0 91% 71%;
  --inc: 198 100% 12%;
  --suc: 158 100% 10%;
  --wac: 43 100% 11%;
  --erc: 0 100% 14%;
  --rounded-box: 1rem;
  --rounded-btn: 0.5rem;
  --rounded-badge: 1.9rem;
  --animation-btn: 0.25s;
  --animation-input: .2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --p: 259 94% 51%;
  --pc: 259 96% 91%;
  --s: 314 100% 47%;
  --sc: 314 100% 91%;
  --a: 174 75% 46%;
  --ac: 174 75% 11%;
  --n: 214 20% 21%;
  --nc: 212 19% 87%;
  --b1: 0 0% 100%;
  --b2: 0 0% 95%;
  --b3: 180 2% 90%;
  --bc: 215 28% 17%;
}

[data-theme=dark] {
  color-scheme: dark;
  --pf: 262 80% 43%;
  --sf: 316 70% 43%;
  --af: 175 70% 34%;
  --in: 198 93% 60%;
  --su: 158 64% 52%;
  --wa: 43 96% 56%;
  --er: 0 91% 71%;
  --inc: 198 100% 12%;
  --suc: 158 100% 10%;
  --wac: 43 100% 11%;
  --erc: 0 100% 14%;
  --rounded-box: 1rem;
  --rounded-btn: 0.5rem;
  --rounded-badge: 1.9rem;
  --animation-btn: 0.25s;
  --animation-input: .2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --p: 262 80% 50%;
  --pc: 0 0% 100%;
  --s: 316 70% 50%;
  --sc: 0 0% 100%;
  --a: 175 70% 41%;
  --ac: 0 0% 100%;
  --n: 213 18% 20%;
  --nf: 212 17% 17%;
  --nc: 220 13% 69%;
  --b1: 212 18% 14%;
  --b2: 213 18% 12%;
  --b3: 213 18% 10%;
  --bc: 220 13% 69%;
}

[data-theme=cupcake] {
  color-scheme: light;
  --pf: 183 47% 52%;
  --sf: 338 71% 71%;
  --af: 39 84% 51%;
  --nf: 280 46% 7%;
  --in: 198 93% 60%;
  --su: 158 64% 52%;
  --wa: 43 96% 56%;
  --er: 0 91% 71%;
  --pc: 183 20% 13%;
  --sc: 340 15% 16%;
  --ac: 37 41% 13%;
  --nc: 283 9% 81%;
  --inc: 198 100% 12%;
  --suc: 158 100% 10%;
  --wac: 43 100% 11%;
  --erc: 0 100% 14%;
  --rounded-box: 1rem;
  --rounded-badge: 1.9rem;
  --animation-btn: 0.25s;
  --animation-input: .2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --p: 183 47% 59%;
  --s: 338 71% 78%;
  --a: 39 84% 58%;
  --n: 280 46% 14%;
  --b1: 24 33% 97%;
  --b2: 27 22% 92%;
  --b3: 23 14% 89%;
  --bc: 280 46% 14%;
  --rounded-btn: 1.9rem;
  --tab-border: 2px;
  --tab-radius: .5rem;
}

[data-theme=bumblebee] {
  color-scheme: light;
  --pf: 50 94% 51%;
  --sf: 41 74% 46%;
  --af: 24 67% 52%;
  --nf: 240 33% 7%;
  --b2: 0 0% 93%;
  --b3: 0 0% 86%;
  --in: 198 93% 60%;
  --su: 158 64% 52%;
  --wa: 43 96% 56%;
  --er: 0 91% 71%;
  --bc: 146 0% 19%;
  --ac: 23 34% 13%;
  --nc: 247 7% 81%;
  --inc: 198 100% 12%;
  --suc: 158 100% 10%;
  --wac: 43 100% 11%;
  --erc: 0 100% 14%;
  --rounded-box: 1rem;
  --rounded-btn: 0.5rem;
  --rounded-badge: 1.9rem;
  --animation-btn: 0.25s;
  --animation-input: .2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --p: 50 94% 58%;
  --pc: 240 33% 14%;
  --s: 41 74% 53%;
  --sc: 240 33% 14%;
  --a: 24 67% 59%;
  --n: 240 33% 14%;
  --b1: 0 0% 100%;
}

[data-theme=emerald] {
  color-scheme: light;
  --pf: 141 50% 53%;
  --sf: 219 96% 53%;
  --af: 10 81% 49%;
  --nf: 219 20% 18%;
  --b2: 0 0% 93%;
  --b3: 0 0% 86%;
  --in: 198 93% 60%;
  --su: 158 64% 52%;
  --wa: 43 96% 56%;
  --er: 0 91% 71%;
  --inc: 198 100% 12%;
  --suc: 158 100% 10%;
  --wac: 43 100% 11%;
  --erc: 0 100% 14%;
  --rounded-box: 1rem;
  --rounded-btn: 0.5rem;
  --rounded-badge: 1.9rem;
  --btn-text-case: uppercase;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --p: 141 50% 60%;
  --pc: 151 28% 19%;
  --s: 219 96% 60%;
  --sc: 210 20% 98%;
  --a: 10 81% 56%;
  --ac: 210 20% 98%;
  --n: 219 20% 25%;
  --nc: 210 20% 98%;
  --b1: 0 0% 100%;
  --bc: 219 20% 25%;
  --animation-btn: 0;
  --animation-input: 0;
  --btn-focus-scale: 1;
}

[data-theme=corporate] {
  color-scheme: light;
  --pf: 229 96% 57%;
  --sf: 215 26% 52%;
  --af: 154 49% 53%;
  --nf: 233 27% 6%;
  --b2: 0 0% 93%;
  --b3: 0 0% 86%;
  --in: 198 93% 60%;
  --su: 158 64% 52%;
  --wa: 43 96% 56%;
  --er: 0 91% 71%;
  --pc: 243 100% 94%;
  --sc: 216 13% 13%;
  --ac: 151 21% 13%;
  --inc: 198 100% 12%;
  --suc: 158 100% 10%;
  --wac: 43 100% 11%;
  --erc: 0 100% 14%;
  --btn-text-case: uppercase;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --p: 229 96% 64%;
  --s: 215 26% 59%;
  --a: 154 49% 60%;
  --n: 233 27% 13%;
  --nc: 210 38% 95%;
  --b1: 0 0% 100%;
  --bc: 233 27% 13%;
  --rounded-box: 0.25rem;
  --rounded-btn: .125rem;
  --rounded-badge: .125rem;
  --animation-btn: 0;
  --animation-input: 0;
  --btn-focus-scale: 1;
}

[data-theme=synthwave] {
  color-scheme: dark;
  --pf: 321 70% 62%;
  --sf: 197 87% 58%;
  --af: 48 89% 50%;
  --nf: 253 59% 13%;
  --b2: 253 58% 8%;
  --b3: 253 58% 1%;
  --pc: 323 23% 15%;
  --sc: 199 28% 14%;
  --ac: 45 42% 13%;
  --rounded-box: 1rem;
  --rounded-btn: 0.5rem;
  --rounded-badge: 1.9rem;
  --animation-btn: 0.25s;
  --animation-input: .2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --p: 321 70% 69%;
  --s: 197 87% 65%;
  --a: 48 89% 57%;
  --n: 253 59% 20%;
  --nc: 260 60% 98%;
  --b1: 253 58% 15%;
  --bc: 260 60% 98%;
  --in: 199 87% 64%;
  --inc: 257 63% 17%;
  --su: 168 74% 68%;
  --suc: 257 63% 17%;
  --wa: 48 89% 57%;
  --wac: 257 63% 17%;
  --er: 352 74% 57%;
  --erc: 260 60% 98%;
}

[data-theme=retro] {
  color-scheme: light;
  --pf: 3 74% 69%;
  --sf: 145 27% 65%;
  --af: 24 67% 52%;
  --nf: 340 7% 10%;
  --inc: 239 85% 93%;
  --suc: 126 38% 89%;
  --wac: 29 59% 11%;
  --erc: 11 100% 91%;
  --animation-btn: 0.25s;
  --animation-input: .2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --p: 3 74% 76%;
  --pc: 345 5% 15%;
  --s: 145 27% 72%;
  --sc: 345 5% 15%;
  --a: 24 67% 59%;
  --ac: 345 5% 15%;
  --n: 340 7% 17%;
  --nc: 43 41% 88%;
  --b1: 45 47% 80%;
  --b2: 44 47% 73%;
  --b3: 44 47% 68%;
  --bc: 345 5% 15%;
  --in: 221 83% 53%;
  --su: 142 76% 36%;
  --wa: 32 95% 44%;
  --er: 0 72% 51%;
  --rounded-box: 0.4rem;
  --rounded-btn: 0.4rem;
  --rounded-badge: 0.4rem;
}

[data-theme=cyberpunk] {
  color-scheme: light;
  --pf: 345 100% 66%;
  --sf: 195 80% 63%;
  --af: 276 74% 64%;
  --nf: 57 100% 6%;
  --b2: 56 100% 43%;
  --b3: 56 100% 36%;
  --in: 198 93% 60%;
  --su: 158 64% 52%;
  --wa: 43 96% 56%;
  --er: 0 91% 71%;
  --bc: 53 46% 13%;
  --pc: 348 27% 15%;
  --sc: 196 23% 15%;
  --ac: 277 22% 15%;
  --inc: 198 100% 12%;
  --suc: 158 100% 10%;
  --wac: 43 100% 11%;
  --erc: 0 100% 14%;
  --animation-btn: 0.25s;
  --animation-input: .2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --tab-border: 1px;
  font-family: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;
  --p: 345 100% 73%;
  --s: 195 80% 70%;
  --a: 276 74% 71%;
  --n: 57 100% 13%;
  --nc: 56 100% 50%;
  --b1: 56 100% 50%;
  --rounded-box: 0;
  --rounded-btn: 0;
  --rounded-badge: 0;
  --tab-radius: 0;
}

[data-theme=valentine] {
  color-scheme: light;
  --pf: 353 74% 60%;
  --sf: 254 86% 70%;
  --af: 181 56% 63%;
  --nf: 336 43% 41%;
  --b2: 318 46% 82%;
  --b3: 318 46% 75%;
  --pc: 356 26% 14%;
  --sc: 256 20% 15%;
  --ac: 181 16% 15%;
  --inc: 239 85% 93%;
  --suc: 126 38% 89%;
  --wac: 29 59% 11%;
  --erc: 11 100% 91%;
  --rounded-box: 1rem;
  --rounded-badge: 1.9rem;
  --animation-btn: 0.25s;
  --animation-input: .2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --p: 353 74% 67%;
  --s: 254 86% 77%;
  --a: 181 56% 70%;
  --n: 336 43% 48%;
  --nc: 318 46% 89%;
  --b1: 318 46% 89%;
  --bc: 344 38% 28%;
  --in: 221 83% 53%;
  --su: 142 76% 36%;
  --wa: 32 95% 44%;
  --er: 0 72% 51%;
  --rounded-btn: 1.9rem;
}

[data-theme=halloween] {
  color-scheme: dark;
  --pf: 32 89% 45%;
  --sf: 271 46% 35%;
  --af: 91 100% 26%;
  --nf: 31 81% 3%;
  --b2: 0 0% 6%;
  --b3: 0 0% 0%;
  --bc: 145 0% 81%;
  --sc: 275 36% 88%;
  --nc: 26 11% 80%;
  --inc: 239 85% 93%;
  --suc: 126 38% 89%;
  --wac: 29 59% 11%;
  --erc: 11 100% 91%;
  --rounded-box: 1rem;
  --rounded-btn: 0.5rem;
  --rounded-badge: 1.9rem;
  --animation-btn: 0.25s;
  --animation-input: .2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --p: 32 89% 52%;
  --pc: 180 7% 8%;
  --s: 271 46% 42%;
  --a: 91 100% 33%;
  --ac: 0 0% 0%;
  --n: 31 81% 10%;
  --b1: 0 0% 13%;
  --in: 221 83% 53%;
  --su: 142 76% 36%;
  --wa: 32 95% 44%;
  --er: 0 72% 51%;
}

[data-theme=garden] {
  color-scheme: light;
  --pf: 331 100% 41%;
  --sf: 334 37% 34%;
  --af: 139 16% 36%;
  --nf: 44 100% 1%;
  --b2: 0 4% 84%;
  --b3: 0 4% 77%;
  --in: 198 93% 60%;
  --su: 158 64% 52%;
  --wa: 43 96% 56%;
  --er: 0 91% 71%;
  --pc: 346 100% 93%;
  --sc: 340 30% 88%;
  --ac: 136 12% 88%;
  --inc: 198 100% 12%;
  --suc: 158 100% 10%;
  --wac: 43 100% 11%;
  --erc: 0 100% 14%;
  --rounded-box: 1rem;
  --rounded-btn: 0.5rem;
  --rounded-badge: 1.9rem;
  --animation-btn: 0.25s;
  --animation-input: .2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --p: 331 100% 48%;
  --s: 334 37% 41%;
  --a: 139 16% 43%;
  --n: 44 100% 8%;
  --nc: 0 4% 91%;
  --b1: 0 4% 91%;
  --bc: 0 3% 6%;
}

[data-theme=forest] {
  color-scheme: dark;
  --pf: 141 72% 35%;
  --sf: 164 73% 35%;
  --af: 175 73% 35%;
  --nf: 161 37% 8%;
  --b2: 0 12% 1%;
  --b3: 0 0% 0%;
  --in: 198 93% 60%;
  --su: 158 64% 52%;
  --wa: 43 96% 56%;
  --er: 0 91% 71%;
  --bc: 360 1% 79%;
  --sc: 158 32% 11%;
  --ac: 172 31% 11%;
  --nc: 157 7% 81%;
  --inc: 198 100% 12%;
  --suc: 158 100% 10%;
  --wac: 43 100% 11%;
  --erc: 0 100% 14%;
  --rounded-box: 1rem;
  --rounded-badge: 1.9rem;
  --animation-btn: 0.25s;
  --animation-input: .2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --p: 141 72% 42%;
  --pc: 0 0% 0%;
  --s: 164 73% 42%;
  --a: 175 73% 42%;
  --n: 161 37% 15%;
  --b1: 0 12% 8%;
  --rounded-btn: 1.9rem;
}

[data-theme=aqua] {
  color-scheme: dark;
  --pf: 182 93% 42%;
  --sf: 274 31% 50%;
  --af: 47 100% 73%;
  --nf: 205 54% 43%;
  --b2: 219 53% 36%;
  --b3: 219 53% 29%;
  --bc: 228 38% 89%;
  --sc: 276 17% 12%;
  --ac: 46 19% 16%;
  --nc: 212 51% 91%;
  --inc: 239 85% 93%;
  --suc: 126 38% 89%;
  --wac: 29 59% 11%;
  --erc: 11 100% 91%;
  --rounded-box: 1rem;
  --rounded-btn: 0.5rem;
  --rounded-badge: 1.9rem;
  --animation-btn: 0.25s;
  --animation-input: .2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --p: 182 93% 49%;
  --pc: 181 100% 17%;
  --s: 274 31% 57%;
  --a: 47 100% 80%;
  --n: 205 54% 50%;
  --b1: 219 53% 43%;
  --in: 221 83% 53%;
  --su: 142 76% 36%;
  --wa: 32 95% 44%;
  --er: 0 72% 51%;
}

[data-theme=lofi] {
  color-scheme: light;
  --pf: 0 0% 0%;
  --sf: 0 2% 3%;
  --af: 0 0% 8%;
  --nf: 0 0% 0%;
  --btn-text-case: uppercase;
  --border-btn: 1px;
  --tab-border: 1px;
  --p: 0 0% 5%;
  --pc: 0 0% 100%;
  --s: 0 2% 10%;
  --sc: 0 0% 100%;
  --a: 0 0% 15%;
  --ac: 0 0% 100%;
  --n: 0 0% 0%;
  --nc: 0 0% 100%;
  --b1: 0 0% 100%;
  --b2: 0 0% 95%;
  --b3: 0 2% 90%;
  --bc: 0 0% 0%;
  --in: 212 100% 48%;
  --inc: 0 0% 100%;
  --su: 137 72% 46%;
  --suc: 0 0% 0%;
  --wa: 5 100% 66%;
  --wac: 0 0% 100%;
  --er: 325 78% 49%;
  --erc: 0 0% 100%;
  --rounded-box: 0.25rem;
  --rounded-btn: 0.125rem;
  --rounded-badge: 0.125rem;
  --animation-btn: 0;
  --animation-input: 0;
  --btn-focus-scale: 1;
  --tab-radius: 0;
}

[data-theme=pastel] {
  color-scheme: light;
  --pf: 284 22% 73%;
  --sf: 352 70% 81%;
  --af: 158 55% 74%;
  --nf: 199 44% 54%;
  --in: 198 93% 60%;
  --su: 158 64% 52%;
  --wa: 43 96% 56%;
  --er: 0 91% 71%;
  --bc: 146 0% 19%;
  --pc: 284 4% 16%;
  --sc: 352 7% 17%;
  --ac: 158 10% 16%;
  --nc: 200 19% 13%;
  --inc: 198 100% 12%;
  --suc: 158 100% 10%;
  --wac: 43 100% 11%;
  --erc: 0 100% 14%;
  --rounded-box: 1rem;
  --rounded-badge: 1.9rem;
  --animation-btn: 0.25s;
  --animation-input: .2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --p: 284 22% 80%;
  --s: 352 70% 88%;
  --a: 158 55% 81%;
  --n: 199 44% 61%;
  --b1: 0 0% 100%;
  --b2: 210 20% 98%;
  --b3: 216 12% 84%;
  --rounded-btn: 1.9rem;
}

[data-theme=fantasy] {
  color-scheme: light;
  --pf: 296 83% 18%;
  --sf: 200 100% 30%;
  --af: 31 94% 44%;
  --nf: 215 28% 10%;
  --b2: 0 0% 93%;
  --b3: 0 0% 86%;
  --in: 198 93% 60%;
  --su: 158 64% 52%;
  --wa: 43 96% 56%;
  --er: 0 91% 71%;
  --pc: 302 27% 85%;
  --sc: 212 51% 90%;
  --ac: 28 57% 12%;
  --nc: 218 6% 82%;
  --inc: 198 100% 12%;
  --suc: 158 100% 10%;
  --wac: 43 100% 11%;
  --erc: 0 100% 14%;
  --rounded-box: 1rem;
  --rounded-btn: 0.5rem;
  --rounded-badge: 1.9rem;
  --animation-btn: 0.25s;
  --animation-input: .2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --p: 296 83% 25%;
  --s: 200 100% 37%;
  --a: 31 94% 51%;
  --n: 215 28% 17%;
  --b1: 0 0% 100%;
  --bc: 215 28% 17%;
}

[data-theme=wireframe] {
  color-scheme: light;
  --pf: 0 0% 65%;
  --sf: 0 0% 65%;
  --af: 0 0% 65%;
  --nf: 0 0% 85%;
  --bc: 146 0% 19%;
  --pc: 145 0% 15%;
  --sc: 145 0% 15%;
  --ac: 145 0% 15%;
  --nc: 145 0% 18%;
  --inc: 263 100% 91%;
  --suc: 105 32% 85%;
  --wac: 58 21% 11%;
  --erc: 17 100% 90%;
  --animation-btn: 0.25s;
  --animation-input: .2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --tab-border: 1px;
  font-family: Chalkboard,comic sans ms,"sanssecondaryerif";
  --p: 0 0% 72%;
  --s: 0 0% 72%;
  --a: 0 0% 72%;
  --n: 0 0% 92%;
  --b1: 0 0% 100%;
  --b2: 0 0% 93%;
  --b3: 0 0% 87%;
  --in: 240 100% 50%;
  --su: 120 100% 25%;
  --wa: 60 30% 50%;
  --er: 0 100% 50%;
  --rounded-box: 0.2rem;
  --rounded-btn: 0.2rem;
  --rounded-badge: 0.2rem;
  --tab-radius: 0.2rem;
}

[data-theme=black] {
  color-scheme: dark;
  --pf: 0 2% 13%;
  --sf: 0 2% 13%;
  --af: 0 2% 13%;
  --bc: 145 0% 78%;
  --pc: 0 1% 82%;
  --sc: 0 1% 82%;
  --ac: 0 1% 82%;
  --nc: 0 0% 81%;
  --inc: 263 100% 91%;
  --suc: 105 32% 85%;
  --wac: 58 45% 13%;
  --erc: 17 100% 90%;
  --border-btn: 1px;
  --tab-border: 1px;
  --p: 0 2% 20%;
  --s: 0 2% 20%;
  --a: 0 2% 20%;
  --b1: 0 0% 0%;
  --b2: 0 0% 5%;
  --b3: 0 2% 10%;
  --n: 0 1% 15%;
  --nf: 0 2% 20%;
  --in: 240 100% 50%;
  --su: 120 100% 25%;
  --wa: 60 100% 50%;
  --er: 0 100% 50%;
  --rounded-box: 0;
  --rounded-btn: 0;
  --rounded-badge: 0;
  --animation-btn: 0;
  --animation-input: 0;
  --btn-text-case: lowercase;
  --btn-focus-scale: 1;
  --tab-radius: 0;
}

[data-theme=luxury] {
  color-scheme: dark;
  --pf: 0 0% 93%;
  --sf: 218 54% 11%;
  --af: 319 22% 19%;
  --nf: 28 100% 3%;
  --pc: 146 0% 19%;
  --sc: 227 12% 82%;
  --ac: 322 9% 84%;
  --inc: 205 27% 15%;
  --suc: 88 35% 12%;
  --wac: 52 28% 14%;
  --erc: 3 31% 15%;
  --rounded-box: 1rem;
  --rounded-btn: 0.5rem;
  --rounded-badge: 1.9rem;
  --animation-btn: 0.25s;
  --animation-input: .2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --p: 0 0% 100%;
  --s: 218 54% 18%;
  --a: 319 22% 26%;
  --n: 28 100% 10%;
  --nc: 44 100% 82%;
  --b1: 240 10% 4%;
  --b2: 270 4% 9%;
  --b3: 270 2% 18%;
  --bc: 37 67% 58%;
  --in: 202 100% 70%;
  --su: 89 62% 52%;
  --wa: 54 69% 64%;
  --er: 0 100% 72%;
}

[data-theme=dracula] {
  color-scheme: dark;
  --pf: 326 100% 67%;
  --sf: 265 89% 71%;
  --af: 31 100% 64%;
  --nf: 230 15% 23%;
  --b2: 231 15% 11%;
  --b3: 231 15% 4%;
  --pc: 328 26% 15%;
  --sc: 266 19% 16%;
  --ac: 30 30% 15%;
  --nc: 232 7% 85%;
  --inc: 191 20% 16%;
  --suc: 128 30% 14%;
  --wac: 64 20% 15%;
  --erc: 5 39% 14%;
  --rounded-box: 1rem;
  --rounded-btn: 0.5rem;
  --rounded-badge: 1.9rem;
  --animation-btn: 0.25s;
  --animation-input: .2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --p: 326 100% 74%;
  --s: 265 89% 78%;
  --a: 31 100% 71%;
  --n: 230 15% 30%;
  --b1: 231 15% 18%;
  --bc: 60 30% 96%;
  --in: 191 97% 77%;
  --su: 135 94% 65%;
  --wa: 65 92% 76%;
  --er: 0 100% 67%;
}

[data-theme=cmyk] {
  color-scheme: light;
  --pf: 203 83% 53%;
  --sf: 335 78% 53%;
  --af: 56 100% 53%;
  --nf: 0 0% 3%;
  --b2: 0 0% 93%;
  --b3: 0 0% 86%;
  --bc: 146 0% 19%;
  --pc: 207 32% 14%;
  --sc: 344 100% 93%;
  --ac: 54 41% 14%;
  --nc: 145 0% 80%;
  --inc: 194 26% 12%;
  --suc: 295 30% 87%;
  --wac: 24 46% 13%;
  --erc: 12 100% 91%;
  --rounded-box: 1rem;
  --rounded-btn: 0.5rem;
  --rounded-badge: 1.9rem;
  --animation-btn: 0.25s;
  --animation-input: .2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --p: 203 83% 60%;
  --s: 335 78% 60%;
  --a: 56 100% 60%;
  --n: 0 0% 10%;
  --b1: 0 0% 100%;
  --in: 192 48% 52%;
  --su: 291 48% 38%;
  --wa: 25 85% 57%;
  --er: 4 81% 56%;
}

[data-theme=autumn] {
  color-scheme: light;
  --pf: 344 96% 21%;
  --sf: 0 63% 51%;
  --af: 27 56% 56%;
  --nf: 22 17% 37%;
  --b2: 0 0% 88%;
  --b3: 0 0% 81%;
  --bc: 145 0% 18%;
  --pc: 2 46% 87%;
  --sc: 6 87% 92%;
  --ac: 27 25% 13%;
  --nc: 21 15% 88%;
  --inc: 188 26% 12%;
  --suc: 161 25% 89%;
  --wac: 28 55% 12%;
  --erc: 8 100% 91%;
  --rounded-box: 1rem;
  --rounded-btn: 0.5rem;
  --rounded-badge: 1.9rem;
  --animation-btn: 0.25s;
  --animation-input: .2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --p: 344 96% 28%;
  --s: 0 63% 58%;
  --a: 27 56% 63%;
  --n: 22 17% 44%;
  --b1: 0 0% 95%;
  --in: 187 48% 50%;
  --su: 165 34% 43%;
  --wa: 30 84% 50%;
  --er: 354 79% 49%;
}

[data-theme=business] {
  color-scheme: dark;
  --pf: 210 64% 24%;
  --sf: 200 13% 48%;
  --af: 13 80% 53%;
  --nf: 213 14% 9%;
  --b2: 0 0% 6%;
  --b3: 0 0% 0%;
  --bc: 145 0% 80%;
  --pc: 219 26% 86%;
  --sc: 200 7% 12%;
  --ac: 14 40% 13%;
  --nc: 214 3% 81%;
  --inc: 210 64% 91%;
  --suc: 141 16% 12%;
  --wac: 37 30% 13%;
  --erc: 11 59% 89%;
  --animation-btn: 0.25s;
  --animation-input: .2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --p: 210 64% 31%;
  --s: 200 13% 55%;
  --a: 13 80% 60%;
  --n: 213 14% 16%;
  --b1: 0 0% 13%;
  --in: 199 100% 42%;
  --su: 144 31% 56%;
  --wa: 39 64% 60%;
  --er: 6 56% 43%;
  --rounded-box: 0.25rem;
  --rounded-btn: .125rem;
  --rounded-badge: .125rem;
}

[data-theme=acid] {
  color-scheme: light;
  --pf: 303 100% 43%;
  --sf: 27 100% 43%;
  --af: 72 98% 43%;
  --nf: 238 43% 10%;
  --b2: 0 0% 91%;
  --b3: 0 0% 84%;
  --bc: 145 0% 19%;
  --pc: 302 100% 93%;
  --sc: 25 62% 12%;
  --ac: 73 44% 13%;
  --nc: 248 11% 82%;
  --inc: 217 36% 14%;
  --suc: 145 23% 13%;
  --wac: 50 42% 13%;
  --erc: 15 100% 90%;
  --animation-btn: 0.25s;
  --animation-input: .2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --p: 303 100% 50%;
  --s: 27 100% 50%;
  --a: 72 98% 50%;
  --n: 238 43% 17%;
  --b1: 0 0% 98%;
  --in: 210 92% 58%;
  --su: 149 50% 58%;
  --wa: 53 93% 57%;
  --er: 1 100% 45%;
  --rounded-box: 1.25rem;
  --rounded-btn: 1rem;
  --rounded-badge: 1rem;
}

[data-theme=lemonade] {
  color-scheme: light;
  --pf: 89 96% 24%;
  --sf: 60 81% 48%;
  --af: 63 80% 81%;
  --nf: 238 43% 10%;
  --b2: 0 0% 93%;
  --b3: 0 0% 86%;
  --bc: 146 0% 19%;
  --pc: 89 39% 87%;
  --sc: 58 39% 13%;
  --ac: 62 8% 17%;
  --nc: 248 11% 82%;
  --inc: 192 5% 17%;
  --suc: 74 15% 16%;
  --wac: 49 21% 15%;
  --erc: 2 11% 16%;
  --rounded-box: 1rem;
  --rounded-btn: 0.5rem;
  --rounded-badge: 1.9rem;
  --animation-btn: 0.25s;
  --animation-input: .2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --p: 89 96% 31%;
  --s: 60 81% 55%;
  --a: 63 80% 88%;
  --n: 238 43% 17%;
  --b1: 0 0% 100%;
  --in: 192 39% 85%;
  --su: 74 76% 79%;
  --wa: 50 87% 75%;
  --er: 1 70% 83%;
}

[data-theme=night] {
  color-scheme: dark;
  --pf: 198 93% 53%;
  --sf: 234 89% 67%;
  --af: 329 86% 63%;
  --b2: 222 47% 4%;
  --b3: 0 0% 0%;
  --bc: 229 7% 80%;
  --pc: 202 34% 14%;
  --sc: 239 22% 15%;
  --ac: 332 26% 15%;
  --nc: 221 7% 82%;
  --suc: 169 31% 13%;
  --wac: 39 36% 14%;
  --erc: 354 28% 15%;
  --rounded-box: 1rem;
  --rounded-btn: 0.5rem;
  --rounded-badge: 1.9rem;
  --animation-btn: 0.25s;
  --animation-input: .2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --p: 198 93% 60%;
  --s: 234 89% 74%;
  --a: 329 86% 70%;
  --n: 217 33% 17%;
  --nf: 217 30% 22%;
  --b1: 222 47% 11%;
  --in: 198 90% 48%;
  --inc: 0 0% 0%;
  --su: 172 66% 50%;
  --wa: 41 88% 64%;
  --er: 351 95% 71%;
}

[data-theme=coffee] {
  color-scheme: dark;
  --pf: 30 67% 51%;
  --sf: 182 25% 13%;
  --af: 194 74% 18%;
  --nf: 0 0% 0%;
  --b2: 306 19% 4%;
  --b3: 0 0% 0%;
  --pc: 28 35% 13%;
  --sc: 182 6% 83%;
  --ac: 199 20% 85%;
  --nc: 300 1% 79%;
  --inc: 170 12% 14%;
  --suc: 92 11% 13%;
  --wac: 41 33% 14%;
  --erc: 11 25% 15%;
  --rounded-box: 1rem;
  --rounded-btn: 0.5rem;
  --rounded-badge: 1.9rem;
  --animation-btn: 0.25s;
  --animation-input: .2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --p: 30 67% 58%;
  --s: 182 25% 20%;
  --a: 194 74% 25%;
  --n: 300 20% 6%;
  --b1: 306 19% 11%;
  --bc: 37 8% 42%;
  --in: 171 37% 67%;
  --su: 93 25% 62%;
  --wa: 43 100% 69%;
  --er: 10 95% 75%;
}

[data-theme=winter] {
  color-scheme: light;
  --pf: 212 100% 44%;
  --sf: 247 47% 36%;
  --af: 310 49% 45%;
  --nf: 217 92% 3%;
  --pc: 231 100% 93%;
  --sc: 256 40% 88%;
  --ac: 316 56% 91%;
  --nc: 229 10% 80%;
  --inc: 192 18% 16%;
  --suc: 181 16% 14%;
  --wac: 32 9% 16%;
  --erc: 2 19% 15%;
  --rounded-box: 1rem;
  --rounded-btn: 0.5rem;
  --rounded-badge: 1.9rem;
  --animation-btn: 0.25s;
  --animation-input: .2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
  --p: 212 100% 51%;
  --s: 247 47% 43%;
  --a: 310 49% 52%;
  --n: 217 92% 10%;
  --b1: 0 0% 100%;
  --b2: 217 100% 97%;
  --b3: 219 44% 92%;
  --bc: 214 30% 32%;
  --in: 192 93% 78%;
  --su: 182 47% 66%;
  --wa: 32 62% 84%;
  --er: 0 63% 72%;
}

*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}
.alert {
  display: grid;
  width: 100%;
  grid-auto-flow: row;
  align-content: flex-start;
  align-items: center;
  justify-items: center;
  gap: 1rem;
  text-align: center;
  border-width: 1px;
  --tw-border-opacity: 1;
  border-color: hsl(var(--b2) / var(--tw-border-opacity));
  padding: 1rem;
  --tw-text-opacity: 1;
  color: hsl(var(--bc) / var(--tw-text-opacity));
  border-radius: var(--rounded-box, 1rem);
  --alert-bg: hsl(var(--b2));
  --alert-bg-mix: hsl(var(--b1));
  background-color: var(--alert-bg);
}
@media (min-width: 640px) {

  .alert {
    grid-auto-flow: column;
    grid-template-columns: auto minmax(auto,1fr);
    justify-items: start;
    text-align: left;
  }
}
.btn {
  display: inline-flex;
  flex-shrink: 0;
  cursor: pointer;
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-color: transparent;
  border-color: hsl(var(--b2) / var(--tw-border-opacity));
  text-align: center;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: var(--rounded-btn, 0.5rem);
  height: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  line-height: 1em;
  min-height: 3rem;
  gap: 0.5rem;
  font-weight: 600;
  text-decoration-line: none;
  border-width: var(--border-btn, 1px);
  animation: button-pop var(--animation-btn, 0.25s) ease-out;
  text-transform: var(--btn-text-case, uppercase);
  --tw-border-opacity: 1;
  --tw-bg-opacity: 1;
  background-color: hsl(var(--b2) / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: hsl(var(--bc) / var(--tw-text-opacity));
  outline-color: hsl(var(--bc) / 1);
}
.btn-disabled,
  .btn[disabled],
  .btn:disabled {
  pointer-events: none;
}
.btn-group > input[type="radio"].btn {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}
.btn-group > input[type="radio"].btn:before {
  content: attr(data-title);
}
.btn:is(input[type="checkbox"]),
.btn:is(input[type="radio"]) {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}
.btn:is(input[type="checkbox"]):after,
.btn:is(input[type="radio"]):after {
  --tw-content: attr(aria-label);
  content: var(--tw-content);
}
@media (hover: hover) {

  .btm-nav > *.disabled:hover,
      .btm-nav > *[disabled]:hover {
    pointer-events: none;
    --tw-border-opacity: 0;
    background-color: hsl(var(--n) / var(--tw-bg-opacity));
    --tw-bg-opacity: 0.1;
    color: hsl(var(--bc) / var(--tw-text-opacity));
    --tw-text-opacity: 0.2;
  }

  .btn:hover {
    --tw-border-opacity: 1;
    border-color: hsl(var(--b3) / var(--tw-border-opacity));
    --tw-bg-opacity: 1;
    background-color: hsl(var(--b3) / var(--tw-bg-opacity));
  }

  .btn-primary:hover {
    --tw-border-opacity: 1;
    border-color: hsl(var(--pf) / var(--tw-border-opacity));
    --tw-bg-opacity: 1;
    background-color: hsl(var(--pf) / var(--tw-bg-opacity));
  }

  .btn.glass:hover {
    --glass-opacity: 25%;
    --glass-border-opacity: 15%;
  }

  .btn-outline.btn-primary:hover {
    --tw-border-opacity: 1;
    border-color: hsl(var(--pf) / var(--tw-border-opacity));
    --tw-bg-opacity: 1;
    background-color: hsl(var(--pf) / var(--tw-bg-opacity));
    --tw-text-opacity: 1;
    color: hsl(var(--pc) / var(--tw-text-opacity));
  }

  .btn-disabled:hover,
    .btn[disabled]:hover,
    .btn:disabled:hover {
    --tw-border-opacity: 0;
    background-color: hsl(var(--n) / var(--tw-bg-opacity));
    --tw-bg-opacity: 0.2;
    color: hsl(var(--bc) / var(--tw-text-opacity));
    --tw-text-opacity: 0.2;
  }

  .btn:is(input[type="checkbox"]:checked):hover, .btn:is(input[type="radio"]:checked):hover {
    --tw-border-opacity: 1;
    border-color: hsl(var(--pf) / var(--tw-border-opacity));
    --tw-bg-opacity: 1;
    background-color: hsl(var(--pf) / var(--tw-bg-opacity));
  }

  :where(.menu li:not(.menu-title):not(.disabled) > *:not(ul):not(details):not(.menu-title)):not(.active):hover, :where(.menu li:not(.menu-title):not(.disabled) > details > summary:not(.menu-title)):not(.active):hover {
    cursor: pointer;
    background-color: hsl(var(--bc) / 0.1);
    --tw-text-opacity: 1;
    color: hsl(var(--bc) / var(--tw-text-opacity));
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
}
.input-group > *,
  .input-group > .input,
  .input-group > .textarea,
  .input-group > .select {
  border-radius: 0px;
}
.menu li.disabled {
  cursor: not-allowed;
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
  color: hsl(var(--bc) / 0.3);
}
.select {
  display: inline-flex;
  cursor: pointer;
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  height: 3rem;
  padding-left: 1rem;
  padding-right: 2.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  line-height: 2;
  min-height: 3rem;
  border-width: 1px;
  border-color: hsl(var(--bc) / var(--tw-border-opacity));
  --tw-border-opacity: 0;
  --tw-bg-opacity: 1;
  background-color: hsl(var(--b1) / var(--tw-bg-opacity));
  font-weight: 600;
  border-radius: var(--rounded-btn, 0.5rem);
  background-image: linear-gradient(45deg, transparent 50%, currentColor 50%),
    linear-gradient(135deg, currentColor 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(1px + 50%), calc(100% - 16px) calc(1px + 50%);
  background-size: 4px 4px, 4px 4px;
  background-repeat: no-repeat;
}
.select[multiple] {
  height: auto;
}
.alert-error {
  border-color: hsl(var(--er) / 0.2);
  --tw-text-opacity: 1;
  color: hsl(var(--erc) / var(--tw-text-opacity));
  --alert-bg: hsl(var(--er));
  --alert-bg-mix: hsl(var(--b1));
}
.btm-nav > *.disabled,
    .btm-nav > *[disabled] {
  pointer-events: none;
  --tw-border-opacity: 0;
  background-color: hsl(var(--n) / var(--tw-bg-opacity));
  --tw-bg-opacity: 0.1;
  color: hsl(var(--bc) / var(--tw-text-opacity));
  --tw-text-opacity: 0.2;
}
.btn:active:hover,
  .btn:active:focus {
  animation: button-pop 0s ease-out;
  transform: scale(var(--btn-focus-scale, 0.97));
}
.btn:focus-visible {
  outline-style: solid;
  outline-width: 2px;
  outline-offset: 2px;
}
.btn-primary {
  --tw-border-opacity: 1;
  border-color: hsl(var(--p) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--p) / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: hsl(var(--pc) / var(--tw-text-opacity));
  outline-color: hsl(var(--p) / 1);
}
.btn-primary.btn-active {
  --tw-border-opacity: 1;
  border-color: hsl(var(--pf) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--pf) / var(--tw-bg-opacity));
}
.btn.glass {
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  outline-color: currentColor;
}
.btn.glass.btn-active {
  --glass-opacity: 25%;
  --glass-border-opacity: 15%;
}
.btn-outline.btn-primary {
  --tw-text-opacity: 1;
  color: hsl(var(--p) / var(--tw-text-opacity));
}
.btn-outline.btn-primary.btn-active {
  --tw-border-opacity: 1;
  border-color: hsl(var(--pf) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--pf) / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: hsl(var(--pc) / var(--tw-text-opacity));
}
.btn.btn-disabled,
  .btn[disabled],
  .btn:disabled {
  --tw-border-opacity: 0;
  background-color: hsl(var(--n) / var(--tw-bg-opacity));
  --tw-bg-opacity: 0.2;
  color: hsl(var(--bc) / var(--tw-text-opacity));
  --tw-text-opacity: 0.2;
}
.btn-group > input[type="radio"]:checked.btn,
  .btn-group > .btn-active {
  --tw-border-opacity: 1;
  border-color: hsl(var(--p) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--p) / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: hsl(var(--pc) / var(--tw-text-opacity));
}
.btn-group > input[type="radio"]:checked.btn:focus-visible, .btn-group > .btn-active:focus-visible {
  outline-style: solid;
  outline-width: 2px;
  outline-color: hsl(var(--p) / 1);
}
.btn:is(input[type="checkbox"]:checked),
.btn:is(input[type="radio"]:checked) {
  --tw-border-opacity: 1;
  border-color: hsl(var(--p) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--p) / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: hsl(var(--pc) / var(--tw-text-opacity));
}
.btn:is(input[type="checkbox"]:checked):focus-visible, .btn:is(input[type="radio"]:checked):focus-visible {
  outline-color: hsl(var(--p) / 1);
}
@keyframes button-pop {

  0% {
    transform: scale(var(--btn-focus-scale, 0.98));
  }

  40% {
    transform: scale(1.02);
  }

  100% {
    transform: scale(1);
  }
}
@keyframes checkmark {

  0% {
    background-position-y: 5px;
  }

  50% {
    background-position-y: -2px;
  }

  100% {
    background-position-y: 0;
  }
}
@keyframes modal-pop {

  0% {
    opacity: 0;
  }
}
@keyframes progress-loading {

  50% {
    background-position-x: -115%;
  }
}
@keyframes radiomark {

  0% {
    box-shadow: 0 0 0 12px hsl(var(--b1)) inset, 0 0 0 12px hsl(var(--b1)) inset;
  }

  50% {
    box-shadow: 0 0 0 3px hsl(var(--b1)) inset, 0 0 0 3px hsl(var(--b1)) inset;
  }

  100% {
    box-shadow: 0 0 0 4px hsl(var(--b1)) inset, 0 0 0 4px hsl(var(--b1)) inset;
  }
}
@keyframes rating-pop {

  0% {
    transform: translateY(-0.125em);
  }

  40% {
    transform: translateY(-0.125em);
  }

  100% {
    transform: translateY(0);
  }
}
.select-bordered {
  --tw-border-opacity: 0.2;
}
.select:focus {
  outline-style: solid;
  outline-width: 2px;
  outline-offset: 2px;
  outline-color: hsl(var(--bc) / 0.2);
}
.select-disabled,
  .select:disabled,
  .select[disabled] {
  cursor: not-allowed;
  --tw-border-opacity: 1;
  border-color: hsl(var(--b2) / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: hsl(var(--b2) / var(--tw-bg-opacity));
  --tw-text-opacity: 0.2;
}
.select-disabled::-moz-placeholder, .select:disabled::-moz-placeholder, .select[disabled]::-moz-placeholder {
  color: hsl(var(--bc) / var(--tw-placeholder-opacity));
  --tw-placeholder-opacity: 0.2;
}
.select-disabled::placeholder,
  .select:disabled::placeholder,
  .select[disabled]::placeholder {
  color: hsl(var(--bc) / var(--tw-placeholder-opacity));
  --tw-placeholder-opacity: 0.2;
}
.select-multiple,
  .select[multiple],
  .select[size].select:not([size="1"]) {
  background-image: none;
  padding-right: 1rem;
}
[dir="rtl"] .select {
  background-position: calc(0% + 12px) calc(1px + 50%), calc(0% + 16px) calc(1px + 50%);
}
@keyframes toast-pop {

  0% {
    transform: scale(0.9);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.artboard.phone-1.horizontal,
      .artboard.phone-1.artboard-horizontal {
  width: 568px;
  height: 320px;
}
.artboard.phone-2.horizontal,
      .artboard.phone-2.artboard-horizontal {
  width: 667px;
  height: 375px;
}
.artboard.phone-3.horizontal,
      .artboard.phone-3.artboard-horizontal {
  width: 736px;
  height: 414px;
}
.artboard.phone-4.horizontal,
      .artboard.phone-4.artboard-horizontal {
  width: 812px;
  height: 375px;
}
.artboard.phone-5.horizontal,
      .artboard.phone-5.artboard-horizontal {
  width: 896px;
  height: 414px;
}
.artboard.phone-6.horizontal,
      .artboard.phone-6.artboard-horizontal {
  width: 1024px;
  height: 320px;
}
.btn-group .btn:not(:first-child):not(:last-child) {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.btn-group .btn:first-child:not(:last-child) {
  margin-top: -0px;
  margin-left: -1px;
  border-top-left-radius: var(--rounded-btn, 0.5rem);
  border-top-right-radius: 0;
  border-bottom-left-radius: var(--rounded-btn, 0.5rem);
  border-bottom-right-radius: 0;
}
.btn-group .btn:last-child:not(:first-child) {
  border-top-left-radius: 0;
  border-top-right-radius: var(--rounded-btn, 0.5rem);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: var(--rounded-btn, 0.5rem);
}
.btn-group-horizontal .btn:not(:first-child):not(:last-child) {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.btn-group-horizontal .btn:first-child:not(:last-child) {
  margin-top: -0px;
  margin-left: -1px;
  border-top-left-radius: var(--rounded-btn, 0.5rem);
  border-top-right-radius: 0;
  border-bottom-left-radius: var(--rounded-btn, 0.5rem);
  border-bottom-right-radius: 0;
}
.btn-group-horizontal .btn:last-child:not(:first-child) {
  border-top-left-radius: 0;
  border-top-right-radius: var(--rounded-btn, 0.5rem);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: var(--rounded-btn, 0.5rem);
}
.btn-group-vertical .btn:first-child:not(:last-child) {
  margin-top: -1px;
  margin-left: -0px;
  border-top-left-radius: var(--rounded-btn, 0.5rem);
  border-top-right-radius: var(--rounded-btn, 0.5rem);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.btn-group-vertical .btn:last-child:not(:first-child) {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: var(--rounded-btn, 0.5rem);
  border-bottom-right-radius: var(--rounded-btn, 0.5rem);
}
.fixed {
  position: fixed;
}
.inset-0 {
  inset: 0px;
}
.z-50 {
  z-index: 50;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.ml-4 {
  margin-left: 1rem;
}
.mt-3 {
  margin-top: 0.75rem;
}
.mt-6 {
  margin-top: 1.5rem;
}
.mt-20 {
  margin-top: 5rem;
}
.mt-5 {
  margin-top: 1.25rem;
}
.flex {
  display: flex;
}
.grid {
  display: grid;
}
.hidden {
  display: none;
}
.h-6 {
  height: 1.5rem;
}
.w-6 {
  width: 1.5rem;
}
.w-full {
  width: 100%;
}
.min-w-fit {
  min-width: -moz-fit-content;
  min-width: fit-content;
}
.min-w-full {
  min-width: 100%;
}
.min-w-max {
  min-width: -moz-max-content;
  min-width: max-content;
}
.max-w-3xl {
  max-width: 48rem;
}
.shrink-0 {
  flex-shrink: 0;
}
.flex-grow {
  flex-grow: 1;
}
.grid-cols-10 {
  grid-template-columns: repeat(10, minmax(0, 1fr));
}
.grid-rows-\\[repeat\\(10\\2c _minmax\\(0\\2c _1fr\\)\\)\\] {
  grid-template-rows: repeat(10, minmax(0, 1fr));
}
.flex-col {
  flex-direction: column;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.gap-10 {
  gap: 2.5rem;
}
.gap-16 {
  gap: 4rem;
}
.gap-4 {
  gap: 1rem;
}
.gap-6 {
  gap: 1.5rem;
}
.rounded-lg {
  border-radius: 0.5rem;
}
.rounded {
  border-radius: 0.25rem;
}
.bg-accent {
  --tw-bg-opacity: 1;
  background-color: hsl(var(--a) / var(--tw-bg-opacity));
}
.bg-black {
  --tw-bg-opacity: 1;
  background-color: rgb(0 0 0 / var(--tw-bg-opacity));
}
.bg-error {
  --tw-bg-opacity: 1;
  background-color: hsl(var(--er) / var(--tw-bg-opacity));
}
.bg-primary {
  --tw-bg-opacity: 1;
  background-color: hsl(var(--p) / var(--tw-bg-opacity));
}
.bg-secondary {
  --tw-bg-opacity: 1;
  background-color: hsl(var(--s) / var(--tw-bg-opacity));
}
.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}
.bg-opacity-50 {
  --tw-bg-opacity: 0.5;
}
.stroke-current {
  stroke: currentColor;
}
.p-4 {
  padding: 1rem;
}
.p-2 {
  padding: 0.5rem;
}
.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}
.text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}
.text-6xl {
  font-size: 3.75rem;
  line-height: 1;
}
.text-accent-content {
  --tw-text-opacity: 1;
  color: hsl(var(--ac) / var(--tw-text-opacity));
}
.text-primary-content {
  --tw-text-opacity: 1;
  color: hsl(var(--pc) / var(--tw-text-opacity));
}
.text-secondary-content {
  --tw-text-opacity: 1;
  color: hsl(var(--sc) / var(--tw-text-opacity));
}
.shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"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","sourcesContent":["@import 'tailwindcss/base';\n@import 'tailwindcss/components';\n@import 'tailwindcss/utilities';\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/theme-change/index.js":
/*!********************************************!*\
  !*** ./node_modules/theme-change/index.js ***!
  \********************************************/
/***/ ((module) => {

function themeToggle(){var toggleEl=document.querySelector("[data-toggle-theme]");var dataKey=toggleEl?toggleEl.getAttribute("data-key"):null;(function(theme=localStorage.getItem(dataKey?dataKey:"theme")){if(localStorage.getItem(dataKey?dataKey:"theme")){document.documentElement.setAttribute("data-theme",theme);if(toggleEl){[...document.querySelectorAll("[data-toggle-theme]")].forEach(el=>{el.classList.add(toggleEl.getAttribute("data-act-class"))})}}})();if(toggleEl){[...document.querySelectorAll("[data-toggle-theme]")].forEach(el=>{el.addEventListener("click",function(){var themesList=el.getAttribute("data-toggle-theme");if(themesList){var themesArray=themesList.split(",");if(document.documentElement.getAttribute("data-theme")==themesArray[0]){if(themesArray.length==1){document.documentElement.removeAttribute("data-theme");localStorage.removeItem(dataKey?dataKey:"theme")}else{document.documentElement.setAttribute("data-theme",themesArray[1]);localStorage.setItem(dataKey?dataKey:"theme",themesArray[1])}}else{document.documentElement.setAttribute("data-theme",themesArray[0]);localStorage.setItem(dataKey?dataKey:"theme",themesArray[0])}}[...document.querySelectorAll("[data-toggle-theme]")].forEach(el=>{el.classList.toggle(this.getAttribute("data-act-class"))})})})}}function themeBtn(){var btnEl=document.querySelector("[data-set-theme='']");var dataKey=btnEl?btnEl.getAttribute("data-key"):null;(function(theme=localStorage.getItem(dataKey?dataKey:"theme")){if(theme!=undefined&&theme!=""){if(localStorage.getItem(dataKey?dataKey:"theme")&&localStorage.getItem(dataKey?dataKey:"theme")!=""){document.documentElement.setAttribute("data-theme",theme);var btnEl=document.querySelector("[data-set-theme='"+theme.toString()+"']");if(btnEl){[...document.querySelectorAll("[data-set-theme]")].forEach(el=>{el.classList.remove(el.getAttribute("data-act-class"))});if(btnEl.getAttribute("data-act-class")){btnEl.classList.add(btnEl.getAttribute("data-act-class"))}}}else{var btnEl=document.querySelector("[data-set-theme='']");if(btnEl.getAttribute("data-act-class")){btnEl.classList.add(btnEl.getAttribute("data-act-class"))}}}})();[...document.querySelectorAll("[data-set-theme]")].forEach(el=>{el.addEventListener("click",function(){document.documentElement.setAttribute("data-theme",this.getAttribute("data-set-theme"));localStorage.setItem(dataKey?dataKey:"theme",document.documentElement.getAttribute("data-theme"));[...document.querySelectorAll("[data-set-theme]")].forEach(el=>{el.classList.remove(el.getAttribute("data-act-class"))});if(el.getAttribute("data-act-class")){el.classList.add(el.getAttribute("data-act-class"))}})})}function themeSelect(){var selectEl=document.querySelector("select[data-choose-theme]");var dataKey=selectEl?selectEl.getAttribute("data-key"):null;(function(theme=localStorage.getItem(dataKey?dataKey:"theme")){if(localStorage.getItem(dataKey?dataKey:"theme")){document.documentElement.setAttribute("data-theme",theme);var optionToggler=document.querySelector("select[data-choose-theme] [value='"+theme.toString()+"']");if(optionToggler){[...document.querySelectorAll("select[data-choose-theme] [value='"+theme.toString()+"']")].forEach(el=>{el.selected=true})}}})();if(selectEl){[...document.querySelectorAll("select[data-choose-theme]")].forEach(el=>{el.addEventListener("change",function(){document.documentElement.setAttribute("data-theme",this.value);localStorage.setItem(dataKey?dataKey:"theme",document.documentElement.getAttribute("data-theme"));[...document.querySelectorAll("select[data-choose-theme] [value='"+localStorage.getItem(dataKey?dataKey:"theme")+"']")].forEach(el=>{el.selected=true})})})}}function themeChange(attach=true){if(attach===true){document.addEventListener("DOMContentLoaded",function(event){themeToggle();themeSelect();themeBtn()})}else{themeToggle();themeSelect();themeBtn()}}if(true){module.exports={themeChange:themeChange}}else{}

/***/ }),

/***/ "./src/imgs/battleship-logo.png":
/*!**************************************!*\
  !*** ./src/imgs/battleship-logo.png ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "imgs/battleship-logo.png");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _imgs_battleship_logo_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./imgs/battleship-logo.png */ "./src/imgs/battleship-logo.png");
__webpack_require__(/*! ./styles.css */ "./src/styles.css");
var _require = __webpack_require__(/*! theme-change */ "./node_modules/theme-change/index.js"),
  themeChange = _require.themeChange;
var _require2 = __webpack_require__(/*! ./modules/addGameModeClickEvents */ "./src/modules/addGameModeClickEvents.js"),
  addGameModeClickEvents = _require2.addGameModeClickEvents;
var _require3 = __webpack_require__(/*! ./modules/errorHandlingModule */ "./src/modules/errorHandlingModule.js"),
  validateAppContext = _require3.validateAppContext;

themeChange();
var appContext = {
  orientation: {
    isVertical: false
  },
  highlightedArray: [],
  isPlacementValid: null,
  cellSelected: null,
  highlightListeners: {},
  submitButtonListener: null,
  attackListeners: {},
  playerOne: null,
  playerComputer: null,
  currentShipName: null,
  currentShipSize: null,
  shipList: [],
  // Battlegrid Size
  horizontalSize: 10,
  verticalSize: 10,
  attackCellData: {
    randomCellNumber: null,
    calculatedCellNumberToAttack: null,
    isCellHit: false,
    isCellMiss: false,
    cellShipName: null,
    cellHTML: null,
    wasPreviousAttackHit: false,
    wasPreviousAttackSunk: false,
    isShipTargeted: false,
    previousHitCoordinates: [],
    previousMissCoordinates: [],
    untouchedCoordinates: [],
    shipsSunk: [],
    lastCellHit: null,
    validateAttackCellCollection: []
  },
  appElements: {
    onePlayerMode: document.getElementById("one-player-mode"),
    twoPlayerMode: document.getElementById("two-player-mode"),
    startGameContainer: document.getElementById("start-game-container"),
    mainContainer: document.getElementById("main-container"),
    battlegridsContainer: document.getElementById("battlegrids-container"),
    messageBox: document.getElementById("message-box"),
    verticalButton: document.getElementById("vertical-button"),
    horizontalButton: document.getElementById("horizontal-button"),
    chooseForMeButton: document.getElementById("choose-for-me"),
    submitButton: document.getElementById("submit-button"),
    playerComputerBattlegrid: document.getElementById("player-computer-battlegrid"),
    playerOneBattlegridLabel: document.createElement("playerone-battlegrid-label"),
    playerComputerBattlegridLabel: document.getElementById("player-computer-battlegrid-label")
  }
};
window.onload = function () {
  var logoElement = document.querySelector('img[src="./imgs/battleship-logo.png"]');
  logoElement.src = _imgs_battleship_logo_png__WEBPACK_IMPORTED_MODULE_0__["default"];
};
validateAppContext(appContext);
addGameModeClickEvents(appContext);
})();

/******/ })()
;
//# sourceMappingURL=main.js.map