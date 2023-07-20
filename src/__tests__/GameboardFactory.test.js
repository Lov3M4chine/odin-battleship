const { GameboardFactory } = require ("../modules/factories/GameboardFactory.js");

let gameboardFactory;
let gameboardState;

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
        onePlayerMode: document.getElementById("one-player-mode"),
        twoPlayerMode: document.getElementById("two-player-mode"),
        modeSelectContainer: document.getElementById("mode-select-container"),
        mainContainer: document.getElementById("main-container"),
        messageBox: document.getElementById("message-box"),
        verticalButton: document.getElementById("vertical-button"),
        horizontalButton: document.getElementById("horizontal-button"),
        submitButton: document.getElementById("submit-button"),
    }
}

beforeEach(() => {
  gameboardFactory = GameboardFactory(appContext);
  gameboardState = gameboardFactory.createGameboard(appContext);
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