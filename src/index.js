const ShipFactory = (length, name) => {
  if (!Number.isInteger(length) || length < 1) {
      throw new Error('Invalid ship length: must be a positive integer.');
  }

  if (typeof name !== 'string' || name.trim() === '') {
      throw new Error('Invalid ship name: must be a non-empty string.');
  }

  let coordinates = [];
  let hits = 0;

  const hit = () => {
    if (hits < length) {
      hits += 1;
    }
  };

  const getHits = () => hits;
  const isSunk = () => hits >= length;

  return {
    hit,
    getHits,
    isSunk,
    name,
    coordinates
  };
};

const GameboardFactory = () => {
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
    if (!Number.isInteger(initialCell)) {
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
    if (gameboardState.gameboard[coordinate].name !== null) {
      gameboardState.gameboard[coordinate].isHit = true;
      ships[gameboardState.gameboard[coordinate].name].hit();
    } else {
      gameboardState.gameboard[coordinate].isMiss = true;
    }
  }

  function checkIfAllShipsSunk(gameboardState) {
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

// const gameboardFactory = GameboardFactory();
// let gameboardState = gameboardFactory.createGameboard(10, 10);
// gameboardFactory.placeShip(gameboardState, 0, false, 3, 'submarine');
// // gameboardFactory.placeShip(gameboardState, 60, true, 3, 'submarine');
// gameboardFactory.receiveAttack(gameboardState, 0);
// console.log(gameboardFactory.ships['submarine'].coordinates);


module.exports = { ShipFactory, GameboardFactory };


  