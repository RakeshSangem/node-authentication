import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRouter from './routes/user.routes.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { Strategy } from 'passport-google-oauth20';
import User from './models/user.mongo.js';
import expressSession from 'express-session';
// import { isAuthenticated } from './middleware/auth.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: 'asfkjsd;lkfj',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());

const AUTH_OPTIONS = {
  callbackURL: '/auth/google/callback',
  clientID: process.env.GOOGLE_CLIENT_ID, // set client id from google console
  clientSecret: process.env.GOOGLE_SECRET_ID, // set client secret from google console
  scope: ['email', 'profile'],
};
// passport middleware setup (must be after expressSession)
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, next) => {
  next(null, user.id);
});

passport.deserializeUser(async (id, next) => {
  try {
    next(null, id);
  } catch (error) {
    next(new Error('Error while deserializing the user with id: ' + id));
  }
});

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log('Google profile', profile);
  done(null, profile);
}

passport.use(
  new Strategy(
    AUTH_OPTIONS,
    async (accessToken, refreshToken, profile, next) => {
      try {
        const user = await User.findOne({ email: profile._json.email });
        if (user) {
          next(null, user);
        } else {
          const newUser = await User.create({
            email: profile._json.email,
            password: profile._json.sub,
            username: profile._json.email?.split('@')[0],
            isEmailVerified: true,
            role: 'USER',
            loginType: 'GOOGLE',
            avatar: {
              url: profile._json.picture,
              localPath: '',
            },
          });
          next(null, newUser);
        }
      } catch (error) {
        next(error);
      }
    }
  )
);

// API routes
app.get('/', (req, res) => {
  res.send('Homepage');
});

app.get('/dashboard', (req, res) => {
  res.send('Dashboard');
});

app.use('/', userRouter);

export default app;
