import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../modal/userModel.js";

// creating jwt token through user id
const createjwt = (id) => {
  return jwt.sign({ id }, process.env.SECRET_TOKEN);
};

// User login function
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // checking if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User doesn't exist" });
    }

    // compare passwords to login
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // creating token for user
    const token = createjwt(user._id);
    return res.status(200).json({ success: true, token, message: "Login successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Register user function
const registerUser = async (req, res) => {
  try {
    const {name, email, password, photo } = req.body;

    // Check if email already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    // check password length
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Please enter a strong password (minimum 8 characters)" });
    }

    // save default image
    const photoURL = "https://res.cloudinary.com/dbg64eker/image/upload/v1727327044/profile_xpm84y.webp";

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashingPassword = await bcrypt.hash(password, salt);

    // creating user
    const newUser = new userModel({
      name,
      email,
      password: hashingPassword,
      photo: photoURL,
    });

    // saving user and creating jwt token
    const user = await newUser.save();
    const token = createjwt(user._id);

    res.status(201).json({
      success: true,
      token,
      message: "Logged in Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




export { loginUser, registerUser};
