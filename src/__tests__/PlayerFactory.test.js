const PlayerFactory = require("../modules/factories/PlayerFactory.js")

const mockElement = { addEventListener: jest.fn() };
document.getElementById = jest.fn().mockReturnValue(mockElement);

let appContext;
let shipParams;

beforeEach(() => {
    appContext = {
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

    appContext.playerOne = PlayerFactory(appContext);

  });
  
  describe('placeShip - Success scenarios', () => {
    beforeEach(() => {
      shipParams = [0, false, 'submarine', 3, appContext];
    });
  
    test('adds ship name to cell', () => {
      appContext.playerOne.placeShip(...shipParams);
      expect(appContext.playerOne.gameboardState.gameboard[0].name).toBe('submarine');
      expect(appContext.playerOne.gameboardState.gameboard[1].name).toBe('submarine');
      expect(appContext.playerOne.gameboardState.gameboard[2].name).toBe('submarine');
    });
  
    test('returns ships', () => {
      const result = appContext.playerOne.placeShip(...shipParams);
      expect(result).toEqual(appContext.playerOne.ships);
    });
  });
  
// test('receiveAttack determines if ship is hit and registers it on gameboard' , () => {
//     playerOne.placeShip(0, false, 'submarine', 3, appContext);
//     playerOne.receiveAttack(0);
//     expect(playerOne.gameboardState.gameboard[0].isHit).toBe(true)
// });

// test('receiveAttack determines if ship is missed and registers it on gameboard' , () => {
//     playerOne.placeShip(0, false, 'submarine', 3);
//     playerOne.receiveAttack(50);
//     expect(playerOne.gameboardState.gameboard[50].isMiss).toBe(true)
// });

// test('receiveAttack determines if ship is hit and updates the ship' , () => {
//     playerOne.placeShip(0, false, 'submarine', 3);
//     playerOne.receiveAttack(0);
//     expect(playerOne.ships['submarine'].getHits()).toBe(1);
//     playerOne.receiveAttack(1);
//     expect(playerOne.ships['submarine'].getHits()).toBe(2);
// });

// test('receiveAttack throws an error when coordinate is not a positive integer', () => {
//     expect(() => playerOne.receiveAttack("10")).toThrow('coordinate must be an integer');
// });

// test('receiveAttack throws an error when coordinate is not on the gameboard', () => {
//     expect(() => playerOne.receiveAttack(101)).toThrow('coordinate passed is not on the gameboard');
// });

// test('checkShipStatuses determines if all ships have been sunk', () => {
//     playerOne.placeShip(0, false, 'submarine', 2);
//     playerOne.placeShip(5, false, 'carrier', 3);
//     playerOne.receiveAttack(0);
//     playerOne.receiveAttack(1);
//     playerOne.receiveAttack(5);
//     playerOne.receiveAttack(6);
//     playerOne.receiveAttack(7);
//     expect(playerOne.checkIfAllShipsSunk()).toBe(true);
//     playerOne.placeShip(20, false, 'battleship', 4);
//     expect(playerOne.checkIfAllShipsSunk()).toBe(false);
// });
