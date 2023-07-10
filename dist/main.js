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
    if (!Number.isInteger(horizontalSize) || !Number.isInteger(verticalSize)) {
      throw new Error('Horizontal and Vertical Size must be integers');
    }
    if (horizontalSize < 8 || verticalSize < 8) {
      throw new Error("Horizontal and Vertical Size must be at least 7");
    }
    var gameboard = [];
    for (var i = 0; i < horizontalSize * verticalSize; i++) {
      gameboard.push({
        cell: i,
        isHit: false,
        isMiss: false,
        name: null
      });
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
      throw new Error("initialCell must be greater than or equal to zero. It represents the initial cell the ship starts on.");
    }
    if (typeof isVertical !== "boolean") {
      throw new Error("isVertical must be a boolean");
    }
    if (isVertical) {
      for (var i = initialCell; i <= initialCell + length * 10; i += 10) {
        gameboard[i].name = name;
      }
    } else {
      for (var _i = initialCell; _i <= initialCell + length; _i += 1) {
        gameboard[_i].name = name;
      }
    }
    return gameboard;
  }
  return {
    createGameboard: createGameboard,
    placeShip: placeShip
  };
};
module.exports = {
  ShipFactory: ShipFactory,
  GameboardFactory: GameboardFactory
};
var gameboardFactory = GameboardFactory();
var gameboard = gameboardFactory.createGameboard(10, 10);

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