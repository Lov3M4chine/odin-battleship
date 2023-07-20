require ('./styles.css');
const { addGameModeClickEvents } = require('./modules/addGameModeClickEvents');


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
        modeSelectContainer: document.getElementById("mode-select-container"),
        mainContainer: document.getElementById("main-container"),
        messageBox: document.getElementById("message-box"),
        verticalButton: document.getElementById("vertical-button"),
        horizontalButton: document.getElementById("horizontal-button"),
        submitButton: document.getElementById("submit-button"),
    }
}


addGameModeClickEvents(appContext);