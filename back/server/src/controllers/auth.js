const db = require('../db');
const { hash } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { SECRET } = require('../constants');

const columnNames = [
  'full_name',
  'email',
  'phone',
  'client_type',
  'country',
  'city',
  'password',
  'created_at',
];

exports.getUsers = async (req, res) => {
  console.log("Hello, world!");
  try {
    const { rows } = await db.query('SELECT user_id, email FROM users');

    return res.status(200).json({
      success: true,
      users: rows,
    });
  } catch (error) {
    console.log(error.message);
  }
}

exports.register = async (req, res) => {
  console.log('Register function is called.');
  const { full_name, email, phone, client_type, country, city, password } = req.body;

  console.log(email);
  console.log(password);
  try {
    const hashedPassword = await hash(password, 10);

    const values = [full_name, email, phone, client_type, country, city, hashedPassword];
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
    const query = `INSERT INTO users (${columnNames.join(', ')}) VALUES (${placeholders}, current_date)`;

    await db.query(query, values);

    return res.status(201).json({
      success: true,
      message: 'The registration was successful',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
}

exports.login = async (req, res) => {
  console.log('login is called');
  let user = req.user

  let payload = {
    id: user.user_id,
    email: user.email,
  }

  try {
    const token = await sign(payload, SECRET)

    return res.status(200).cookie('token', token, { httpOnly: true }).json({
      success: true,
      message: 'Logged in successfully',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.protected = async (req, res) => {
  try {
    return res.status(200).json({
      info: 'protected info',
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie('token', { httpOnly: true }).json({
      success: true,
      message: 'Logged out successfully',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}
