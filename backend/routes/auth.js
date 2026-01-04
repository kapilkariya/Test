import User from "../models/user.js";
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const router = express.Router();


// signin

router.post('/register', async (req, res) => {
  console.log('tese1')
  try {
    console.log('tese2')
    const salt = await bcrypt.genSalt(10);
    const { email, name, password } = req.body;
    const hashpass = await bcrypt.hash(password, salt);
    const existinguser = await User.findOne({ email })
    if (existinguser) {
      return res.status(400).json({ message: "already exists" });
    }
    const user = new User({ email, name, password: hashpass });
    await user.save().then(() => {
      return res.status(200).json({ message: "data saved" });
    })
  } catch (error) {
    console.log(error)
  }
})


//login

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const ismatch = await bcrypt.compare(req.body.password, user.password)
      if (!ismatch) {
        return res.status(200).json({ message: "password incorrect" })
      }
      const token = jwt.sign(
        { id: user._id },
        process.env.SECRET,
        { expiresIn: "1d" }
      )
      return res.status(200).json({
        message: "logged in successfully",
        token: token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        }
      });
    }

  } catch (error) {
    console.log(error)
    res.status(200).json({ message: "no user" })
  }
})

router.delete('/del', async (req, res) => {
  try {
    const user = await User.deleteOne({ email: req.body.email });
    return res.status(200).json({ message: "user deleted" })
  } catch (error) {
    console.log(error)
  }
})

export default router;