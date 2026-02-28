const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  findUserByEmail,
  findUserById,
  createUser,
  updatePasswordByEmail,
} = require('../models/models');

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN;

const register = async (req, res) => {
  try {
    if (!JWT_SECRET || !TOKEN_EXPIRES_IN) {
      const body = { error: 'Server misconfigured: JWT_SECRET or TOKEN_EXPIRES_IN missing in .env' };
      return res.status(500).json(body);
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    if (!email || !password) {
      const body = { error: 'Email and password required' };
      return res.status(400).json(body);
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      const body = { error: 'Email already registered' };
      return res.status(409).json(body);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser(email, passwordHash, name || null);

    const tokenPayload = {
      userId: user.id,
      email: user.email,
    };
    const tokenOptions = { expiresIn: TOKEN_EXPIRES_IN };
    const token = jwt.sign(tokenPayload, JWT_SECRET, tokenOptions);

    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    const responseBody = {
      message: 'Registered',
      user: userResponse,
      token,
    };
    return res.status(201).json(responseBody);
  } catch (err) {
    console.error(err);
    const message = err && typeof err.message === 'string' ? err.message : 'Registration failed';
    const body = { error: 'Registration failed', detail: message };
    return res.status(500).json(body);
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      const body = { error: 'Email and password required' };
      return res.status(400).json(body);
    }

    const user = await findUserByEmail(email);
    if (!user) {
      const body = { error: 'Invalid email or password' };
      return res.status(401).json(body);
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const body = { error: 'Invalid email or password' };
      return res.status(401).json(body);
    }

    const tokenPayload = {
      userId: user.id,
      email: user.email,
    };
    const tokenOptions = { expiresIn: TOKEN_EXPIRES_IN };
    const token = jwt.sign(tokenPayload, JWT_SECRET, tokenOptions);

    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    const responseBody = {
      message: 'Logged in',
      user: userResponse,
      token,
    };
    return res.json(responseBody);
  } catch (err) {
    console.error(err);
    const body = { error: 'Login failed' };
    return res.status(500).json(body);
  }
};

const me = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await findUserById(userId);

    if (!user) {
      const body = { error: 'User not found' };
      return res.status(404).json(body);
    }

    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    const responseBody = { user: userResponse };
    return res.json(responseBody);
  } catch (err) {
    console.error(err);
    const body = { error: 'Failed to get user' };
    return res.status(500).json(body);
  }
};

const resetPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const newPassword = req.body.newPassword;

    if (!email || !newPassword) {
      const body = { error: 'Email and new password required' };
      return res.status(400).json(body);
    }

    if (String(newPassword).length < 6) {
      const body = { error: 'Password must be at least 6 characters' };
      return res.status(400).json(body);
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    const updated = await updatePasswordByEmail(email.trim(), passwordHash);

    const responseBody = { message: 'Password reset successfully' };
    return res.status(200).json(responseBody);
  } catch (err) {
    console.error(err);
    const body = { error: 'Password reset failed' };
    return res.status(500).json(body);
  }
};

module.exports = {
  register,
  login,
  me,
  resetPassword,
};
