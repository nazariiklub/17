import * as THREE from "three";

export function createGyroControls(controller) {

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

    if (
        event.alpha === null ||
        event.beta === null ||
        event.gamma === null
    ) return;

    const yaw = THREE.MathUtils.degToRad(event.alpha);
const pitch = THREE.MathUtils.degToRad(event.beta - 90);

controller.setRotation(yaw, pitch);

});

        button.style.display = "none";

    });

}