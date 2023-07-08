const ShipFactory = (length, name) => {
    let hits = 0;
    let isSunk = false;
  
    const hit = () => {
      hits += 1;
      if (hits >= length) {
        isSunk = true;
      }
    };
  
    const getHits = () => hits;
    const getSunkStatus = () => isSunk;
  
    return {
      hit,
      getHits,
      getSunkStatus,
      name,
    };
};

module.exports = { ShipFactory };



  