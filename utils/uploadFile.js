const cloudinary = require("cloudinary").v2;
const path = require('path');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = async (image) => {
  try {
console.log("image", image)
    const filePath = path.join(__dirname, "/../", "public", image);
    const uploadRes = await cloudinary.uploader.upload(filePath, {
      folder: "qr-codes",
      public_id: `qr_${Date.now()}`,
    });
    return {
      success: true,
      url: uploadRes.secure_url,
    };

  } catch (err) {
    return { error: err.message };
  }
};
