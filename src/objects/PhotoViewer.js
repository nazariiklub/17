import * as THREE from "three";

export class PhotoViewer {

    constructor(scene, camera) {

        this.isOpen = false;

        this.scene = scene;
        this.camera = camera;

        this.photo = null;
        this.targetScale = 1;

    }

    open(texture, place, year) {

        if (this.photo) {

            this.scene.remove(this.photo);

        }

        // Пропорції фото
        const image = texture.image;
        const aspect = image.width / image.height;

        const geometry = new THREE.PlaneGeometry(
            aspect * 3,
            3
        );

        const material = new THREE.MeshBasicMaterial({

            map: texture,
            transparent: true

        });

        this.photo = new THREE.Mesh(
            geometry,
            material
        );

        this.photo.position.set(0, 0, -2.5);

        this.photo.scale.set(0.01, 0.01, 0.01);

        this.camera.add(this.photo);

        this.isOpen = true;

        this.targetScale = 1;

const canvas = document.createElement("canvas");

canvas.width = 1024;
canvas.height = 180;

const ctx = canvas.getContext("2d");

ctx.fillStyle = "rgba(0,0,0,0.35)";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle = "white";

ctx.font = "52px Arial";

ctx.textAlign = "center";

ctx.fillText(
    place,
    canvas.width / 2,
    70
);

ctx.font = "42px Arial";

ctx.fillText(
    year,
    canvas.width / 2,
    140
);

        const labelTexture = new THREE.CanvasTexture(canvas);

        const label = new THREE.Sprite(

            new THREE.SpriteMaterial({

                map: labelTexture,
                transparent: true

            })

        );

        label.scale.set(2.5, 0.6, 1);

        label.position.set(0, -2.2, 0);

        this.photo.add(label);

    }

    close() {

    if (!this.photo) return;

    this.camera.remove(this.photo);

    this.photo = null;

    this.isOpen = false;

}

    update() {

        if (!this.photo) return;

        this.photo.scale.lerp(

            new THREE.Vector3(
                this.targetScale,
                this.targetScale,
                this.targetScale
            ),

            0.12

        );

    }

}