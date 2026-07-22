export function getPhotoPosition(index, total, radius = 8) {

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    const y = 1 - (index / (total - 1)) * 2;

    const r = Math.sqrt(1 - y * y);

    const theta = goldenAngle * index;

    let x = Math.cos(theta) * r;
    let z = Math.sin(theta) * r;

    // невелике стабільне зміщення
    x += Math.sin(index * 2.3) * 0.08;
    z += Math.cos(index * 3.1) * 0.08;

    return {
        x: x * radius,
        y: y * radius,
        z: z * radius
    };

}