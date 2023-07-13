function createBattlegrid (horizontalSize, verticalSize) {
    const mainContainer = document.getElementById("main-container");

    const playerOneBattlegridContainer = document.createElement('div');
    playerOneBattlegridContainer.id = 'playerone-battlegrid-container';
  
    const playerOneBattlegrid = document.createElement('div');
    playerOneBattlegrid.id = 'playerone-battlegrid';
    playerOneBattlegrid.className = 'grid grid-rows-[repeat(10,_minmax(0,_1fr))] grid-cols-10';

    for (let i = 0; i < (horizontalSize * verticalSize); i++) {
        let playeroneCell = null;

        playeroneCell = document.createElement('button');
        playeroneCell.id = `playerone-cell-${i}`;
        playeroneCell.className = 'btn bg-primary';
        playeroneCell.title = `cell ${i}`;

        playerOneBattlegrid.appendChild(playeroneCell);
    }

    playerOneBattlegridContainer.appendChild(playerOneBattlegrid);
    mainContainer.appendChild(playerOneBattlegridContainer);
  
}

module.exports = createBattlegrid;