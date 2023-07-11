/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module) => {

var ShipFactory = function ShipFactory(length, name) {
  if (!Number.isInteger(length) || length < 1) {
    throw new Error('Invalid ship length: must be a positive integer.');
  }
  if (typeof name !== 'string' || name.trim() === '') {
    throw new Error('Invalid ship name: must be a non-empty string.');
  }
  var hits = 0;
  var hit = function hit() {
    if (hits < length) {
      hits += 1;
    }
  };
  var getHits = function getHits() {
    return hits;
  };
  var isSunk = function isSunk() {
    return hits >= length;
  };
  return {
    hit: hit,
    getHits: getHits,
    isSunk: isSunk,
    name: name
  };
};
var GameboardFactory = function GameboardFactory() {
  function createGameboard(horizontalSize, verticalSize) {
    // Error Checking
    if (!Number.isInteger(horizontalSize) || !Number.isInteger(verticalSize)) {
      throw new Error('Horizontal and Vertical Size must be integers');
    }
    if (horizontalSize < 8 || verticalSize < 8) {
      throw new Error("Horizontal and Vertical Size must be at least 7");
    }

    // Gameboard creation
    var gameboard = [];
    for (var i = 0; i < horizontalSize * verticalSize; i++) {
      gameboard.push({
        cell: i,
        isHit: false,
        isMiss: false,
        name: null
      });
    }
    return {
      gameboard: gameboard,
      horizontalSize: horizontalSize,
      verticalSize: verticalSize
    };
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
      throw new Error("initialCell must be greater than or equal to zero. It represents the initial cell the ship starts on.");
    }
    if (typeof isVertical !== "boolean") {
      throw new Error("isVertical must be a boolean");
    }
    if (!isVertical && gameboardState.horizontalSize - initialCell % gameboardState.horizontalSize < length) {
      throw new Error("The length of the ship exceeds the gameboard's horizontal boundary, starting from the initial cell");
    }
    if (isVertical && gameboardState.verticalSize - Math.floor(initialCell / gameboardState.horizontalSize) < length) {
      throw new Error("The length of the ship exceeds the gameboard's vertical boundary, starting from the initial cell");
    }
    if (isVertical) {
      for (var i = initialCell; i < initialCell + length * gameboardState.horizontalSize; i += gameboardState.horizontalSize) {
        if (gameboardState.gameboard[i].name !== null) {
          throw new Error("Space is already occupied. Please choose another.");
        }
      }
    } else {
      for (var _i = initialCell; _i < initialCell + length; _i += 1) {
        if (gameboardState.gameboard[_i].name !== null) {
          throw new Error("Space is already occupied. Please choose another.");
        }
      }
    }

    // Ship Placement
    if (isVertical) {
      for (var _i2 = initialCell; _i2 < initialCell + length * gameboardState.horizontalSize; _i2 += gameboardState.horizontalSize) {
        gameboardState.gameboard[_i2].name = name;
      }
    } else {
      for (var _i3 = initialCell; _i3 < initialCell + length; _i3 += 1) {
        gameboardState.gameboard[_i3].name = name;
      }
    }
    return {
      gameboardState: gameboardState
    };
  }
  function receiveAttack(gameboardState, coordinate) {
    if (gameboardState.gameboard[coordinate].name !== null) {
      gameboardState.gameboard[coordinate].isHit = true;
    } else {
      gameboardState.gameboard[coordinate].isMiss = true;
    }
  }
  return {
    createGameboard: createGameboard,
    placeShip: placeShip,
    receiveAttack: receiveAttack
  };
};

// const gameboardFactory = GameboardFactory();
// let gameboardState = gameboardFactory.createGameboard(10, 10);
// gameboardFactory.placeShip(gameboardState, 0, false, 3, 'submarine');
// gameboardFactory.placeShip(gameboardState, 60, true, 3, 'submarine');

module.exports = {
  ShipFactory: ShipFactory,
  GameboardFactory: GameboardFactory
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map