const pool = require('../config/db');

const findUserByEmail = async (email) => {
  const { rows } = await pool.query(
    'SELECT id, email, password, name, "firstName", "lastName", "createdAt", "updatedAt" FROM users WHERE email = $1',
    [email]
  );
  return rows[0] || null;
};

const findUserById = async (id) => {
  const { rows } = await pool.query(
    'SELECT id, email, name, "firstName", "lastName" FROM users WHERE id = $1',
    [id]
  );
  return rows[0] || null;
};

const createUser = async (email, passwordHash, name) => {
  const parts = (name || '').trim().split(/\s+/);
  const firstName = parts[0] || null;
  const lastName = parts.slice(1).join(' ') || null;
  const { rows } = await pool.query(
    'INSERT INTO users (email, password, name, "firstName", "lastName", role, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING id, email, name, "firstName", "lastName"',
    [email, passwordHash, name || null, firstName, lastName, 'user']
  );
  return rows[0];
};

const updatePasswordByEmail = async (email, passwordHash) => {
  const { rowCount } = await pool.query(
    'UPDATE users SET password = $1, "updatedAt" = NOW() WHERE email = $2',
    [passwordHash, email]
  );
  return rowCount > 0;
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  updatePasswordByEmail,
};
