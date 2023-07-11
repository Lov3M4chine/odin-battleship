import { ShipFactory } from "./ShipFactory";

    export const GameboardFactory = () => {
    let ships = {};

    function createGameboard(horizontalSize, verticalSize) {
        // Error Checking
        if ((!Number.isInteger(horizontalSize)) || (!Number.isInteger(verticalSize))) {
        throw new Error('Horizontal and Vertical Size must be integers')
        }
        if ((horizontalSize < 8) || (verticalSize < 8)) {
        throw new Error("Horizontal and Vertical Size must be at least 7");
        }

        // Gameboard creation
        let gameboard = [];

        for (let i = 0; i < (horizontalSize * verticalSize); i++) {
        gameboard.push({cell: i, isHit: false, isMiss: false, name: null})
        }
        return {
        gameboard,
        horizontalSize,
        verticalSize
        }
    }

    function placeShip(gameboardState, initialCell, isVertical, length, name) {
        // Error Checking
        if (!gameboardState.gameboard) {
        throw new Error("a gameboardState must be passed");
        }
        if (!(Number.isInteger(initialCell))) {
        throw new Error("initialCell must be an integer.");
        }
        if (initialCell < 0) {
        throw new Error("initialCell must be greater than or equal to zero. It represents the initial cell the ship starts on.")
        }
        if (typeof isVertical !== "boolean") {
        throw new Error("isVertical must be a boolean");
        }
        if (!(isVertical) && (gameboardState.horizontalSize - (initialCell % gameboardState.horizontalSize)) < length) {
        throw new Error("The length of the ship exceeds the gameboard's horizontal boundary, starting from the initial cell");
        }
        if ((isVertical) && (gameboardState.verticalSize - Math.floor(initialCell / gameboardState.horizontalSize)) < length) {
        throw new Error("The length of the ship exceeds the gameboard's vertical boundary, starting from the initial cell");
        }
        if (isVertical) {
        for (let i = initialCell; i < (initialCell + (length * gameboardState.horizontalSize)); i+=gameboardState.horizontalSize) {
            if (gameboardState.gameboard[i].name !== null) {
            throw new Error("Space is already occupied. Please choose another.");
            }
        }
        } else {
        for (let i = initialCell; i < (initialCell + length); i+=1) {
            if (gameboardState.gameboard[i].name !== null) {
            throw new Error("Space is already occupied. Please choose another.");
            }
        }
        }

        let newShip = ShipFactory(length, name);
        ships[name] = newShip;
        ships[name][length] = length;
        

        // Ship Placement
        if (isVertical) {
        for (let i = initialCell; i < (initialCell + (length * gameboardState.horizontalSize)); i+=gameboardState.horizontalSize) {
            gameboardState.gameboard[i].name = name;
            newShip.coordinates.push(i);
        }
        ships[name].coordinates = newShip.coordinates;

        } else {
        for (let i = initialCell; i < (initialCell + length); i+=1) {
            gameboardState.gameboard[i].name = name;
            newShip.coordinates.push(i);
        }
        ships[name].coordinates = newShip.coordinates;
        }
        return ships;
    }

    function receiveAttack(gameboardState, coordinate) {
        //Error Checking
        if (!gameboardState) {
            throw new Error('gameboardState must be passed as a parameter')
        }
        if (!(Number.isInteger(coordinate))) {
            throw new Error('coordinate must be an integer')
        }
        if (coordinate < 0 || coordinate >= gameboardState.gameboard.length) {
            throw new Error('coordinate passed is not on the gameboard');
          }
          

        const name = gameboardState.gameboard[coordinate].name;
        const ship = ships[name];

        if (name !== null) {
        gameboardState.gameboard[coordinate].isHit = true;
        ship.hit();
        } else {
        gameboardState.gameboard[coordinate].isMiss = true;
        }
    }

    function checkIfAllShipsSunk() {
        let allShipsSunk = true;
        for (let shipKey in ships) {
        const ship = ships[shipKey];
        if (ship.isSunk === false) {
            allShipsSunk = false;
            break;
        }
        }
        return allShipsSunk;
    }


    return {
        createGameboard,
        placeShip,
        receiveAttack,
        ships,
        checkIfAllShipsSunk
    };
    };

