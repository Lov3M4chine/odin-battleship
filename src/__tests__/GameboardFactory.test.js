const GameboardFactory = require ("../modules/factories/GameboardFactory.js");

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