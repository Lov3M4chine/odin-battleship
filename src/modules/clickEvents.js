const battlegridClickEvents = (function() {

    function registerCellClickForPlayerOne (cell, playerOne) {
        let cellNumber = cell.getAttribute('data-cellNumber');
        if (playerOne.gameboardState.gameboard[cellNumber].name === null) {
            playerOne.gameboardState.gameboard[cellNumber].isMiss = true;
            cell.classList.add("bg-secondary");
        }
    }

    function addPlayerOneBattlegridCellClickEvents (playerOne) {
        const playerOneCells = document.querySelectorAll(".playerone-cell");
        playerOneCells.forEach(function(cell) {
            cell.addEventListener('click', function(event) {
                registerCellClickForPlayerOne(event.target, playerOne);
            })
        })
    }

    return {
        addPlayerOneBattlegridCellClickEvents,
    }

})();