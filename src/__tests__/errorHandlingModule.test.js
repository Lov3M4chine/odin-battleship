const { validateAppContext, validatePlaceShipInputs } = require("../modules/errorHandlingModule");

let appContext;

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
    }
});

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
    }
});

describe('appContext validation', () => {
    it('should not throw any errors when horizontalSize and verticalSize are valid', () => {
        expect(() => validateAppContext(appContext)).not.toThrow();
    });

    it('should throw an error when horizontalSize and verticalSize is less than 7', () => {
        appContext.horizontalSize = 6;
        appContext.verticalSize = 6;
        expect(() => validateAppContext(appContext)).toThrow('horizontal and vertical sizes should be at least 7');
    });

    it('should throw an error when horizontalSize is not a number', () => {
        appContext.horizontalSize = "invalid";
        expect(() => validateAppContext(appContext)).toThrow("horizontalSize must be an integer");
    });

    it('should throw an error when verticalSize is not a number', () => {
        appContext.verticalSize = "invalid";
        expect(() => validateAppContext(appContext)).toThrow("verticalSize must be an integer");
    });
});

describe('placeShip validation', () => {
    it('should not throw any errors when inputs are valid', () => {
        expect(() => validatePlaceShipInputs(0, false, appContext)).not.toThrow();
    });

    it('should throw an error when cellSelected is not an integer', () => {
        expect(() => validatePlaceShipInputs("test", false, appContext)).toThrow("cellSelected must be an integer.");
    });

    it('should throw an error when isVertical is not a boolean', () => {
        expect(() => validatePlaceShipInputs(0, "false", appContext)).toThrow("isVertical must be a boolean.");
    });

    it('should throw an error when cellSelected is not greater than or equal to zero and less than gameboard boundaries', () => {
        expect(() => validatePlaceShipInputs(150, false, appContext)).toThrow("cellSelected must be greater than or equal to zero and less than gameboard boundaries. It represents the initial cell the ship starts on.");
        expect(() => validatePlaceShipInputs(-50, false, appContext)).toThrow("cellSelected must be greater than or equal to zero and less than gameboard boundaries. It represents the initial cell the ship starts on.");
    });

});