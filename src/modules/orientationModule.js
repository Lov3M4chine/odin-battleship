const orientationModule = (function() {


    function addOrientationClickEvent(appContext) {
        const orientationButtons = document.querySelectorAll(".orientation-button");
        orientationButtons.forEach(function(button) {
            button.removeEventListener('click', () => toggleOrientation(appContext));
            button.addEventListener('click', () => toggleOrientation(appContext));
        });
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

    function hideOrientationButton(appContext) {
        if (appContext.orientation.isVertical === true) {
            appContext.appElements.verticalButton.classList.add("hidden");
        } else {
            appContext.appElements.horizontalButton.classList.add("hidden");
        }
    }

    return {
        addOrientationClickEvent,
        hideOrientationButton
    }
})();

module.exports = {
    orientationModule
}