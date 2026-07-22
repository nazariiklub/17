import * as THREE from 'three';

export function createLight() {
    const light = new THREE.DirectionalLight(0xffffff, 3);

    light.position.set(5, 5, 5);

    return light;
}