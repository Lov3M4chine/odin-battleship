const GameboardFactory = require ("./GameboardFactory.js");
const ShipFactory = require ("./ShipFactory.js");


const PlayerFactory = (horizontalSize, verticalSize) => {
    let gameboardFactory = GameboardFactory();
    let gameboardState = gameboardFactory.createGameboard(horizontalSize, verticalSize);
    let ships = {};

    function placeShip(cellSelected, isVertical, name, size) {
        // Error Checking
        // if (!gameboardState.gameboard) {
        // throw new Error("a gameboardState must be passed");
        // }
        // if (!(Number.isInteger(initialCell))) {
        // throw new Error("initialCell must be an integer.");
        // }
        // if (initialCell < 0) {
        // throw new Error("initialCell must be greater than or equal to zero. It represents the initial cell the ship starts on.")
        // }
        // if (typeof isVertical !== "boolean") {
        // throw new Error("isVertical must be a boolean");
        // }
        // if (!(isVertical) && (gameboardState.horizontalSize - (initialCell % gameboardState.horizontalSize)) < size) {
        // throw new Error("The length of the ship exceeds the gameboard's horizontal boundary, starting from the initial cell");
        // }
        // if ((isVertical) && (gameboardState.verticalSize - Math.floor(initialCell / gameboardState.horizontalSize)) < size) {
        // throw new Error("The length of the ship exceeds the gameboard's vertical boundary, starting from the initial cell");
        // }
        // if (isVertical) {
        // for (let i = initialCell; i < (initialCell + (size * gameboardState.horizontalSize)); i+=gameboardState.horizontalSize) {
        //     if (gameboardState.gameboard[i].name !== null) {
        //     throw new Error("Space is already occupied. Please choose another.");
        //     }
        // }
        // } else {
        // for (let i = initialCell; i < (initialCell + size); i+=1) {
        //     if (gameboardState.gameboard[i].name !== null) {
        //     throw new Error("Space is already occupied. Please choose another.");
        //     }
        // }
        // }

        let newShip = ShipFactory(name, size);
        ships[name] = newShip;
        ships[name].size = size;
        

        // Ship Placement
        if (isVertical) {
            for (let i = cellSelected; i < (cellSelected + (size * gameboardState.horizontalSize)); i+=gameboardState.horizontalSize) {
                gameboardState.gameboard[i].name = name;
                newShip.coordinates.push(i);
            }
            ships[name].coordinates = newShip.coordinates;

        } else {
            for (let i = cellSelected; i < (cellSelected + size); i+=1) {
                gameboardState.gameboard[i].name = name;
                newShip.coordinates.push(i);
            }
            ships[name].coordinates = newShip.coordinates;
        }
        return ships;
    }

    function receiveAttack(coordinate) {
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
        if (ship.isSunk() === false) {
            allShipsSunk = false;
            return allShipsSunk;
        }
        }
        return allShipsSunk;
    }

    return {
        placeShip,
        receiveAttack,
        ships,
        checkIfAllShipsSunk,
        gameboardState
    };
}

module.exports = PlayerFactory;