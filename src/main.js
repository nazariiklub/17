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

import photo1 from './assets/photos/1.jpg';
import photo2 from './assets/photos/2.png';
import photo3 from './assets/photos/3.png';
import photo4 from './assets/photos/4.png';
import photo5 from './assets/photos/5.png';
import photo6 from './assets/photos/6.png';

// Створюємо сцену
const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();
const controller = new CameraController(camera);
createGyroControls(controller);


const light = createLight();
scene.add(light);

// Завантажувач текстур
const loader = new THREE.TextureLoader();

// Масив фотографій
const originalImages = [
    photo1,
    photo2,
    photo3,
    photo4,
    photo5,
    photo6
];

const images = [];

for (let i = 0; i < 36; i++) {
    images.push(originalImages[i % originalImages.length]);
}
console.log(images.length);
// Масив створених об'єктів


images.forEach((image, index) => {
loader.load(image, (texture) => {

    const photo = createPhoto(texture);

const { x, y, z } = getPhotoPosition(index, images.length);

photo.position.set(x, y, z);
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.2),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);


 
scene.add(sphere);
photo.lookAt(0, 0, 0);


    scene.add(photo);

});
});


createMouseLook(controller);

function animate() {
    requestAnimationFrame(animate);

    
    renderer.render(scene, camera);
}

animate();