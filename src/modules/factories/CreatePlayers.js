const PlayerFactory = require("./PlayerFactory");

const CreatePlayersForOnePlayerMode = (appContext) => {
    appContext.playerOne = PlayerFactory(appContext);
    appContext.playerComputer = PlayerFactory(appContext);
}

module.exports = {
    CreatePlayersForOnePlayerMode,
}