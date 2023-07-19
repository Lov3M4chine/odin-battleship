require ('./styles.css');
const { addGameModeClickEvents } = require('./modules/addGameModeClickEvents');


// Battlegrid size
const horizontalSize = 10;
const verticalSize = 10;

addGameModeClickEvents(horizontalSize, verticalSize);