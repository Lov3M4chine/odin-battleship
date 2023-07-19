const PlayerFactory = require("./factories/PlayerFactory");

const CreatePlayersForOnePlayerMode = (horizontalSize, verticalSize) => {
    playerOne = PlayerFactory(horizontalSize, verticalSize);
    playerComputer = PlayerFactory(horizontalSize, verticalSize);
    return {
        playerOne,
        playerComputer
    }
}

module.exports = {
    CreatePlayersForOnePlayerMode,
}