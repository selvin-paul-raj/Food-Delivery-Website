import mongoose from "mongoose";

// Define the schema for the menu items
const menuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, 
    recipe: { type: String, required: true },
    price: { type: Number, required: true },  
    photo: { type: String, required: true },  
    category: { type: String, required: true },
    reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
    averageRating: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }  
);

const menuModel = mongoose.models.menu || mongoose.model("menu", menuSchema);
export default menuModel;
