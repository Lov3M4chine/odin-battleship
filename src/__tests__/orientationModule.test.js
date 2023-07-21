const { orientationModule } = require("../modules/orientationModule");

describe('orientationModule', () => {
  let appContext;
  let mockButton;

  beforeEach(() => {
    mockButton = { 
      addEventListener: jest.fn(), 
      removeEventListener: jest.fn() 
    };
    
    appContext = {
      orientation: {
        isVertical: false
      },
      appElements: {
        verticalButton: { 
            classList: { 
                add: jest.fn(), 
                remove: jest.fn() 
            } 
        },
        horizontalButton: { 
            classList: { 
                add: jest.fn(), 
                remove: jest.fn() 
            } 
        }
      }
    };
  
    document.querySelectorAll = jest.fn().mockReturnValue([mockButton]);
  });

  it('should add orientation click event', () => {
    orientationModule.addOrientationClickEvent(appContext);
    expect(document.querySelectorAll).toHaveBeenCalledWith(".orientation-button");
    expect(mockButton.removeEventListener).toHaveBeenCalled();
    expect(mockButton.addEventListener).toHaveBeenCalled();
  });
});
