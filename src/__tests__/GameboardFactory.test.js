const { GameboardFactory } = require('../index.js');

let gameboardFactory;
let gameboardState;

beforeEach(() => {
  gameboardFactory = GameboardFactory();
  gameboardState = gameboardFactory.createGameboard(10, 10);
});

test('createGameboard creates a gameboard', () => {
    expect(gameboardState.gameboard.length).toBe(100);
});

test('GameboardFactory returns an array', () => {
    expect(Array.isArray(gameboardState.gameboard)).toBe(true);
});

test('createGameboard throws an error when horizontal or vertical size is not an integer', () => {
    expect(() => gameboardFactory.createGameboard("string", 10)).toThrow();
    expect(() => gameboardFactory.createGameboard(10, "string")).toThrow();
    expect(() => gameboardFactory.createGameboard("string", "string")).toThrow();
});

test('createGameboard throws an error when horizontal or vertical size is not > 7', () => {
    expect(() => gameboardFactory.createGameboard(5, 10)).toThrow();
    expect(() => gameboardFactory.createGameboard(10, 5)).toThrow();
    expect(() => gameboardFactory.createGameboard(5, 5)).toThrow();
});

test('placeShip adds ship name to cell', () => {
    gameboardFactory.placeShip(gameboardState, 0, false, 3, 'submarine');
    expect(gameboardState.gameboard[0].name).toBe('submarine');
    expect(gameboardState.gameboard[1].name).toBe('submarine');
    expect(gameboardState.gameboard[2].name).toBe('submarine');
});

test('placeShip throws error when gameboardState is not passed', () => {
    expect(() => gameboardFactory.placeShip(0, false, 3, 'submarine')).toThrow("a gameboardState must be passed");
});

test('placeShip throws error when initialCell is not an integer', () => {
    expect(() => gameboardFactory.placeShip(gameboardState, "test", false, 3, 'submarine')).toThrow("initialCell must be an integer.");
});

test('placeShip throws error when initialCell is not >= 0', () => {
    expect(() => gameboardFactory.placeShip(gameboardState, (-4), false, 3, 'submarine')).toThrow("initialCell must be greater than or equal to zero. It represents the initial cell the ship starts on.");
});

test('placeShip throws error when isVertical is not a boolean', () => {
    expect(() => gameboardFactory.placeShip(gameboardState, 0, 3, 'submarine')).toThrow();
    expect(() => gameboardFactory.placeShip(gameboardState, 0, 'false', 3, 'submarine')).toThrow("isVertical must be a boolean");
});

test('throws an error when horizontal length is beyond scope of gameboard', () => {
    expect(() => gameboardFactory.placeShip(gameboardState, 9, false, 3, 'submarine')).toThrow("The length of the ship exceeds the gameboard's horizontal boundary, starting from the initial cell");
});

test('throws an error when vertical length is beyond scope of gameboard', () => {
    expect(() => gameboardFactory.placeShip(gameboardState, 80, true, 3, 'submarine')).toThrow("The length of the ship exceeds the gameboard's vertical boundary, starting from the initial cell");
});

test('throws an error when a ship already occupies the space when trying to place', () => {
    gameboardFactory.placeShip(gameboardState, 60, true, 3, 'submarine');
    expect(() => gameboardFactory.placeShip(gameboardState, 60, false, 3, 'carrier')).toThrow("Space is already occupied. Please choose another.");
    expect(() => gameboardFactory.placeShip(gameboardState, 70, true, 3, 'carrier')).toThrow("Space is already occupied. Please choose another.");
});

test('receiveAttack determines if ship is hit and registers it on gameboard' , () => {
    gameboardFactory.placeShip(gameboardState, 0, false, 3, 'submarine');
    gameboardFactory.receiveAttack(gameboardState, 0);
    expect(gameboardState.gameboard[0].isHit).toBe(true)
});

test('receiveAttack determines if ship is missed and registers it on gameboard' , () => {
    gameboardFactory.placeShip(gameboardState, 0, false, 3, 'submarine');
    gameboardFactory.receiveAttack(gameboardState, 50);
    expect(gameboardState.gameboard[50].isMiss).toBe(true)
});

test('receiveAttack determines if ship is hit and updates the ship' , () => {
    gameboardFactory.placeShip(gameboardState, 0, false, 3, 'submarine');
    gameboardFactory.receiveAttack(gameboardState, 0);
    expect(gameboardFactory.ships['submarine'].getHits()).toBe(1);
    gameboardFactory.receiveAttack(gameboardState, 1);
    expect(gameboardFactory.ships['submarine'].getHits()).toBe(2);
});

test('checkShipStatuses determines if all ships have been sunk', () => {
    gameboardFactory.placeShip(gameboardState, 0, false, 2, 'submarine');
    gameboardFactory.placeShip(gameboardState, 5, false, 2, 'carrier');
    gameboardFactory.receiveAttack(gameboardState, 0);
    gameboardFactory.receiveAttack(gameboardState, 1);
    gameboardFactory.receiveAttack(gameboardState, 5);
    gameboardFactory.receiveAttack(gameboardState, 6);
    expect(() => gameboardFactory.checkIfAllShipsSunk(gameboardState).toBe(true));
})