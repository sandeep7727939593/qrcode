const qrcode = require("./../utils/qrgenerator");
const validator = require("validator");
const Qr = require('./../models/QrModel');
const {getQrUrl} = require('./../utils/urls');
const UploadFile = require('./../utils/uploadFile');


module.exports.generateQr = async (req, res) => {
    try {
        const url = req.body.url;
        const color = req.body.color;
        const size = req.body.size;
        if (!url || !validator.isURL(url)) {
            return res.status(400).json({ error: "Invalid URL" });
        }
        const qr = qrcode(url, color, size);
        const qr_path = await UploadFile(qr);
        Qr.create({
            request_url: url,
            qr_path: qr_path.url
        });
        res.status(201).json({
            success : true,
            qrCodeUrl: getQrUrl(qr_path.url)
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ error: "Code collision, retry" });
        }

        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}