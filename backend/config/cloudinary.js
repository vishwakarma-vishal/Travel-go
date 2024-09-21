var cloudinary = require('cloudinary').v2;

const connectCloudinary = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET
        });
        console.log("Successfully connected with cloudinary");
    }
    catch(error){
        console.log("Unable to connect to cloudinary", error);
    }
}

module.exports = connectCloudinary;