const { validateInput } = require("../errorHandlingModule.js");
const { GameboardFactory } = require ("./GameboardFactory.js");
const { ShipFactory } = require ("./ShipFactory.js");


const PlayerFactory = (appContext) => {
    let gameboardFactory = GameboardFactory(appContext);
    let gameboardState = gameboardFactory.createGameboard(appContext);
    let ships = {};

    function placeShip(cellSelected, isVertical, name, size, appContext) {

        let newShip = ShipFactory(name, size);
        this.ships[name] = newShip;
        this.ships[name].size = size;

        // Error Handling
        validateInput(cellSelected, "number", "cellSelected must be an integer.");
        validateInput(isVertical, "boolean", "isVertical must be a boolean.");
      
        if (cellSelected < 0 || cellSelected >= appContext.horizontalSize * appContext.verticalSize) {
          throw new Error("cellSelected must be greater than or equal to zero and less than gameboard boundaries. It represents the initial cell the ship starts on.");
        }
        

        // Ship Placement
        if (isVertical) {
            for (let i = cellSelected; i < (cellSelected + (size * appContext.horizontalSize)); i+=appContext.horizontalSize) {
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
        return this.ships;
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