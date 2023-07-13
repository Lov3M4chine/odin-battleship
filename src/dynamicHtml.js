const mainContainer = document.getElementById("main-container");

function createBattlegridForOnePlayer (horizontalSize, verticalSize) {

    const playerOneBattlegridContainer = document.createElement('div');
    playerOneBattlegridContainer.id = 'playerone-battlegrid-container';
  
    const playerOneBattlegrid = document.createElement('div');
    playerOneBattlegrid.id = 'playerone-battlegrid';
    playerOneBattlegrid.className = 'grid grid-rows-[repeat(10,_minmax(0,_1fr))] grid-cols-10';

    for (let i = 0; i < (horizontalSize * verticalSize); i++) {
        let playeroneCell = null;

        playeroneCell = document.createElement('button');
        playeroneCell.id = `playerone-cell-${i}`;
        playeroneCell.className = 'btn bg-primary cell';
        playeroneCell.title = `cell ${i}`;

        playerOneBattlegrid.appendChild(playeroneCell);
    }

    playerOneBattlegridContainer.appendChild(playerOneBattlegrid);
    mainContainer.appendChild(playerOneBattlegridContainer);
  
}

function createBattlegridForTwoPlayer (horizontalSize, verticalSize) {
    const playerTwoBattlegridContainer = document.createElement('div');
    playerTwoBattlegridContainer.id = 'playerTwo-battlegrid-container';
  
    const playerTwoBattlegrid = document.createElement('div');
    playerTwoBattlegrid.id = 'playerTwo-battlegrid';
    playerTwoBattlegrid.className = 'grid grid-rows-[repeat(10,_minmax(0,_1fr))] grid-cols-10';

    for (let i = 0; i < (horizontalSize * verticalSize); i++) {
        let playerTwoCell = null;

        playerTwoCell = document.createElement('button');
        playerTwoCell.id = `playerTwo-cell-${i}`;
        playerTwoCell.className = 'btn bg-primary cell';
        playerTwoCell.title = `cell ${i}`;

        playerTwoBattlegrid.appendChild(playerTwoCell);
    }

    playerTwoBattlegridContainer.appendChild(playerTwoBattlegrid);
    mainContainer.appendChild(playerTwoBattlegridContainer);
}

module.exports = createBattlegridForOnePlayer;
module.exports = createBattlegridForTwoPlayer;