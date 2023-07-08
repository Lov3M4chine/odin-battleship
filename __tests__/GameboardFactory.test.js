const { GameboardFactory } = require('../index.js');

test('createGameboard creates a gameboard 10 x 10', () => {
    const gameboardFactory = GameboardFactory();
    const gameboard = gameboardFactory.createGameboard(10, 10);
    expect(gameboard.length).toBe(100);
})