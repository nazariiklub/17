const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const photosDir = path.join(__dirname, "src/assets/photos");

async function compress() {

    const files = fs.readdirSync(photosDir);

    for (const file of files) {

        if (!file.endsWith(".jpg")) continue;

        const filePath = path.join(photosDir, file);

        console.log("Обробляю:", file);

        await sharp(filePath)
            .resize({
                width: 1600,
                withoutEnlargement: true
            })
            .jpeg({
                quality: 85,
                mozjpeg: true
            })
            .toFile(filePath + ".tmp");

        fs.unlinkSync(filePath);

        fs.renameSync(
            filePath + ".tmp",
            filePath
        );

    }

    console.log("✅ Готово!");

}

compress();