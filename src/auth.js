// src/auth.js
import db from './data/db.json';
import bcrypt from 'bcryptjs';

export function authenticateAdmin(username, password) {
  // Replace with real admin check
  return username === 'admin' && password === 'admin123';
}

export function authenticateContestant(username, password) {
  const user = db.users.find(u => u.username === username);
  if (!user) return false;
  return bcrypt.compareSync(password, user.password);
}