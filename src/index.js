require("./styles.css");
const { themeChange } = require('theme-change');
const { addGameModeClickEvents } = require("./modules/addGameModeClickEvents");
const { validateAppContext } = require("./modules/errorHandlingModule");
import logo from './imgs/battleship-logo.png';

themeChange();


let appContext = {
  orientation: {
    isVertical: false,
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
    validateAttackCellCollection: [],
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
    playerComputerBattlegrid: document.getElementById(
      "player-computer-battlegrid"
    ),
    playerOneBattlegridLabel: document.createElement(
      "playerone-battlegrid-label"
    ),
    playerComputerBattlegridLabel: document.getElementById(
      "player-computer-battlegrid-label"
    ),
  },
};

window.onload = function() {
    const logoElement = document.querySelector('img[src="./imgs/battleship-logo.png"]');
    logoElement.src = logo;
};


validateAppContext(appContext);
addGameModeClickEvents(appContext);
