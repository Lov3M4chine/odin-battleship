const highlightBattleModeModule = (function() {
    function highlightHit(cell) {
        cell.classList.remove("bg-primary");
        cell.classList.add("bg-accent");
    }
    
    function highlightSunk(shipCoordinates) {
        shipCoordinates.forEach((coordinate) => {
            console.log(coordinate);
            let cellToRegister = document.getElementById(`player-computer-cell-${coordinate}`);
            console.log(cellToRegister);
            cellToRegister.classList.remove("bg-accent");
            cellToRegister.classList.add("bg-secondary");
        });
    }
    

    return {
        highlightHit,
        highlightSunk
    }

})();



module.exports = {
    highlightBattleModeModule
}