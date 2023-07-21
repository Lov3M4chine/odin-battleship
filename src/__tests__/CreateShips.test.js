const { CreateShips } = require("../modules/factories/CreateShips");
const { ShipFactory } = require("../modules/factories/ShipFactory");


jest.mock('../modules/factories/ShipFactory'); // This mocks the ShipFactory module

describe('CreateShips function', () => {
  beforeEach(() => {
    ShipFactory.mockClear();
  });

  it('should call ShipFactory with correct parameters', () => {
    CreateShips();
    expect(ShipFactory).toHaveBeenCalledTimes(5);
    expect(ShipFactory).toHaveBeenCalledWith("carrier", 5);
    expect(ShipFactory).toHaveBeenCalledWith("battleship", 4);
    expect(ShipFactory).toHaveBeenCalledWith("destroyer", 3);
    expect(ShipFactory).toHaveBeenCalledWith("submarine", 3);
    expect(ShipFactory).toHaveBeenCalledWith("patrol boat", 2);
  });

  it('should return an object with correct ship instances', () => {
    const mockShipInstance = { dummy: 'dummyShip' };
    ShipFactory.mockReturnValue(mockShipInstance);

    const ships = CreateShips();

    expect(ships).toEqual({
      carrier: mockShipInstance,
      battleship: mockShipInstance,
      destroyer: mockShipInstance,
      submarine: mockShipInstance,
      patrol: mockShipInstance
    });
  });
});
