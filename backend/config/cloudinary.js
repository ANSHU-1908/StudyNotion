const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

const cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log("Cloudinary Connected!");
  } catch (error) {
    console.error("Cloudinary Connection Failed:", error.message);
  }
};

module.exports = cloudinaryConnect;
