const { GameboardFactory } = require ("./GameboardFactory.js");
const { ShipFactory } = require ("./ShipFactory.js");


const PlayerFactory = (horizontalSize, verticalSize) => {
    let gameboardFactory = GameboardFactory();
    let gameboardState = gameboardFactory.createGameboard(horizontalSize, verticalSize);
    let ships = {};

    function placeShip(cellSelected, isVertical, name, size) {

        let newShip = ShipFactory(name, size);
        this.ships[name] = newShip;
        this.ships[name].size = size;
        

        // Ship Placement
        if (isVertical) {
            for (let i = cellSelected; i < (cellSelected + (size * gameboardState.horizontalSize)); i+=gameboardState.horizontalSize) {
                this.gameboardState.gameboard[i].name = name;
                newShip.coordinates.push(i);
            }
            this.ships[name].coordinates = newShip.coordinates;

        } else {
            for (let i = cellSelected; i < (cellSelected + size); i+=1) {
                this.gameboardState.gameboard[i].name = name;
                newShip.coordinates.push(i);
            }
            this.ships[name].coordinates = newShip.coordinates;
        }
        return ships;
    }

    function receiveAttack(coordinate) {

        const name = this.gameboardState.gameboard[coordinate].name;
        const ship = this.ships[name];

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
        checkIfAllShipsSunk,
        gameboardState,
        ships,
    };
}

module.exports = PlayerFactory;