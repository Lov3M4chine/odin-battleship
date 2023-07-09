/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module) => {

eval("var ShipFactory = function ShipFactory(length, name) {\n  if (!Number.isInteger(length) || length < 1) {\n    throw new Error('Invalid ship length: must be a positive integer.');\n  }\n  if (typeof name !== 'string' || name.trim() === '') {\n    throw new Error('Invalid ship name: must be a non-empty string.');\n  }\n  var hits = 0;\n  var hit = function hit() {\n    if (hits < length) {\n      hits += 1;\n    }\n  };\n  var getHits = function getHits() {\n    return hits;\n  };\n  var isSunk = function isSunk() {\n    return hits >= length;\n  };\n  return {\n    hit: hit,\n    getHits: getHits,\n    isSunk: isSunk,\n    name: name\n  };\n};\nvar GameboardFactory = function GameboardFactory() {\n  function createGameboard(horizontalSize, verticalSize) {\n    if (!Number.isInteger(horizontalSize) || !Number.isInteger(verticalSize)) {\n      throw new Error('Horizontal and Vertical Size must be integers');\n    }\n    if (horizontalSize < 8 || verticalSize < 8) {\n      throw new Error(\"Horizontal and Vertical Size must be at least 7\");\n    }\n    var gameboard = [];\n    for (var i = 0; i < horizontalSize * verticalSize; i++) {\n      gameboard.push({\n        cell: i,\n        isHit: false,\n        isMiss: false,\n        name: null\n      });\n    }\n    return gameboard;\n  }\n  function placeShip(gameboard, cell, isVertical, length, name) {\n    if (isVertical) {\n      for (var i = cell; i <= cell + length * 10; i += 10) {\n        gameboard[i].name = name;\n      }\n    } else {\n      for (var _i = cell; _i <= cell + length; _i += 1) {\n        gameboard[_i].name = name;\n      }\n    }\n    return gameboard;\n  }\n  return {\n    createGameboard: createGameboard,\n    placeShip: placeShip\n  };\n};\nmodule.exports = {\n  ShipFactory: ShipFactory,\n  GameboardFactory: GameboardFactory\n};\nvar gameboardFactory = GameboardFactory();\nvar gameboard = gameboardFactory.createGameboard(10, 10);\nconsole.log(gameboard);\n\n//# sourceURL=webpack:///./src/index.js?");

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