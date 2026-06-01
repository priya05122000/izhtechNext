// const sharp = require("sharp");

// sharp("public/file-1774848159661-53105578.webp")
//     // .resize(200, 2--, {
//     //     fit: "cover",
//     //     position: "centre",
//     // })
//     .webp({ quality: 75, effort: 6 })
//     .toFile("public/hdjkfh.webp")
//     .then(() => console.log("✅ Done"))
//     .catch(console.error);



//logos

const sharp = require("sharp");

sharp("public/file-1780144206044-918350225.webp")
    .resize({
        // width: 651,
        height: 420,
        fit: "cover"
    })
    .webp({
        quality: 80,
        effort: 6
    })
    .toFile("public/changes/8.webp")
    .then(() => console.log("✅ Done"))
    .catch(console.error);


// const sharp = require("sharp");

// sharp(
//     "public/images/objects/text-rotate.gif",
//     {
//         animated: true,
//         limitInputPixels: false,
//     }
// )

//     .resize({
//         width: 800,
//     })

//     .webp({
//         quality: 50,
//         effort: 6,
//     })

//     .toFile("public/images/objects/text-rotate.webp")

//     .then(() => console.log("✅ GIF compressed"))
//     .catch(console.error);
