export function createGyroControls() {

    const button = document.getElementById("gyroButton");

    button.addEventListener("click", async () => {

        if (
            typeof DeviceOrientationEvent !== "undefined" &&
            typeof DeviceOrientationEvent.requestPermission === "function"
        ) {

            const permission = await DeviceOrientationEvent.requestPermission();

            if (permission !== "granted") {
                alert("Доступ не надано");
                return;
            }

        }

        window.addEventListener("deviceorientation", (event) => {

            console.clear();

            console.log("alpha:", event.alpha);
            console.log("beta :", event.beta);
            console.log("gamma:", event.gamma);

        });

        button.style.display = "none";

    });

}