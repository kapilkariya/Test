import express from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'

const router=express.Router();

//redirect to google login 

router.get('/google',passport.authenticate("google",{scope:["profile","email"]}))

router.get('/google/callback',
  passport.authenticate("google",{session:false}),
  (req,res)=>{
    try {
      const token=jwt.sign({id:req.user._id},process.env.SECRET,{expiresIn:"7d"})
      res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`)
    } catch (error) {
      console.log("google login error",error)
      res.redirect(`${process.env.CLIENT_URL}/login?error=googlefail`)
    }
  }
)

export default router;