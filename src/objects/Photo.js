import * as THREE from 'three';

export function createPhoto(texture) {

    const image = texture.image;

    const aspect = image.width / image.height;

    const geometry = new THREE.PlaneGeometry(
        aspect * 2,
        2
    );

    const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide
});


    return new THREE.Mesh(geometry, material);
}