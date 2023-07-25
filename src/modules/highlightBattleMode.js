const highlightBattleModeModule = (function() {
    function highlightHit(cell) {
        cell.classList.remove("bg-primary");
        cell.classList.remove("bg-secondary");
        cell.classList.add("bg-accent");
    }

    function highlightMiss(cell) {
        cell.classList.remove("bg-primary");
        cell.classList.add("bg-priamry-focus");
    }
    
    function highlightSunk(shipCoordinates) {
        shipCoordinates.forEach((coordinate) => {
            let cellToRegister = document.getElementById(`player-computer-cell-${coordinate}`);
            cellToRegister.classList.remove("bg-accent");
            cellToRegister.classList.add("bg-secondary");
        });
    }
    

    return {
        highlightHit,
        highlightMiss,
        highlightSunk,
    }

})();



module.exports = {
    highlightBattleModeModule
}