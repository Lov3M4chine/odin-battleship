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
    let gameboard = [];
    for (let i = 0; i < (horizontalSize * verticalSize); i++) {
      gameboard.push({cell: i, isHit: false, isMiss: false, name: null})
    }
    return gameboard;
  }

  return {
    createGameboard,
  };
};


module.exports = { ShipFactory, GameboardFactory };



  