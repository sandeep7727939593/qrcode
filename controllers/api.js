const qrcode = require("./../utils/qrgenerator");
const validator = require("validator");
const Qr = require('./../models/QrModel');
const {getQrUrl} = require('./../utils/urls');


module.exports.generateQr = async (req, res) => {
    try {
        const url = req.body.url;
        const color = req.body.color;
        const size = req.body.size;
        if (!url || !validator.isURL(url)) {
            return res.status(400).json({ error: "Invalid URL" });
        }
        // QR image local "public/" folder me save hoti hai aur Express usse serve karta hai
        const fileName = await qrcode(url, color, size);
        const qrPath = `/${fileName}`;
        await Qr.create({
            request_url: url,
            qr_path: qrPath
        });
        res.status(201).json({
            success : true,
            qrCodeUrl: getQrUrl(qrPath)
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ error: "Code collision, retry" });
        }

        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports.stats = async (req, res) => {
    try {
        const [total, recent] = await Promise.all([
            Qr.countDocuments(),
            Qr.find().sort({ createdAt: -1 }).limit(6).select("request_url qr_path createdAt").lean()
        ]);
        res.json({ total, recent });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not load stats" });
    }
}