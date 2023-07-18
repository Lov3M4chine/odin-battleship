const PlayerFactory = require("../modules/PlayerFactory.js")

let playerOne;

beforeEach(() => {
    playerOne = PlayerFactory(10, 10);
  });

test('placeShip adds ship name to cell', () => {
    playerOne.placeShip(0, false, 'submarine', 3);
    expect(playerOne.gameboardState.gameboard[0].name).toBe('submarine');
    expect(playerOne.gameboardState.gameboard[1].name).toBe('submarine');
    expect(playerOne.gameboardState.gameboard[2].name).toBe('submarine');
});

test('placeShip throws error when initialCell is not an integer', () => {
    expect(() => playerOne.placeShip("test", false, 'submarine', 3)).toThrow("initialCell must be an integer.");
});

test('placeShip throws error when initialCell is not >= 0', () => {
    expect(() => playerOne.placeShip((-4), false, 'submarine', 3)).toThrow("initialCell must be greater than or equal to zero. It represents the initial cell the ship starts on.");
});

test('placeShip throws error when isVertical is not a boolean', () => {
    expect(() => playerOne.placeShip(0, 3, 'submarine')).toThrow();
    expect(() => playerOne.placeShip(0, 'false', 'submarine', 3)).toThrow("isVertical must be a boolean");
});

test('throws an error when horizontal length is beyond scope of gameboard', () => {
    expect(() => playerOne.placeShip(9, false, 'submarine', 3)).toThrow("The length of the ship exceeds the gameboard's horizontal boundary, starting from the initial cell");
});

test('throws an error when vertical length is beyond scope of gameboard', () => {
    expect(() => playerOne.placeShip(80, true, 'submarine', 3)).toThrow("The length of the ship exceeds the gameboard's vertical boundary, starting from the initial cell");
});

test('throws an error when a ship already occupies the space when trying to place', () => {
    playerOne.placeShip(60, true, 'submarine', 3);
    expect(() => playerOne.placeShip(60, false, 'carrier', 3)).toThrow("Space is already occupied. Please choose another.");
    expect(() => playerOne.placeShip(70, true, 'carrier', 3)).toThrow("Space is already occupied. Please choose another.");
});

test('receiveAttack determines if ship is hit and registers it on gameboard' , () => {
    playerOne.placeShip(0, false, 'submarine', 3);
    playerOne.receiveAttack(0);
    expect(playerOne.gameboardState.gameboard[0].isHit).toBe(true)
});

test('receiveAttack determines if ship is missed and registers it on gameboard' , () => {
    playerOne.placeShip(0, false, 'submarine', 3);
    playerOne.receiveAttack(50);
    expect(playerOne.gameboardState.gameboard[50].isMiss).toBe(true)
});

test('receiveAttack determines if ship is hit and updates the ship' , () => {
    playerOne.placeShip(0, false, 'submarine', 3);
    playerOne.receiveAttack(0);
    expect(playerOne.ships['submarine'].getHits()).toBe(1);
    playerOne.receiveAttack(1);
    expect(playerOne.ships['submarine'].getHits()).toBe(2);
});

test('receiveAttack throws an error when coordinate is not a positive integer', () => {
    expect(() => playerOne.receiveAttack("10")).toThrow('coordinate must be an integer');
});

test('receiveAttack throws an error when coordinate is not on the gameboard', () => {
    expect(() => playerOne.receiveAttack(101)).toThrow('coordinate passed is not on the gameboard');
});

test('checkShipStatuses determines if all ships have been sunk', () => {
    playerOne.placeShip(0, false, 'submarine', 2);
    playerOne.placeShip(5, false, 'carrier', 3);
    playerOne.receiveAttack(0);
    playerOne.receiveAttack(1);
    playerOne.receiveAttack(5);
    playerOne.receiveAttack(6);
    playerOne.receiveAttack(7);
    expect(playerOne.checkIfAllShipsSunk()).toBe(true);
    playerOne.placeShip(20, false, 'battleship', 4);
    expect(playerOne.checkIfAllShipsSunk()).toBe(false);
});
