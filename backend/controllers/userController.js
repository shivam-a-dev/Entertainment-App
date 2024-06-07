import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import createToken from "../token/createToken.js";
import bcrypt from "bcryptjs";

export const registerUser = expressAsyncHandler(async (req, res) => {
    try {
        const { password, username, email } = req.body;

        if (!password || !username || !email) {
            return res.status(400).json({ message: "Please add all fields" });
        }

        // Check if the user already exists
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return res.status(400).json({ message: "Username already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            password: hashedPassword,
            username,
            email
        });

        const token = createToken(res, user);
        res.json({
          email: user.email,
          username: user.username,
          id: user._id,
          isAdmin: user.isAdmin,
          token: token,
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export const login = expressAsyncHandler(async (req, res)=> {
    const {email, password} = req.body;

    const userExists = await User.findOne({email});
     if (userExists) {
        const isPasswordCorrect = await bcrypt.compare(password, userExists.password);
        if (isPasswordCorrect) {
            createToken(res, userExists);
            res.status(200).json({email: userExists.email, username: userExists.username, id: userExists._id, isAdmin: userExists.isAdmin});   
        }
        else {
            res.status(400).json({message: "Invalid credentials"});
            return;
        }
     } else {
        res.status(400).json({message: "Invalid credentials"})
     }

})