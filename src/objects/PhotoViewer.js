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

            this.camera.remove(this.photo);

        }

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

        if (aspect > this.camera.aspect) {

    this.targetScale = this.camera.aspect / aspect;

}

        // ---------- Підпис ----------

        const canvas = document.createElement("canvas");

        canvas.width = 900;
        canvas.height = 200;

        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "rgba(0,0,0,.22)";
        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.fillStyle = "#ffffff";

        const fontSize = Math.min(
    74,
    Math.max(46, 900 / place.length)
);

ctx.font = `600 ${fontSize}px 'Cormorant Garamond'`;

        ctx.textAlign = "center";

        ctx.shadowColor = "rgba(255,255,255,.15)";
        ctx.shadowBlur = 12;

        ctx.fillText(
            place,
            canvas.width / 2,
            82
        );

        ctx.shadowBlur = 0;

        ctx.globalAlpha = .28;

        ctx.beginPath();

        ctx.moveTo(420,120);

        ctx.lineTo(780,120);

        ctx.strokeStyle = "#ffffff";

        ctx.lineWidth = 2;

        ctx.stroke();

        ctx.globalAlpha = 1;

        ctx.fillStyle = "rgba(255,255,255,.82)";

        ctx.font = "400 42px 'Cormorant Garamond'";

        ctx.fillText(
            year,
            canvas.width / 2,
            182
        );

        const labelTexture = new THREE.CanvasTexture(canvas);

        const label = new THREE.Sprite(

            new THREE.SpriteMaterial({

                map: labelTexture,

                transparent: true,

                depthTest: false

            })

        );

        label.scale.set(5.8,1.25,1);

        label.position.set(
            0,
            -2.35,
            0
        );

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