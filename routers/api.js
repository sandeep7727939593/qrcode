const express = require('express');
const multer = require('multer');
const { generateQr, stats } = require("./../controllers/api");
const router = express.Router()
const upload = multer();

router.post('/generate-qr', upload.none(), generateQr)
router.get('/stats', stats)

module.exports = router;