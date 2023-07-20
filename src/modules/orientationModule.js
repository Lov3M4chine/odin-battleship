const orientationModule = (function() {


    function addOrientationClickEvent(appContext) {
        const orientationButtons = document.querySelectorAll(".orientation-button");
        orientationButtons.forEach(function(button) {
            button.removeEventListener('click', () => toggleOrientation(appContext));
            button.addEventListener('click', () => toggleOrientation(appContext));
        });
        console.log("Orientation click event added");
    }

    function toggleOrientation(appContext) {
        if (appContext.orientation.isVertical === true) {
            appContext.orientation.isVertical = false;
            appContext.appElements.verticalButton.classList.add("hidden");
            appContext.appElements.horizontalButton.classList.remove("hidden");
        } else {
            appContext.orientation.isVertical = true;
            appContext.appElements.verticalButton.classList.remove("hidden");
            appContext.appElements.horizontalButton.classList.add("hidden");
        }
    }

    return {
        addOrientationClickEvent,
    }
})();

module.exports = {
    orientationModule
}