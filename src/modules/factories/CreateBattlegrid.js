const CreateBattlegrid = (() => {

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
        appContext.appElements.battlegridsContainer.appendChild(playerOneBattlegridContainer);
      
    }
    
    function createBattlegridForPlayerComputer (appContext) {
        console.log("Creating battlegrid for player computer....");
        const playerComputerBattlegridContainer = document.createElement('div');
        playerComputerBattlegridContainer.id = 'player-computer-battlegrid-container';
      
        const playerComputerBattlegrid = document.createElement('div');
        playerComputerBattlegrid.id = 'player-computer-battlegrid';
        playerComputerBattlegrid.className = 'grid grid-rows-[repeat(10,_minmax(0,_1fr))] grid-cols-10 hidden';
        appContext.appElements.playerComputerBattlegrid = playerComputerBattlegrid;
    
        for (let i = 0; i < (appContext.horizontalSize * appContext.verticalSize); i++) {
            let playerComputerCell = null;
    
            playerComputerCell = document.createElement('button');
            playerComputerCell.id = `player-computer-cell-${i}`;
            playerComputerCell.className = 'btn bg-primary player-computer-cell';
            playerComputerCell.title = `cell ${i}`;
            playerComputerCell.setAttribute('data-cellNumber', i);
    
            playerComputerBattlegrid.appendChild(playerComputerCell);
        }
    
        playerComputerBattlegridContainer.appendChild(playerComputerBattlegrid);
        appContext.appElements.battlegridsContainer.appendChild(playerComputerBattlegridContainer);
        console.log("...battlegrid completed");
    }

    return {
        createBattlegridForPlayerOne,
        createBattlegridForPlayerComputer
    }

})();

module.exports = {
    CreateBattlegrid,
}