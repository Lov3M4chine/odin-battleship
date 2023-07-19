const ShipFactory = require("./ShipFactory");


const CreateShips = () => {
    const carrier = ShipFactory("carrier", 5);
    const battleship = ShipFactory("battleship", 4);
    const destroyer = ShipFactory("destroyer", 3);
    const submarine = ShipFactory("submarine", 3);
    const patrol = ShipFactory("patrol boat", 2);

    return {
        carrier,
        battleship,
        destroyer,
        submarine,
        patrol
    }
}

module.exports = {
    CreateShips
}