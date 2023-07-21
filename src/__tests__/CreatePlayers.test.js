const { CreatePlayersForOnePlayerMode } = require("../modules/factories/CreatePlayers");
const PlayerFactory = require("../modules/factories/PlayerFactory");

jest.mock("../modules/factories/PlayerFactory");

describe('CreatePlayersForOnePlayerMode', () => {
  let appContext;

  beforeEach(() => {
    appContext = {
        orientation: {
            isVertical: false
        },
        highlightedArray: [],
        isPlacementValid: null,
        cellSelected: null,
        highlightListeners: {},
        submitButtonListener: null,
        playerOne: null,
        playerTwo: null,
        playerComputer: null,
        currentShipName: null,
        currentShipSize: null,
        shipList: [],
        // Battlegrid Size
        horizontalSize: 10,
        verticalSize: 10,
    }

    PlayerFactory.mockReset();

  });

  test('calls PlayerFactory twice', () => {
    CreatePlayersForOnePlayerMode(appContext);
    expect(PlayerFactory).toHaveBeenCalledTimes(2);
    expect(PlayerFactory).toHaveBeenCalledWith(appContext);
  });

  test('assigns new player instances to appContext', () => {
    const mockPlayer = { dummy: 'dummyPlayer' };
    PlayerFactory.mockReturnValue(mockPlayer);
    CreatePlayersForOnePlayerMode(appContext);
    expect(appContext.playerOne).toEqual(mockPlayer);
    expect(appContext.playerComputer).toEqual(mockPlayer);
  });
});
