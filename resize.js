const sharp = require("sharp");

sharp("public/file-1774848159661-53105578.webp")
    // .resize(200, 2--, {
    //     fit: "cover",
    //     position: "centre",
    // })
    .webp({ quality: 75, effort: 6 })
    .toFile("public/hdjkfh.webp")
    .then(() => console.log("✅ Done"))
    .catch(console.error);



//logos

// const sharp = require("sharp");

// sharp("public/logo/frame.png")
//     .resize({
//         width: 250,
//         fit: "contain" // better for logos
//     })
//     .webp({
//         quality: 90,
//         effort: 6
//     })
//     .toFile("public/logo/footerlogo.webp")
//     .then(() => console.log("✅ Done"))
//     .catch(console.error);
