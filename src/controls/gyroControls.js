export function createGyroControls(gyro) {

    const button = document.getElementById("gyroButton");

    button.addEventListener("click", async () => {

        if (
            typeof DeviceOrientationEvent !== "undefined" &&
            typeof DeviceOrientationEvent.requestPermission === "function"
        ) {

            const permission =
                await DeviceOrientationEvent.requestPermission();

            if (permission !== "granted") {

                alert("Доступ не надано");

                return;

            }

        }

        gyro.connect();

        button.style.display = "none";

    });

}