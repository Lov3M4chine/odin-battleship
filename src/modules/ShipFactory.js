const ShipFactory = (name, size) => {
    if (!Number.isInteger(size) || size < 1) {
        throw new Error('Invalid ship length: must be a positive integer.');
    }
  
    if (typeof name !== 'string' || name.trim() === '') {
        throw new Error('Invalid ship name: must be a non-empty string.');
    }
  
    let coordinates = [];
    let hits = 0;
  
    const hit = () => {
      if (hits < size) {
        hits += 1;
      }
    };
  
    const getHits = () => hits;
    const isSunk = () => hits >= size;
  
    return {
      hit,
      getHits,
      isSunk,
      name,
      coordinates
    };
  };

  module.exports = ShipFactory;
  
  
  
  
  
    