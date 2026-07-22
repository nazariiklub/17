import * as THREE from "three";


function createTexture() {

    const canvas = document.createElement("canvas");

    canvas.width = 512;
    canvas.height = 512;

    const ctx = canvas.getContext("2d");


    const gradient = ctx.createRadialGradient(
        256,
        256,
        20,
        256,
        256,
        256
    );


    gradient.addColorStop(
        0,
        "rgba(255,255,255,1)"
    );

    gradient.addColorStop(
        0.25,
        "rgba(255,255,255,0.5)"
    );

    gradient.addColorStop(
        0.7,
        "rgba(255,255,255,0.15)"
    );

    gradient.addColorStop(
        1,
        "rgba(255,255,255,0)"
    );


    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        512,
        512
    );


    return new THREE.CanvasTexture(canvas);
}



export function createNebula(
    color = 0x8844ff
) {


    const texture = createTexture();


    const group = new THREE.Group();


    for (let i = 0; i < 25; i++) {


        const material = new THREE.SpriteMaterial({

            map: texture,

            color: color,

            transparent: true,

            opacity: 0.25,

            depthWrite: false

        });


        const sprite = new THREE.Sprite(
            material
        );


        const size = 200 + Math.random()*250;


        sprite.scale.set(
            size,
            size,
            1
        );


        sprite.position.set(

            (Math.random()-0.5)*500,

            (Math.random()-0.5)*300,

            (Math.random()-0.5)*100

        );


        group.add(sprite);

    }


    group.position.set(
        -180,
        220,
        -850
    );


    return group;
}