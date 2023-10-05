import { Router } from 'express';
import passport from 'passport';
import {
  handleGoogleLogin,
  logOutUser,
} from '../controllers/user.contoller.js';
// import { isAuthenticated } from '../middleware/auth.middleware.js';

const userRouter = Router();

// userRouter.post('/login', loginUser);

// auth with google
userRouter.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    successRedirect: '/',
  }),
  (_, res) => {
    res.send('redirecting to google...');
  }
);

// callback route for google to redirect to
userRouter.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  handleGoogleLogin
);

userRouter.get('/dashboard', (req, res) => {
  res.send('Dashboard');
});
userRouter.get('/logout', logOutUser);

export default userRouter;
