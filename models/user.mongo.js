import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  username: String,
  isEmailVerified: Boolean,
  role: String,
  avatar: {
    url: String,
    localPath: String,
  },
  loginType: String,
});

export const UserRolesEnum = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

export const UserLoginType = {
  GOOGLE: 'GOOGLE',
  EMAIL: 'EMAIL',
};

export default mongoose.model('User', userSchema);
