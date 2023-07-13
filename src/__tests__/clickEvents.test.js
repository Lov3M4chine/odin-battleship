const { addGameModeClickEvents, playerModeInitializations } = require('../clickEvents');

let horizontalSize;
let verticalSize;

beforeEach(() => {
    document.body.innerHTML = `<!DOCTYPE html>
    <html lang="en" data-theme="dark">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="styles.css">
        <title>Battleship</title>
    </head>
    <body>
        <div id="main-container" class="flex flex-col items-center gap-16">
            <div class="text-primary-content flex justify-center text-5xl">Battleship</div>
    
            <!-- Mode Select -->
            <div id="mode-select-container" class="flex flex-col justify-center items-center gap-10 flex-grow">
                <button id="one-player-mode" class="btn bg-accent text-accent-content text-lg">One Player</button>
                <div class="text-primary-content flex justify-center">OR</div>
                <button id="two-player-mode" class="btn bg-secondary text-secondary-content text-lg">Two Player</button>
            </div>
        </div>
    </body>
    </html>`;
    horizontalSize = 10;
    verticalSize = 10;
});

afterEach(() => {
    document.body.innerHTML = '';
  });

test('addGameModeClickEvents throws an error when horizontal or vertical size is not an integer', () => {
    expect(() => addGameModeClickEvents("string", 10)).toThrow();
    expect(() => addGameModeClickEvents(10, "string")).toThrow();
    expect(() => addGameModeClickEvents("string", "string")).toThrow();
});

test('addGameModeClickEvents throws an error when horizontal or vertical size is not > 7', () => {
    expect(() => addGameModeClickEvents(5, 10)).toThrow();
    expect(() => addGameModeClickEvents(10, 5)).toThrow();
    expect(() => addGameModeClickEvents(5, 5)).toThrow();
});

test('should add event listeners to one-player-mode button', () => {
    playerModeInitializations.initializeOnePlayerMode = jest.fn();
    addGameModeClickEvents(horizontalSize, verticalSize);
    document.getElementById('one-player-mode').click();
    expect(playerModeInitializations.initializeOnePlayerMode).toHaveBeenCalledWith(horizontalSize, verticalSize);
});

test('should add event listeners to two-player-mode button', () => {
    playerModeInitializations.initializeTwoPlayerMode = jest.fn();
    addGameModeClickEvents(horizontalSize, verticalSize);
    document.getElementById('two-player-mode').click();
    expect(playerModeInitializations.initializeTwoPlayerMode).toHaveBeenCalledWith(horizontalSize, verticalSize);
});



  


