const { GameboardFactory } = require('../index.js');

const gameboardFactory = GameboardFactory();

test('createGameboard creates a gameboard', () => {
    const gameboard = gameboardFactory.createGameboard(10, 10);
    expect(gameboard.length).toBe(100);
});

test('GameboardFactory returns an array', () => {
    const gameboard = gameboardFactory.createGameboard(10, 10);
    expect(Array.isArray(gameboard)).toBe(true);
})

test('createGameboard throws an error when horizontal or vertical size is not an integer', () => {
    expect(() => gameboardFactory.createGameboard("string", 10)).toThrow();
    expect(() => gameboardFactory.createGameboard(10, "string")).toThrow();
    expect(() => gameboardFactory.createGameboard("string", "string")).toThrow();
})

test('createGameboard throws an error when horizontal or vertical size is not > 7', () => {
    expect(() => gameboardFactory.createGameboard(5, 10)).toThrow();
    expect(() => gameboardFactory.createGameboard(10, 5)).toThrow();
    expect(() => gameboardFactory.createGameboard(5, 5)).toThrow();
});

test('placeShip adds ship name to cell', () => {
    const gameboard = gameboardFactory.createGameboard(10, 10);
    gameboardFactory.placeShip(gameboard, 0, false, 3, 'submarine');
    expect(gameboard[0].name).toBe('submarine');
    expect(gameboard[1].name).toBe('submarine');
    expect(gameboard[2].name).toBe('submarine');
})