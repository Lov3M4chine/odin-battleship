const { CreatePlayersForOnePlayerMode } = require("../modules/factories/CreatePlayers");
const { initializePlaceShipsModule } = require("../modules/initializePlaceShipsModule");

jest.mock("../modules/factories/CreatePlayers");
jest.mock("../modules/initializePlaceShipsModule");

const hideModeSelectContainer = jest.fn();
const createBattlegridForPlayerOne = jest.fn();

function initializeOnePlayerMode (appContext, hideModeSelectContainer, createBattlegridForPlayerOne) {
    hideModeSelectContainer(appContext);
    createBattlegridForPlayerOne(appContext);
    CreatePlayersForOnePlayerMode(appContext);

    initializePlaceShipsModule.initializePlaceShips(appContext);
}

describe('initializeOnePlayerMode', () => {
  it('should initialize one player mode properly', () => {
    let appContext = { /* ... */ };

    initializeOnePlayerMode(appContext, hideModeSelectContainer, createBattlegridForPlayerOne);

    expect(hideModeSelectContainer).toHaveBeenCalledWith(appContext);
    expect(createBattlegridForPlayerOne).toHaveBeenCalledWith(appContext);
    expect(CreatePlayersForOnePlayerMode).toHaveBeenCalledWith(appContext);
    expect(initializePlaceShipsModule.initializePlaceShips).toHaveBeenCalledWith(appContext);
  });
});
