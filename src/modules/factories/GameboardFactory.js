const GameboardFactory = () => {

    function createGameboard(appContext) {
        // Error Checking
        if ((!Number.isInteger(appContext.horizontalSize)) || (!Number.isInteger(appContext.verticalSize))) {
        throw new Error('Horizontal and Vertical Size must be integers')
        }
        if ((appContext.horizontalSize < 8) || (appContext.verticalSize < 8)) {
        throw new Error("Horizontal and Vertical Size must be at least 7");
        }

        // Gameboard creation
        let gameboard = [];

        for (let i = 0; i < (appContext.horizontalSize * appContext.verticalSize); i++) {
        gameboard.push({cell: i, isHit: false, isMiss: false, name: null})
        }
        return {
        gameboard
        }
}

return {
    createGameboard,
};
};

module.exports = {
    GameboardFactory,
}

