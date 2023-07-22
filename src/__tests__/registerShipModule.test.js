const { highlightShipPlacementModule } = require("../modules/highlightShipPlacementModule");
const { registerShipModule } = require("../modules/registerShipModule");


jest.mock('../modules/highlightShipPlacementModule', () => ({
    highlightShipPlacementModule: {
      highlightModule: {
        updateHighlightedFromSelectedToRegistered: jest.fn(),
        removeHighlightedSelections: jest.fn(),
      },
      highlightEventListenerModule: {
        addHighlightShipEventListener: jest.fn(),
      },
    },
  }));

describe('registerShipModule', () => {

  let mockAppContext;
  
  beforeEach(() => {
    jest.clearAllMocks();

    mockAppContext = {
      playerOne: {
        placeShip: jest.fn(),
      },
      cellSelected: 'mockCell',
      orientation: {
        isVertical: true,
      },
      currentShipName: 'mockShip',
      currentShipSize: 3,
      isPlacementValid: false,
      highlightedArray: [1, 2, 3],
    };
  });
  
  it('should process registration successfully when placement is valid', async () => {
    mockAppContext.isPlacementValid = true;

    const result = await registerShipModule.registerPlaceShipForPlayerOne(mockAppContext);

    expect(result).toBe(true);
    expect(mockAppContext.playerOne.placeShip).toHaveBeenCalledWith(mockAppContext.cellSelected, mockAppContext.orientation.isVertical, mockAppContext.currentShipName, mockAppContext.currentShipSize, mockAppContext);
    expect(highlightShipPlacementModule.highlightModule.updateHighlightedFromSelectedToRegistered).toHaveBeenCalledWith(mockAppContext);
  });
  
  it('should process registration failure when placement is invalid', async () => {
    const result = await registerShipModule.registerPlaceShipForPlayerOne(mockAppContext);

    expect(result).toBe(false);
    expect(highlightShipPlacementModule.highlightModule.removeHighlightedSelections).toHaveBeenCalledWith(mockAppContext);
    expect(highlightShipPlacementModule.highlightEventListenerModule.addHighlightShipEventListener).toHaveBeenCalledWith(mockAppContext);
    expect(mockAppContext.highlightedArray.length).toBe(0);
  });
});
