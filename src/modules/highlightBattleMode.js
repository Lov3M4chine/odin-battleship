const highlightBattleModeModule = (function() {
    function highlightHit(cell) {
        cell.classList.remove("bg-primary");
        cell.classList.add("bg-accent");
    }
    
    function highlightSunk(shipCoordinates) {
    
    }

    return {
        highlightHit
    }

})();



module.exports = {
    highlightBattleModeModule
}