const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  findUserByEmail,
  findUserById,
  createUser,
  updatePasswordByEmail,
  findCollegeStudentByRegNo,
} = require('../models/models');

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN;

const register = async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      isBullayyaStudent,
      registrationNumber,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await findUserByEmail(normalizedEmail);
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    let finalName = name || null;
    let department = null;
    let year = null;

    if (isBullayyaStudent === true) {
      if (!registrationNumber) {
        return res.status(400).json({ error: 'Registration number required' });
      }

      const student = await findCollegeStudentByRegNo(registrationNumber);
      if (!student) {
        return res.status(404).json({ error: 'Invalid registration number' });
      }

      finalName = student.student_name;
      department = student.department;
      year = student.year;
    }

    if (String(password).length < 6) {
      return res.status(400).json({ error: 'Password too short' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await createUser({
      email: normalizedEmail,
      passwordHash,
      name: finalName,
      isBullayyaStudent,
      registrationNumber,
      department,
      year,
    });

    const token = jwt.sign(
      { sub: user.id },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRES_IN }
    );

    res.status(201).json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email.toLowerCase());
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { sub: user.id },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRES_IN }
    );

    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};

const me = async (req, res) => {
  const user = await findUserById(req.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ user });
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const hash = await bcrypt.hash(newPassword, 10);
  const updated = await updatePasswordByEmail(email, hash);
  if (!updated) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ message: 'Password updated' });
};

const checkCollegeRegistration = async (req, res) => {
  const { registrationNumber } = req.params;
  const student = await findCollegeStudentByRegNo(registrationNumber);
  if (!student) {
    return res.status(404).json({ error: 'Registration not found' });
  }
  res.json({ exists: true, student });
};

module.exports = {
  register,
  login,
  me,
  resetPassword,
  checkCollegeRegistration,
};