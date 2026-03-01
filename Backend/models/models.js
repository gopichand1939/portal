const pool = require('../config/db');

const findUserByEmail = async (email) => {
  const { rows } = await pool.query(
    `SELECT
       id,
       email,
       password,
       name,
       "firstName",
       "lastName",
       role,
       is_bullayya_student,
       college_registration_number,
       department,
       year
     FROM users
     WHERE email = $1`,
    [email]
  );
  return rows[0] || null;
};

const findUserById = async (id) => {
  const { rows } = await pool.query(
    `SELECT
       id,
       email,
       name,
       "firstName",
       "lastName",
       role,
       is_bullayya_student,
       college_registration_number,
       department,
       year
     FROM users
     WHERE id = $1`,
    [id]
  );
  return rows[0] || null;
};

const createUser = async ({
  email,
  passwordHash,
  name,
  isBullayyaStudent = false,
  registrationNumber = null,
  department = null,
  year = null,
}) => {
  const parts = (name || '').trim().split(/\s+/);
  const firstName = parts[0] || null;
  const lastName = parts.slice(1).join(' ') || null;

  const { rows } = await pool.query(
    `INSERT INTO users (
       email,
       password,
       name,
       "firstName",
       "lastName",
       role,
       is_bullayya_student,
       college_registration_number,
       department,
       year,
       "createdAt",
       "updatedAt"
     )
     VALUES (
       $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,NOW(),NOW()
     )
     RETURNING
       id,
       email,
       name,
       is_bullayya_student,
       college_registration_number,
       department,
       year`,
    [
      email,
      passwordHash,
      name,
      firstName,
      lastName,
      'user',
      isBullayyaStudent,
      registrationNumber,
      department,
      year,
    ]
  );
  return rows[0];
};

const updatePasswordByEmail = async (email, passwordHash) => {
  const { rowCount } = await pool.query(
    `UPDATE users
     SET password = $1, "updatedAt" = NOW()
     WHERE email = $2`,
    [passwordHash, email]
  );
  return rowCount > 0;
};

const findCollegeStudentByRegNo = async (registrationNumber) => {
  const { rows } = await pool.query(
    `SELECT
       registration_number,
       student_name,
       department,
       year
     FROM bullayya_college_students
     WHERE registration_number = $1`,
    [registrationNumber]
  );
  return rows[0] || null;
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  updatePasswordByEmail,
  findCollegeStudentByRegNo,
};