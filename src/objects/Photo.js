import * as THREE from 'three';

export function createPhoto(texture) {

    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const image = texture.image;

    const aspect = image.width / image.height;

    const geometry = new THREE.PlaneGeometry(
        aspect * 2,
        2
    );

    const material = new THREE.MeshBasicMaterial({

        map: texture,

        transparent: true,

        side: THREE.DoubleSide

    });

    return new THREE.Mesh(
        geometry,
        material
    );

}