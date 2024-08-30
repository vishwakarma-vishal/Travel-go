const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');

// SAVE TO CLOUDINARY
const uploadImage = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: "Travel Go/Users"
  }

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.secure_url;
  } catch (error) {
    console.error(error);
  }
};

/* USER REGISTER */
const registerUser = async (req, res) => {
  try {
    /* Take all information from the form */
    const { firstName, lastName, email, password } = req.body;

    /* The uploaded file is available as req.file */
    const profileImage = req.files.profileImage;

    if (!profileImage) {
      return res.status(400).send("No file uploaded");
    }

    /* Check if user exists */
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists!"
      });
    }

    /* Hass the password */
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Move the uploaded file to a temporary location
    const tempPath = path.join(__dirname, 'uploads', profileImage.name);
    await profileImage.mv(tempPath);

    const imageUrl = await uploadImage(tempPath);

    // Delete the temporary file
    fs.unlinkSync(tempPath);

    /* Create a new User */
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath: imageUrl
    });

    /* Save the new User */
    await newUser.save();

    /* Send a successful message */
    res.status(200).json({
      message: `User registered successfully!, user: ${newUser}`
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Registration failed!", error: err.message });
  }
};

/* USER LOGIN*/
const loginUser = async (req, res) => {
  try {
    /* Take the infomation from the form */
    const { email, password } = req.body

    /* Check if user exists */
    const isUser = await User.findOne({ email });
    if (!isUser) {
      return res.status(409).json({
        success: false,
        message: "User doesn't exist!"
      });
    }

    /* Compare the password with the hashed password */
    const isMatch = await bcrypt.compare(password, isUser.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials!" })
    }

    /* Generate JWT token */
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const token = jwt.sign({ id: isUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // 1 hour expiry

    const user = isUser.toObject();
    delete user.password;

    res.status(200).json({ token, user })

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
};

module.exports = { registerUser, loginUser }