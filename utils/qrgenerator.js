const QRCode = require('qrcode');
const path = require('path');

module.exports = function (urlToEncode, color, size) {
    let outputPath = path.resolve("public", "qr");
    let name = Date.now() + ".png";
    QRCode.toFile(`${outputPath}/${name}`, urlToEncode, {
        width : size || 100,
        height : size || 100,
        color: {
            dark: color || '#000000', // Black dots
            light: '#FFFFFF' // White background
        }
    }, function (err) {
        if (err) throw err;
        console.log('QR code saved to', outputPath, color, size);
    });
    return name;
}