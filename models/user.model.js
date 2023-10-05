import User from './user.model.js';

export async function getUserByEmail(email) {
  return User.findOne({ email });
}

export async function createUser(user) {
  return User.create(user);
}

export async function getUserById(id) {
  return User.findById(id);
}

export async function updateUserById(id, update) {}

export async function deleteUserById(id) {}

export async function getAllUsers() {}

export async function getUserByGoogleId(googleId) {}
