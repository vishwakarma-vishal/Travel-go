var cloudinary = require('cloudinary').v2;

const connectCloudinary = () => {
    // Configuration
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET // Click 'View Credentials' below to copy your API secret
        });
        console.log("Successfully connected with cloudinary");
    }
    catch(error){
        console.log("Unable to connect to cloudinary", error);
    }
}

module.exports = connectCloudinary;