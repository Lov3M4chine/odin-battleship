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

  function placeShip(gameboard, cell, isVertical, length, name) {
    if (isVertical) {
      for (let i = cell; i <= (cell + length * 10); i+=10) {
        gameboard[i].name = name;
      }
    } else {
      for (let i = cell; i <= (cell + length); i+=1) {
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

// const gameboard = GameboardFactory.createGameboard(10, 10);
// console.log(gameboard);



  