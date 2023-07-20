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
    verticalSize: 10
}


addGameModeClickEvents(appContext);