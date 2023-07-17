const ShipFactory = require("./ShipFactory");

let carrier = ShipFactory(5, "carrier");
let battleship = ShipFactory(4, "battleship");
let destroyer = ShipFactory(3, "destroyer");
let submarine = ShipFactory(3, "submarine");
let patrol = ShipFactory(2, "patrol");

let placeShipsList = [carrier, battleship, destroyer, submarine, patrol];
const mainContainer = document.getElementById("main-container");
const messageBox = document.getElementById("message-box")

function initializePlaceShips () {
    for (let i = 0; i < placeShipsList.length; i++)
        messageBox.innerHTML = `Please place your ${i.name}`;
        for (let j = 0; j < i.length; j++) {
            
        }
}

function disableButtonsForShipPlacement (event, player, horizontalSize, verticalSize) {
    for (let i = 0; i < (horizontalSize * verticalSize); i++) {
        if (player.gameboardState.gameboard[i].name !== null) {
            event.target.disabled = true;
        }
    }
}