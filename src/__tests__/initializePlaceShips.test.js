const { CreateShips } = require("../modules/factories/CreateShips");
const { highlightShipPlacementModule } = require("../modules/highlightShipPlacementModule");
const { initializePlaceShipsModule } = require("../modules/initializePlaceShipsModule");
const { orientationModule } = require("../modules/orientationModule");
const { submitButtonEventListenerModule } = require("../modules/submitButtonEventListenerModule");

jest.mock("../modules/factories/CreateShips");
jest.mock("../modules/highlightShipPlacementModule");
jest.mock("../modules/orientationModule");
jest.mock("../modules/submitButtonEventListenerModule");

describe('initializePlaceShipsModule', () => {
  it('should initialize place ships properly', async () => {
    let appContext = {
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

        appElements: {
            messageBox: { 
                classList: { 
                    remove: jest.fn() 
                } 
            },
            horizontalButton: { 
                classList: { 
                    remove: jest.fn() 
                } 
            }
        }

    }
    
    const shipList = {
      ship1: { name: 'ship1', size: 5 },
      ship2: { name: 'ship2', size: 3 },
    };

    CreateShips.mockReturnValue(shipList);

    highlightShipPlacementModule.highlightEventListenerModule = {
      addHighlightShipEventListener: jest.fn(),
    };

    submitButtonEventListenerModule.addSubmitButtonEventListener = jest.fn().mockImplementationOnce(() => {
      return new Promise((resolve) => {
        resolve();
      });
    });

    let player = appContext.playerOne

    await initializePlaceShipsModule.initializePlaceShips(appContext, player);

    expect(orientationModule.addOrientationClickEvent).toHaveBeenCalledWith(appContext, player);
    expect(CreateShips).toHaveBeenCalledWith(appContext);
    expect(highlightShipPlacementModule.highlightEventListenerModule.addHighlightShipEventListener).toHaveBeenCalledTimes(Object.keys(shipList).length);
    expect(submitButtonEventListenerModule.addSubmitButtonEventListener).toHaveBeenCalledTimes(Object.keys(shipList).length);
    expect(appContext.appElements.messageBox.classList.remove).toHaveBeenCalledWith("hidden");
    expect(appContext.appElements.horizontalButton.classList.remove).toHaveBeenCalledWith("hidden");

  });
});
