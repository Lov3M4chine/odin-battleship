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
    if ((!Number.isInteger(horizontalSize)) || (!Number.isInteger(verticalSize))) {
      throw new Error('Horizontal and Vertical Size must be integers')
    }
    if ((horizontalSize < 8) || (verticalSize < 8)) {
      throw new Error("Horizontal and Vertical Size must be at least 7");
    }

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
    if (!gameboardState.gameboard) {
      throw new Error("a gameboard must be passed");
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
    if (!(isVertical) && (gameboardState.horizontalSize - (initialCell % gameboardState.horizontalSize)) <= length) {
      throw new Error("The length of the ship exceeds the gameboard's horizontal boundary, starting from the initial cell");
    }

    if (isVertical) {
      for (let i = initialCell; i < (initialCell + length * 10); i+=10) {
        gameboardState.gameboard[i].name = name;
      }
    } else {
      for (let i = initialCell; i < (initialCell + length); i+=1) {
        gameboardState.gameboard[i].name = name;
      }
    }
    return gameboardState.gameboard;
  }

  return {
    createGameboard,
    placeShip
  };
};

const gameboardFactory = GameboardFactory();
let gameboardState = gameboardFactory.createGameboard(10, 10);
gameboardFactory.placeShip(gameboardState, 0, false, 3, 'submarine')


module.exports = { ShipFactory, GameboardFactory };


  