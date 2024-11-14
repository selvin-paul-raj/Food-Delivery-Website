import mongoose from "mongoose";
import userModel from "../modal/userModel.js";

// Function to add an item to the cart
export const addToCart = async (req, res) => {
    const id = req.UserId;
    
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid user ID format' });
    }

    // Check if user exists
    const user = await userModel.findById(id);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found! Please Login Again' });
    }

    try {
        const { itemId } = req.body;

        let cartData = user.cartData || {}; 

       
        if (cartData[itemId]) {
            cartData[itemId] += 1; 
        } else {
            cartData[itemId] = 1; 
        }

        // Update user's cart in the database
        await userModel.findByIdAndUpdate(id, { cartData }, { new: true });

        // Send successful response with updated cart data
        res.json({ success: true, message: "Added to Cart", cart: cartData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const cartItemList=async(req,res)=>{
    const id=req.UserId
     // Validate the ID format
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid user ID format' });
    }

    // Check if user exists
    const user = await userModel.findById(id);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found! Please Login Again' });
    }
    try {
       
        // Fetch user data
        const userData = await userModel.findById(id);

        // Return cart data
        if (userData && userData.cartData) {
          
            res.json({ success: true, cartData: userData.cartData });
        } else {
            res.json({ success: false, message: "No cart data found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Function to update an item in the cart
export const updateToCart = async (req, res) => {


    const id=req.UserId
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(400).json({ success: false, message: 'Invalid user ID format' });
   }

   // Check if user exists
   const user = await userModel.findById(id);
   if (!user) {
       return res.status(404).json({ success: false, message: 'User not found! Please Login Again' });
   }

    try {
        const { itemId , quantity } = req.body;

        // Fetch user data
        const userData = await userModel.findById(id);
        let cartData = userData.cartData || {};
      
        

        // Check if the item exist in the cart
        if (cartData[itemId]) {
            if (quantity > 0) {
                // Updating item quantity
                cartData[itemId] = quantity;
            } else {
                // Removing item from cart if quantity is zero
                delete cartData[itemId];
            }

            // Update cart in the database
            await userModel.findByIdAndUpdate(id, { cartData });
    
            // Send successful response
            res.json({ success: true, message: "Cart updated successfully" });
        } else {
          // If Product doesn't exist
          res.json({ success: false, message: "Product not found" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Function to delete an item in the cart
export const deleteToCart = async (req, res) => {
    const id=req.UserId
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(400).json({ success: false, message: 'Invalid user ID format' });
   }

   // Check if user exists
   const user = await userModel.findById(id);
   if (!user) {
       return res.status(404).json({ success: false, message: 'User not found! Please Login Again' });
   }

    try {
        const { itemId } = req.body;
       
        let cartData = user.cartData || {};
    
        // Check if the item exist in the cart
        if (cartData[itemId]) {
          
          delete cartData[itemId];

            // Update cart in the database
            await userModel.findByIdAndUpdate(id, { cartData });
    
            // Send successful response
            res.json({ success: true, message: "Cart delete successfully" });
        } else {
            // If Product doesn't exist
            res.json({ success: false, message: "Product not found" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


