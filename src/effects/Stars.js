import * as THREE from "three";

function createLayer(count, radius, size, minBrightness, maxBrightness) {

    const geometry = new THREE.BufferGeometry();

    const positions = [];
    const colors = [];

    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {

        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);

        positions.push(x, y, z);

        const b =
    minBrightness +
    Math.random() *
    (maxBrightness - minBrightness);

const r = Math.random();

if (r < 0.94) {

    // 94% майже білі
    color.setRGB(b, b, b);

}
else if (r < 0.97) {

    // 3% теплі
    color.setRGB(
        b,
        b * 0.94,
        b * 0.82
    );

}
else {

    // 3% холодні
    color.setRGB(
        b * 0.82,
        b * 0.90,
        b
    );

}

        colors.push(
            color.r,
            color.g,
            color.b
        );

    }

    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
            positions,
            3
        )
    );

    geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(
            colors,
            3
        )
    );

    const material = new THREE.PointsMaterial({

        size,

        vertexColors: true,

        sizeAttenuation: false,

        transparent: true,

        opacity: 1

    });

    return new THREE.Points(
        geometry,
        material
    );

}

export function createStars() {

    const group = new THREE.Group();

    // Дуже багато маленьких
    group.add(
        createLayer(
            2200,
            790,
            1,
            0.35,
            0.65
        )
    );

    // Трохи середніх
    group.add(
        createLayer(
            250,
            789,
            2,
            0.75,
            0.95
        )
    );

    // Дуже мало великих
    group.add(
        createLayer(
            35,
            788,
            4,
            0.95,
            1
        )
    );

    return group;

}