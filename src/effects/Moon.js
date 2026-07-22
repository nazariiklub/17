import * as THREE from "three";
import moonTexture from "../assets/textures/moon.png";

export function createMoon() {

    const texture = new THREE.TextureLoader().load(moonTexture);


    const geometry = new THREE.SphereGeometry(
        40,
        64,
        64
    );


    const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.8,
        metalness: 0.1,

        transparent: true,
        opacity: 0.88
    });


    const moon = new THREE.Mesh(
        geometry,
        material
    );


    moon.position.set(
        -180,
        220,
        -787
    );


    // м'яке сяйво через CanvasTexture
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;

    const ctx = canvas.getContext("2d");

    const gradient = ctx.createRadialGradient(
        128,
        128,
        0,
        128,
        128,
        128
    );

    gradient.addColorStop(
        0,
        "rgba(255,255,255,0.7)"
    );

    gradient.addColorStop(
        0.35,
        "rgba(255,255,255,0.25)"
    );

    gradient.addColorStop(
        1,
        "rgba(255,255,255,0)"
    );


    ctx.fillStyle = gradient;
    ctx.fillRect(
        0,
        0,
        256,
        256
    );


    const glowTexture = new THREE.CanvasTexture(canvas);


    const glowMaterial = new THREE.SpriteMaterial({
        map: glowTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.4
    });


    const glow = new THREE.Sprite(glowMaterial);

    glow.scale.set(
        120,
        120,
        1
    );


    moon.add(glow);



    moon.userData.update = () => {
        moon.rotation.y += 0.0005;
    };


    return moon;
}