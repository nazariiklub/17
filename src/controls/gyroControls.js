export function createGyroControls(gyro) {

    const button = document.getElementById("gyroButton");

    button.addEventListener("click", async () => {

        if (
            typeof DeviceOrientationEvent !== "undefined" &&
            typeof DeviceOrientationEvent.requestPermission === "function"
        ) {

            const permission =
                await DeviceOrientationEvent.requestPermission();

                setTimeout(() => {

    window.dispatchEvent(
        new Event("resize")
    );

}, 100);

            if (permission !== "granted") {

                alert("Доступ не надано");

                return;

            }

        }

        gyro.connect();

        button.style.transform =
    "translateX(-50%) scale(.85)";

button.style.opacity = "0";

button.style.pointerEvents = "none";

setTimeout(() => {

    button.remove();

},350);

        const element = document.documentElement;

if (element.requestFullscreen) {
    element.requestFullscreen();
}

    });

}