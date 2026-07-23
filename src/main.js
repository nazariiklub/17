import './style.css';
import * as THREE from 'three';

import { createScene } from './core/scene';
import { createCamera } from './core/camera';
import { createRenderer } from './core/renderer';
import { createLight } from './core/light';
import { createPhoto } from './objects/Photo';
import { getPhotoPosition } from './utils/sphereLayout';
import { createMouseLook } from "./controls/mouseLook";
import { CameraController } from "./controls/cameraController";
import { createGyroControls } from "./controls/gyroControls";
import { DeviceOrientationController } from "./controls/deviceOrientation";
import { createSpace } from "./objects/Space";
import { createStars } from "./effects/Stars";
import { createMoon } from "./effects/Moon";
import { createNebula } from "./effects/Nebula.js";



import photos from "./assets/photos";

// Створюємо сцену
const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();
const controller = new CameraController(camera);
const gyro = new DeviceOrientationController(camera);
createGyroControls(gyro);
const space = createSpace();
scene.add(space)
const stars = createStars();
scene.add(stars);;
const moon = createMoon();
scene.add(moon);
scene.add(createNebula());




function resizeRenderer() {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

}

resizeRenderer();

window.addEventListener(
    "resize",
    resizeRenderer
);

document.addEventListener(
    "fullscreenchange",
    resizeRenderer
);





const light = createLight();
scene.add(light);

// Завантажувач текстур
const loader = new THREE.TextureLoader();

// Масив фотографій
const images = photos;

console.log(images.length);
// Масив створених об'єктів


let currentPhoto = 0;

function loadNextPhoto() {

    if (currentPhoto >= images.length) return;

    loader.load(images[currentPhoto], (texture) => {

        const photo = createPhoto(texture);

        const { x, y, z } = getPhotoPosition(
            currentPhoto,
            images.length
        );

        photo.position.set(x, y, z);

        photo.lookAt(0, 0, 0);

        scene.add(photo);

        currentPhoto++;

        requestAnimationFrame(loadNextPhoto);

    });

}

loadNextPhoto();


createMouseLook(controller);

function animate() {
    requestAnimationFrame(animate);

    gyro.update();
    renderer.render(scene, camera);
}

animate();