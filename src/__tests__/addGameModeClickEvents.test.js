const { addGameModeClickEvents } = require("../modules/addGameModeClickEvents");
const { initializeOnePlayerMode, initializeTwoPlayerMode } = require("../modules/playerModeInitializations");


jest.mock("../modules/playerModeInitializations");

describe('addGameModeClickEvents', () => {
    let appContext;

    beforeEach(() => {
        // Mock the HTML elements and their click events
        appContext = {
            appElements: {
                onePlayerMode: {
                    addEventListener: jest.fn(),
                },
                twoPlayerMode: {
                    addEventListener: jest.fn(),
                }
            }
        };

        // Reset all mocked functions
        initializeOnePlayerMode.mockReset();
        initializeTwoPlayerMode.mockReset();
    });

    it('should attach click events to the onePlayerMode and twoPlayerMode elements', () => {
        addGameModeClickEvents(appContext);

        expect(appContext.appElements.onePlayerMode.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
        expect(appContext.appElements.twoPlayerMode.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    });

    it('should call initializeOnePlayerMode when onePlayerMode is clicked', () => {
        addGameModeClickEvents(appContext);
        
        const clickCallback = appContext.appElements.onePlayerMode.addEventListener.mock.calls[0][1];
        clickCallback();
        
        expect(initializeOnePlayerMode).toHaveBeenCalledWith(appContext);
    });

    it('should call initializeTwoPlayerMode when twoPlayerMode is clicked', () => {
        addGameModeClickEvents(appContext);

        const clickCallback = appContext.appElements.twoPlayerMode.addEventListener.mock.calls[0][1];
        clickCallback();

        expect(initializeTwoPlayerMode).toHaveBeenCalledWith(appContext);
    });
});
