import mongoose from 'mongoose';
import userModel from '../modal/userModel.js';


export const addToFavorite = async (req, res) => {
  const userId = req.UserId; // Assuming UserId is available in the request
  const { foodId } = req.body;

  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(foodId)) {
    return res.status(400).json({ success: false, message: 'Invalid ID format' });
  }

  try {
    // Check if user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found! Please Login Again' });
    }

    // Check if foodId is already in the favoriteData array
    if (user.favoriteData.some((item) => item.equals(foodId))) {
      return res.status(400).json({ success: false, message: 'Item already in favorites' });
    }

    // Add the foodId to the favoriteData array
    user.favoriteData.push(foodId);
    await user.save();

    res.json({ success: true, message: 'Added to favorites', favoriteData: user.favoriteData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteToFavorite = async (req, res) => {
  const userId = req.UserId; // Assuming UserId is available in the request
  const { foodId } = req.body;

  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(foodId)) {
    return res.status(400).json({ success: false, message: 'Invalid ID format' });
  }

  try {
    // Check if user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found! Please Login Again' });
    }

    // Check if foodId is already in the favoriteData array
    if (!user.favoriteData.some((item) => item.equals(foodId))) {
      return res.status(400).json({ success: false, message: "Item doesn't exists  in favorites" });
    }

    // Add the foodId to the favoriteData array
    user.favoriteData.pull(foodId);
    await user.save();

    res.json({ success: true, message: 'Removed from favorites', favoriteData: user.favoriteData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const listFavorite = async (req, res) => {
  const userId = req.UserId; // Assuming UserId is available in the request

  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(userId) ) {
    return res.status(400).json({ success: false, message: 'Invalid ID format' });
  }

  try {
    // Check if user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found! Please Login Again' });
    }

    res.json({ success: true, favoriteData: user.favoriteData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

