const mongoose = require('./../configs/connect');
const QrSchema = require('./../schemas/QrSchema');

module.exports = mongoose.model('Qr', QrSchema);
