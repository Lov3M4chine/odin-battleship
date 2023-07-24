const { CreatePlayersForOnePlayerMode } = require("./factories/CreatePlayers");
const { initializePlaceShipsModule } = require("./initializePlaceShipsModule.js");

function hideModeSelectContainer (appContext) {
    appContext.appElements.startGameContainer.classList.add("hidden");
}

function createBattlegridForPlayerOne (appContext) {
    const playerOneBattlegridContainer = document.createElement('div');
    playerOneBattlegridContainer.id = 'playerone-battlegrid-container';
  
    const playerOneBattlegrid = document.createElement('div');
    playerOneBattlegrid.id = 'playerone-battlegrid';
    playerOneBattlegrid.className = 'grid grid-rows-[repeat(10,_minmax(0,_1fr))] grid-cols-10';

    for (let i = 0; i < (appContext.horizontalSize * appContext.verticalSize); i++) {
        let playerOneCell = null;

        playerOneCell = document.createElement('button');
        playerOneCell.id = `playerone-cell-${i}`;
        playerOneCell.className = 'btn bg-primary playerone-cell';
        playerOneCell.title = `cell ${i}`;
        playerOneCell.setAttribute('data-cell-number', i);
        playerOneCell.setAttribute('data-is-highlighted', false);

        playerOneBattlegrid.appendChild(playerOneCell);
    }

    playerOneBattlegridContainer.appendChild(playerOneBattlegrid);
    appContext.appElements.mainContainer.appendChild(playerOneBattlegridContainer);
  
}

function createBattlegridForPlayerTwo (appContext) {
    const playerTwoBattlegridContainer = document.createElement('div');
    playerTwoBattlegridContainer.id = 'playerTwo-battlegrid-container';
  
    const playerTwoBattlegrid = document.createElement('div');
    playerTwoBattlegrid.id = 'playerTwo-battlegrid';
    playerTwoBattlegrid.className = 'grid grid-rows-[repeat(10,_minmax(0,_1fr))] grid-cols-10';

    for (let i = 0; i < (appContext.horizontalSize * appContext.verticalSize); i++) {
        let playerTwoCell = null;

        playerTwoCell = document.createElement('button');
        playerTwoCell.id = `playerTwo-cell-${i}`;
        playerTwoCell.className = 'btn bg-primary playertwo-cell hidden';
        playerTwoCell.title = `cell ${i}`;
        playerTwoCell.setAttribute('data-cellNumber', i);

        playerTwoBattlegrid.appendChild(playerTwoCell);
    }

    playerTwoBattlegridContainer.appendChild(playerTwoBattlegrid);
    appContext.appElements.mainContainer.appendChild(playerTwoBattlegridContainer);
}

function initializeOnePlayerMode (appContext) {
    
    hideModeSelectContainer(appContext);
    createBattlegridForPlayerOne(appContext);
    CreatePlayersForOnePlayerMode(appContext);

    initializePlaceShipsModule.initializePlaceShips(appContext, appContext.playerOne);
    console.log(`Initialization of one player mode complete.`);
}

function getPlayerOne() {
    return appContext.playerOne;
}

function getComputerPlayer() {
    return appContext.computerPlayer;
}

module.exports = {
    initializeOnePlayerMode,
    getPlayerOne,
    getComputerPlayer,
}