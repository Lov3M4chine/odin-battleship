const highlightBattleModeModule = (function() {
    function highlightHit(cell) {
        cell.classList.remove("bg-primary");
        cell.classList.add("bg-accent");
    }
    
    function highlightSunk(shipCoordinates) {
        shipCoordinates.forEach((coordinate) => {
            let cellToRegister = document.querySelector(`[data-cell-number="${coordinate}"]`);
            cellToRegister.classList.remove("bg-accent");
            cellToRegister.classList.add("bg-secondary");
        }) 
    }

    return {
        highlightHit,
        highlightSunk
    }

})();



module.exports = {
    highlightBattleModeModule
}