const QRCode = require('qrcode');
const path = require('path');

module.exports = function (urlToEncode, color, size) {
    const outputPath = path.resolve("public");
    const name = Date.now() + ".png";
    const dimension = Number(size) || 300;

    return new Promise((resolve, reject) => {
        QRCode.toFile(`${outputPath}/${name}`, urlToEncode, {
            width: dimension,
            margin: 2,
            color: {
                dark: color || '#000000',  // dots
                light: '#FFFFFF'           // background
            }
        }, function (err) {
            if (err) return reject(err);
            console.log('QR code saved to', outputPath, color, dimension);
            resolve(name);
        });
    });
}
