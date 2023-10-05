// import User from '../models/user.mongo.js';
import jwt from 'jsonwebtoken';

export async function handleGoogleLogin(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = req.user;

    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('token', token, { httpOnly: true, secure: true });

    return res.status(200).json({
      message: 'Login successful',
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function logOutUser(req, res) {
  try {
    req.logout();
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
