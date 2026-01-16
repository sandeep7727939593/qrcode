const express = require('express');
const multer = require('multer');
const { generateQr } = require("./../controllers/api");
const router = express.Router()
const upload = multer();

router.post('/generate-qr', upload.none(), generateQr)

module.exports = router;