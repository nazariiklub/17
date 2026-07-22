import * as THREE from "three";

export function createSpace() {
    const geometry = new THREE.SphereGeometry(800, 64, 64);
    const canvas = document.createElement("canvas");

    canvas.width = 2048;
    canvas.height = 1024;

    const ctx = canvas.getContext("2d");

    // Створюємо радіальний градієнт замість лінійного
    const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
    );

gradient.addColorStop(0, "#0a0714");    // Темно-фіолетовий акцент
gradient.addColorStop(0.3, "#050711");  // Темно-синій тон
gradient.addColorStop(0.7, "#020206");  // Гранітний темний
gradient.addColorStop(1, "#000000");    // Чорний

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace; // Гарантує правильне відображення кольорів у Three.js

    const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide,
        fog: false // Вимикає сценічний туман, який часто робить такі сфери сірими
    });

    return new THREE.Mesh(geometry, material);
}