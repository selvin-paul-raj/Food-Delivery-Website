import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String,  required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: { type: String },
    photo: { type: String },
    gender: { type: String, enum: ["male", "female", "other"] },
    cartData: { type: Object, default: {} },
    favoriteData: [{ type: mongoose.Schema.Types.ObjectId, ref: "menu" }], 
    role: { type: String, enum: ["user", "admin"],default:'user' },
  },
  { timestamps: true, minimize: false }
);

// Populate favoriteData with menu item details whenever querying users
userSchema.pre(/^find/, function (next) {
  this.populate({
    path: "favoriteData",
    select: "name photo price" // Select only the fields you need
  });
  next();
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
