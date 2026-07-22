import * as THREE from "three";

export class DeviceOrientationController {

    constructor(camera) {

        this.camera = camera;

        this.enabled = false;

        this.screenOrientation = 0;

        this.alpha = 0;
        this.beta = 0;
        this.gamma = 0;

        this.zee = new THREE.Vector3(0, 0, 1);

        this.euler = new THREE.Euler();

        this.q0 = new THREE.Quaternion();

        this.q1 = new THREE.Quaternion(
            -Math.sqrt(0.5),
            0,
            0,
            Math.sqrt(0.5)
        );

        this.quaternion = new THREE.Quaternion();

        this.offset = new THREE.Quaternion();

    }

    getScreenOrientation() {

        return window.screen.orientation
            ? window.screen.orientation.angle
            : window.orientation || 0;

    }

    connect() {

        this.screenOrientation = this.getScreenOrientation();

        window.addEventListener(
            "orientationchange",
            () => {

                this.screenOrientation = this.getScreenOrientation();

            }
        );

        window.addEventListener(
            "deviceorientation",
            (event) => {

                this.alpha = event.alpha || 0;
                this.beta = event.beta || 0;
                this.gamma = event.gamma || 0;

            }
        );

        this.enabled = true;

        setTimeout(() => {

            this.update();

            this.calibrate();

        }, 300);

    }

    disconnect() {

        this.enabled = false;

    }

    calibrate() {

        this.offset.copy(this.quaternion).invert();

    }

    update() {

        if (!this.enabled) return;

        const alpha = THREE.MathUtils.degToRad(this.alpha);
        const beta = THREE.MathUtils.degToRad(this.beta);
        const gamma = THREE.MathUtils.degToRad(this.gamma);
        const orient = THREE.MathUtils.degToRad(this.screenOrientation);

        this.euler.set(
            beta,
            alpha,
            -gamma,
            "YXZ"
        );

        this.quaternion.setFromEuler(this.euler);

        this.quaternion.multiply(this.q1);

        this.q0.setFromAxisAngle(
            this.zee,
            -orient
        );

        this.quaternion.multiply(this.q0);

        const target = this.offset.clone().multiply(this.quaternion);

this.camera.quaternion.slerp(
    target,
    0.8
);

    }

}