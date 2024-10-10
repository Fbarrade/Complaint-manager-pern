
const { compare } = require('bcryptjs');
const { check } = require('express-validator');
const db = require('../db');

// password
const password = check('password')
  .isLength({ min: 6, max: 15 })
  .withMessage('Password has to be between 6 and 15 characters.');

// email
const email = check('email')
  .isEmail()
  .withMessage('Please provide a valid email.');

// check if email exists
const emailExists = check('email').custom(async (value) => {
  const { rows } = await db.query('SELECT * from users WHERE email = $1', [value]);

  if (rows.length) {
    throw new Error('Email already exists.');
  }
});

// login validation
const loginFieldsCheck = check('email').custom(async (value, { req }) => {
  const user = await db.query('SELECT * from users WHERE email = $1', [value]);

  console.log('User:', user.rows[0]); // Debug log to see the user retrieved from the database

  if (!user.rows.length) {
    throw new Error('Email does not exist.');
  }

  const validPassword = await compare(req.body.password, user.rows[0].password);

  console.log('Valid Password:', validPassword); // Debug log to see if the password comparison is successful

  if (!validPassword) {
    throw new Error('Wrong password');
  }

  req.user = user.rows[0];
});

const registerValidation = [
  (req, res, next) => {
    console.log('Received Request Body:', req.body); // Debug log to see the request body
    next();
  },
  email,
  password,
  emailExists,
];

module.exports = {
  registerValidation,
  loginValidation: [loginFieldsCheck],
};
