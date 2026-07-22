export class CameraController {

    constructor(camera) {

        this.camera = camera;

        this.yaw = 0;
        this.pitch = 0;

        this.camera.rotation.order = "YXZ";

    }

    setRotation(yaw, pitch) {

        const limit = Math.PI / 2 - 0.05;

        this.yaw = yaw;

        this.pitch = Math.max(
            -limit,
            Math.min(limit, pitch)
        );

        this.camera.rotation.y = this.yaw;
        this.camera.rotation.x = this.pitch;

    }

    addRotation(deltaYaw, deltaPitch) {

        this.setRotation(
            this.yaw + deltaYaw,
            this.pitch + deltaPitch
        );

    }

}