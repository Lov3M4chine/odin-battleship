require ('./styles.css');
const PlayerFactory = require('./modules/factories/PlayerFactory');
const { addGameModeClickEvents } = require ("./modules/clickEvents.js");


// Battlegrid size
const horizontalSize = 10;
const verticalSize = 10;

addGameModeClickEvents(horizontalSize, verticalSize);