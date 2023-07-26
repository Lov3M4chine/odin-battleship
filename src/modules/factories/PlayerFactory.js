const { validatePlaceShipInputs } = require("../errorHandlingModule.js");
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
        validatePlaceShipInputs(cellSelected, isVertical, appContext);
        

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

    function receiveAttack(cellNumber, player) {
        console.log(`player.gameboardState.gameboard[cellNumber]: ${JSON.stringify(player.gameboardState.gameboard[cellNumber])}`)
        const name = player.gameboardState.gameboard[cellNumber].name;
        console.log(`name: ${name}`)
        const ship = player.ships[name];
        console.log(`ship: ${ship}`)
        
    
        if (name !== null) {
            player.gameboardState.gameboard[cellNumber].isHit = true;
            ship.hit();
            console.log("receive attack hit registered");
            console.log(`Ship Hits: ${player.ships[name].getHits()}`)
        } else {
            player.gameboardState.gameboard[cellNumber].isMiss = true;
            console.log("Receive attack miss registered")
        }
    }
    

    function checkIfPlayerShipsSunk() {
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
        checkIfPlayerShipsSunk,
        gameboardState,
        ships,
    };
}

module.exports = PlayerFactory;