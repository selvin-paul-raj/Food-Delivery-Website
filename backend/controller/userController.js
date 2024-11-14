import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import userModel from '../modal/userModel.js';

// Firebase configuration and initialization
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// For updating user
export const updateUser = async (req, res) => {
    const id = req.UserId;

    // Check if user exists
    const user = await userModel.findById(id);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found! Please Login Again' });
    }

    try {
        const { email, name, gender, phone } = req.body;
        // Get the image (file) from the request
        let photo = req.file;

        let uploadResult = null;

        // Check if the photo exists
        if (photo) {
            try {
                // Firebase Storage reference for the photo
                const storageRef = ref(storage, `userPhotos/${Date.now()}_${photo.originalname}`);
                const snapshot = await uploadBytes(storageRef, photo.buffer);
                uploadResult = await getDownloadURL(snapshot.ref);
            } catch (uploadError) {
                return res.status(500).json({ success: false, message: 'Failed to upload photo SELVIN', error: uploadError.message });
            }
        } else {
            // Use the existing user's photo if no new photo was uploaded, or use a default
            uploadResult = {
                secure_url: user.photo || '',
            };
        }

        // Create a new user data object
        const userData = {
            email,
            name,
            phone,
            photo: uploadResult, // Assign the photo URL (either uploaded, existing, or default)
            gender,
        };

        // Update user details
        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            { $set: userData },
            { new: true } // Return the updated user
        );

        // If user doesn't exist after the update
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found! Please Login Again' });
        }

        // Remove the password from the returned user data
        const { password: _, ...rest } = updatedUser._doc;
        res.status(200).json({ success: true, message: 'Successfully updated', data: rest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Creating function for getting a single user
export const getSingleUser = async (req, res) => {
    const id = req.UserId;
    // Check if user exists
    const user = await userModel.findById(id);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found! Please Login Again' });
    }
    try {
        // Finding user by id and getting user data without password
        const singleUser = await userModel.findById(id).select("-password");

        res.status(200).json({ success: true, message: "User Found", data: singleUser });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error });
    }
};

// Creating function for getting all users
export const getAllUser = async (req, res) => {
    try {
        // Finding users and getting their data without passwords
        const allUser = await userModel.find({}).select("-password");
        res.status(200).json({ success: true, message: "Users Found", data: allUser });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error });
    }
};

// Creating function for deleting a user
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        // Finding user by id and deleting
        const deleteUser = await userModel.findByIdAndDelete(id);

        if (!deleteUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: "Successfully Deleted User" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error });
    }
};

// Creating function for toggling user roles
export const toggleUser = async (req, res) => {
    const id = req.params.id;
    try {
        // Finding user by id
        const user = await userModel.findById(id);

        if (user.role === "admin") {
            await userModel.findByIdAndUpdate(id, { role: "user" });
        } else {
            await userModel.findByIdAndUpdate(id, { role: "admin" });
        }
        res.status(200).json({ success: true, message: "Role Changed Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error });
    }
};
