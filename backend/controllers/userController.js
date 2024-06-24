import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import createToken from "../token/createToken.js";
import bcrypt from "bcryptjs";
import sharp from 'sharp'

export const registerUser = expressAsyncHandler(async (req, res) => {
  try {
    const { password, email } = req.body;

    if (!password || !email) {
      return res.status(400).json({ message: "Please add all fields" });
    }

    // Check if the user already exists
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const username = email.split("@")[0];

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      password: hashedPassword,
      username,
      email,
    });

    const token = createToken(res, user);
    res.json({
      email: user.email,
      username: user.username,
      id: user._id,
      isAdmin: user.isAdmin,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExists.password
    );
    if (isPasswordCorrect) {
      createToken(res, userExists);
      let profilePic = "";
        if (userExists.profilePic) {
           profilePic = userExists.profilePic.toString('base64');
        }
      res.status(200).json({
        email: userExists.email,
        username: userExists.username,
        id: userExists._id,
        isAdmin: userExists.isAdmin,
         profilePic
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});

export const logOut = expressAsyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

export const uploadProfilePic = expressAsyncHandler(async (req, res) => {
  const user = await req.user;
  if (user) {
    try {
      const resizedImage = await sharp(req.file.buffer).resize({height: 300, width: 300}).toBuffer();
      user.profilePic = resizedImage;
      const updatedUser = await user.save();
      let profilePic = updatedUser.profilePic.toString('base64');
      res.status(200).json({profilePic});
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

export const getProfilePic = expressAsyncHandler(async (req, res) => {
    try {
        const user = await req.user;
        

        if (!user || !user.profilePic) {
            return res.status(404).json({ message: "Profile picture not found" });
        }

        // Convert binary buffer to base64
        const base64Image = user.profilePic.toString('base64');

        res.status(200).json({ profilePic: base64Image });
    } catch (err) {
        res.status(500).json(err);
        
    }
})