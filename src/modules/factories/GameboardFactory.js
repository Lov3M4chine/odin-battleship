const GameboardFactory = () => {

    function createGameboard(horizontalSize, verticalSize) {
        // Error Checking
        if ((!Number.isInteger(horizontalSize)) || (!Number.isInteger(verticalSize))) {
        throw new Error('Horizontal and Vertical Size must be integers')
        }
        if ((horizontalSize < 8) || (verticalSize < 8)) {
        throw new Error("Horizontal and Vertical Size must be at least 7");
        }

        // Gameboard creation
        let gameboard = [];

        for (let i = 0; i < (horizontalSize * verticalSize); i++) {
        gameboard.push({cell: i, isHit: false, isMiss: false, name: null})
        }
        return {
        gameboard,
        horizontalSize,
        verticalSize
        }
}

return {
    createGameboard,
};
};

module.exports = {
    GameboardFactory,
}

