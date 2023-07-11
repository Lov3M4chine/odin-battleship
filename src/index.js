const ShipFactory = (length, name) => {
  if (!Number.isInteger(length) || length < 1) {
      throw new Error('Invalid ship length: must be a positive integer.');
  }

  if (typeof name !== 'string' || name.trim() === '') {
      throw new Error('Invalid ship name: must be a non-empty string.');
  }

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
  };
};

const GameboardFactory = () => {
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

    // Ship Placement
    if (isVertical) {
      for (let i = initialCell; i < (initialCell + (length * gameboardState.horizontalSize)); i+=gameboardState.horizontalSize) {
        gameboardState.gameboard[i].name = name;
      }
    } else {
      for (let i = initialCell; i < (initialCell + length); i+=1) {
        gameboardState.gameboard[i].name = name;
      }
    }
    return { gameboardState }
    }

  function receiveAttack(gameboardState, coordinate) {
    if (gameboardState.gameboard[coordinate].name !== null) {
      gameboardState.gameboard[coordinate].isHit = true;
    } else {
      gameboardState.gameboard[coordinate].isMiss = true;
    }
  }

  return {
    createGameboard,
    placeShip,
    receiveAttack,
  };
};

// const gameboardFactory = GameboardFactory();
// let gameboardState = gameboardFactory.createGameboard(10, 10);
// gameboardFactory.placeShip(gameboardState, 0, false, 3, 'submarine');
// gameboardFactory.placeShip(gameboardState, 60, true, 3, 'submarine');


module.exports = { ShipFactory, GameboardFactory };


  