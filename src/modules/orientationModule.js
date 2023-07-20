const orientationModule = (function() {
    const verticalButton = document.getElementById("vertical-button");
    const horizontalButton = document.getElementById("horizontal-button");

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
            verticalButton.classList.add("hidden");
            horizontalButton.classList.remove("hidden");
        } else {
            appContext.orientation.isVertical = true;
            verticalButton.classList.remove("hidden");
            horizontalButton.classList.add("hidden");
        }
    }

    return {
        addOrientationClickEvent,
    }
})();

module.exports = {
    orientationModule
}