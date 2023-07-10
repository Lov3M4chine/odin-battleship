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
    return gameboard;
  }

  function placeShip(gameboard, initialCell, isVertical, length, name) {
    if (!gameboard) {
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
    if (isVertical) {
      for (let i = initialCell; i <= (initialCell + length * 10); i+=10) {
        gameboard[i].name = name;
      }
    } else {
      for (let i = initialCell; i <= (initialCell + length); i+=1) {
        gameboard[i].name = name;
      }
    }
    return gameboard;
  }

  return {
    createGameboard,
    placeShip
  };
};


module.exports = { ShipFactory, GameboardFactory };

const gameboardFactory = GameboardFactory();
const gameboard = gameboardFactory.createGameboard(10, 10);


  