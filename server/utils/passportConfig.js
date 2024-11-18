const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");
require("dotenv").config();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // console.log("Profile data: ",profile);
        // let user = await OAuthUser.findOne({ githubId: profile.id });
        console.log(profile);
        let user = await User.findOne({ email: profile.emails[0].value });
        // console.log("User data: ",user);
        if (!user) {
          user = await User.create({
            githubId: profile.id,
            username: profile.username,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            // Handle email if needed
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  if (!user) {
    return done(new Error("User is not defined"));
  }
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(new Error("User not found"));
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
