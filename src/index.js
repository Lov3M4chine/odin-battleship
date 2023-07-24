require ('./styles.css');
const { addGameModeClickEvents } = require('./modules/addGameModeClickEvents');
const { validateAppContext } = require('./modules/errorHandlingModule');


let appContext = {
    orientation: {
        isVertical: false
    },
    highlightedArray: [],
    isPlacementValid: null,
    cellSelected: null,
    highlightListeners: {},
    submitButtonListener: null,
    playerOne: null,
    playerTwo: null,
    playerComputer: null,
    currentShipName: null,
    currentShipSize: null,
    shipList: [],
    // Battlegrid Size
    horizontalSize: 10,
    verticalSize: 10,
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
    }
}

validateAppContext(appContext);
addGameModeClickEvents(appContext);