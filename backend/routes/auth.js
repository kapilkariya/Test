import User from "../models/user.js";
import express from 'express';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, name, password } = req.body;
    
    // Validate input
    if (!email || !name || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Check if user exists with timeout
    const existinguser = await User.findOne({ email }).maxTimeMS(10000); // 10 sec timeout
    
    if (existinguser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(password, salt);
    
    // Create and save user
    const user = new User({ email, name, password: hashpass });
    await user.save();
    
    return res.status(201).json({ 
      message: "Registration successful",
      success: true 
    });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ 
      message: error.message, 
      error: error.message 
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Find user with timeout
    const user = await User.findOne({ email }).maxTimeMS(10000);
    
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const ismatch = await bcrypt.compare(password, user.password);
    
    if (!ismatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      success: true,
      token: token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ 
      message: error.message, 
      error: error.message 
    });
  }
});

router.delete('/del', async (req, res) => {
  try {
    await User.deleteOne({ email: req.body.email });
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ message: "Delete failed" });
  }
});

export default router;