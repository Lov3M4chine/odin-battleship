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

let gameboard = gameboardFactory.createGameboard(10, 10);

test('placeShip adds ship name to cell', () => {
    gameboardFactory.placeShip(gameboard, 0, false, 3, 'submarine');
    expect(gameboard[0].name).toBe('submarine');
    expect(gameboard[1].name).toBe('submarine');
    expect(gameboard[2].name).toBe('submarine');
});

test('placeShip throws error when gameboard is not passed', () => {
    expect(() => gameboardFactory.placeShip(0, false, 3, 'submarine')).toThrow();
});

test('placeShip throws error when initialCell is not an integer', () => {
    expect(() => gameboardFactory.placeShip(gameboard, "test", false, 3, 'submarine')).toThrow();
});

test('placeShip throws error when initialCell is not >= 0', () => {
    expect(() => gameboardFactory.placeShip(gameboard, (-4), false, 3, 'submarine')).toThrow();
});

test('placeShip throws error when isVertical is not a boolean', () => {
    expect(() => gameboardFactory.placeShip(gameboard, 0, 3, 'submarine')).toThrow();
    expect(() => gameboardFactory.placeShip(gameboard, 0, 'false', 3, 'submarine')).toThrow();
});