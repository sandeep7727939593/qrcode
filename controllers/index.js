const Qr = require('./../models/QrModel');

module.exports.home = async (req, res) => {
    let total = 0;
    let recent = [];
    try {
        [total, recent] = await Promise.all([
            Qr.countDocuments(),
            Qr.find().sort({ createdAt: -1 }).limit(6).select("request_url qr_path createdAt").lean()
        ]);
    } catch (err) {
        console.error("Could not load home stats:", err.message);
    }
    res.render('home', { total, recent });
}
