function validateInput(value, type, errorMessage) {
  if (typeof value !== type) {
    throw new Error(errorMessage);
  }
}

function validateAppContext(appContext) {
  validateInput (appContext, "object", "appContext must be an object");
  validateInput (appContext.horizontalSize, "number", "horizontalSize must be an integer");
  validateInput (appContext.verticalSize, "number", "verticalSize must be an integer");
  if (appContext.horizontalSize < 7 || appContext.verticalSize < 7) {
    throw new Error ("horizontal and vertical sizes should be at least 7")
  }
}

function validatePlaceShipInputs(cellSelected, isVertical, appContext) {
  validateInput(cellSelected, "number", "cellSelected must be an integer.");
  validateInput(isVertical, "boolean", "isVertical must be a boolean.");

  if (cellSelected < 0 || cellSelected >= appContext.horizontalSize * appContext.verticalSize) {
    throw new Error("cellSelected must be greater than or equal to zero and less than gameboard boundaries. It represents the initial cell the ship starts on.");
  }
}

  module.exports = {
    validateInput,
    validateAppContext,
    validatePlaceShipInputs,
  }

