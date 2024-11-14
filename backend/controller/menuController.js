import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import menuModel from "../modal/menuModel.js";  // Assuming 'menuModel.js' is your model file

// Initialize Firebase Storage
const storage = getStorage();

// Function to add a menu item
export const addMenu = async (req, res) => {
    try {
        const { name, recipe, price, category } = req.body;
        const photo = req.file;

        if (!photo) {
            return res.status(400).json({ success: false, message: 'No photo provided' });
        }

        let uploadResult;
        try {
            // Create a reference to Firebase Storage
            const storageRef = ref(storage, `menuPhotos/${Date.now()}_${photo.originalname}`);
            // Upload file to Firebase Storage
            const snapshot = await uploadBytes(storageRef, photo.buffer);
            // Get download URL of uploaded image
            uploadResult = await getDownloadURL(snapshot.ref);
        } catch (uploadError) {
            return res.status(500).json({ success: false, message: 'Failed to upload photo', error: uploadError.message });
        }

        const menuDetail = {
            name,
            recipe,
            price: Number(price),
            category,
            photo: uploadResult,
            date: Date.now(),
        };

        const menu = new menuModel(menuDetail);
        await menu.save();

        res.json({ success: true, message: "Menu added successfully" });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};

// Function to list menus
export const listmenu = async (req, res) => {
    const { query } = req.query;
    try {
        const menus = query
            ? await menuModel.find({
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { category: { $regex: query, $options: "i" } },
                ],
            })
            : await menuModel.find({});
        res.json({ success: true, menus });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};

// Function to remove menu item
export const removemenu = async (req, res) => {
    const id = req.params.id;

    try {
        const menu = await menuModel.findById(id);
        if (!menu) return res.status(404).json({ success: false, message: 'Menu Item Not Found' });

        // Delete the photo from Firebase Storage
        const storageRef = ref(storage, menu.photo.split('/').pop());
        await deleteObject(storageRef);

        await menuModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Menu removed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};

// Function to get a single menu item
export const singlemenu = async (req, res) => {
    try {
        const { menuId } = req.body;
        const menu = await menuModel.findById(menuId);
        res.json({ success: true, menu });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};

// Function to update menu item
export const updateMenu = async (req, res) => {
    const id = req.params.id;

    try {
        const { name, recipe, price, category } = req.body;
        let uploadResult = null;
        
        const menu = await menuModel.findById(id);
        if (!menu) return res.status(404).json({ success: false, message: 'Menu Item Not Found' });

        if (req.file) {
            const photo = req.file;
            try {
                // Delete old photo from Firebase Storage
                const storageRef = ref(storage, menu.photo.split('/').pop());
                await deleteObject(storageRef);

                // Upload new photo to Firebase Storage
                const newStorageRef = ref(storage, `menuPhotos/${Date.now()}_${photo.originalname}`);
                const snapshot = await uploadBytes(newStorageRef, photo.buffer);
                uploadResult = await getDownloadURL(snapshot.ref);
            } catch (uploadError) {
                return res.status(500).json({ success: false, message: 'Error updating photo', error: uploadError.message });
            }
        }

        const menuData = {
            name,
            recipe,
            price: Number(price),
            category,
            photo: uploadResult ? uploadResult : menu.photo,
        };

        const updatedMenu = await menuModel.findByIdAndUpdate(id, { $set: menuData }, { new: true });
        if (!updatedMenu) return res.status(404).json({ success: false, message: 'Menu item not found after update' });

        res.status(200).json({ success: true, message: 'Successfully updated', data: updatedMenu });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};
