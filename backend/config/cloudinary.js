import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const connectCloudinary = async () => {
    try {
        // Configure Cloudinary
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY,
        });

        console.log("Cloudinary configured successfully");
    } catch (error) {
        console.error("Failed to configure Cloudinary:", error.message);
    }
};

export default connectCloudinary;
