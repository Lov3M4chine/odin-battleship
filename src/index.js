require ('./styles.css');
const { addGameModeClickEvents } = require('./modules/addGameModeClickEvents');
const { validateInput } = require('./modules/errorHandlingModule');


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

// Error Handling
validateInput (appContext, "object", "appContext must be an object");
validateInput (appContext.horizontalSize, "number", "horizontalSize must be an integer");
validateInput (appContext.verticalSize, "number", "verticalSize must be an integer");

if (appContext.horizontalSize < 7 || appContext.verticalSize < 7) {
    throw new Error ("horizontal and vertical sizes should be at least 7")
}

addGameModeClickEvents(appContext);