import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import passport from 'passport'
import user from '../models/user.js';

passport.use(new GoogleStrategy({
    clientID:     process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `http://localhost:3000/auth/google/callback`,
    passReqToCallback   : true
  },
  async (request, accessToken, refreshToken, profile, done)=> {
    try {
      let usr=await user.findOne({ googleId: profile.id });

      if(!usr){
        usr= await user.create({
          googleId:profile.id,
          name:profile.displayName,
          email:profile.emails[0].value,
          avatar:profile.photos[0].value,
        })
      }
      return done(null,usr);
    } catch (error) {
      return done(error,null);
    }
  }
));