const { GameboardFactory } = require('../index.js');

const gameboardFactory = GameboardFactory();

test('createGameboard creates a gameboard', () => {
    const gameboardState = gameboardFactory.createGameboard(10, 10);
    expect(gameboardState.gameboard.length).toBe(100);
});

test('GameboardFactory returns an array', () => {
    const gameboardState = gameboardFactory.createGameboard(10, 10);
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

let gameboardState = gameboardFactory.createGameboard(10, 10);

test('placeShip adds ship name to cell', () => {
    gameboardFactory.placeShip(gameboardState, 0, false, 3, 'submarine');
    expect(gameboardState.gameboard[0].name).toBe('submarine');
    expect(gameboardState.gameboard[1].name).toBe('submarine');
    expect(gameboardState.gameboard[2].name).toBe('submarine');
});

test('placeShip throws error when gameboardState is not passed', () => {
    expect(() => gameboardFactory.placeShip(0, false, 3, 'submarine')).toThrow();
});

test('placeShip throws error when initialCell is not an integer', () => {
    expect(() => gameboardFactory.placeShip(gameboardState, "test", false, 3, 'submarine')).toThrow();
});

test('placeShip throws error when initialCell is not >= 0', () => {
    expect(() => gameboardFactory.placeShip(gameboardState, (-4), false, 3, 'submarine')).toThrow();
});

test('placeShip throws error when isVertical is not a boolean', () => {
    expect(() => gameboardFactory.placeShip(gameboardState, 0, 3, 'submarine')).toThrow();
    expect(() => gameboardFactory.placeShip(gameboardState, 0, 'false', 3, 'submarine')).toThrow();
});

test('throws an error when horizontal length is beyond scope of gameboard', () => {
    expect(() => gameboardFactory.placeShip(gameboardState, 9, false, 3, 'submarine')).toThrow();
});

test('throws an error when vertical length is beyond scope of gameboard', () => {
    expect(() => gameboardFactory.placeShip(gameboardState, 80, true, 3, 'submarine')).toThrow();
});