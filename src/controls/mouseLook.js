export function createMouseLook(controller) {

    window.addEventListener("mousemove", (event) => {

        controller.addRotation(
            -event.movementX * 0.002,
            -event.movementY * 0.002
        );

    });

}