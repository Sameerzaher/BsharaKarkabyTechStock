const db = require('../models/db');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { email, name, phone, city, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = 'INSERT INTO Users (email, name, phone, city, password) VALUES (?, ?, ?, ?, ?)';

  db.query(sql, [email, name, phone, city, hashedPassword], (err, result) => {
    if (err) {
      return res.status(400).json({ message: 'Registration failed', error: err });
    }
    res.json({ message: 'User registered successfully' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM Users WHERE email = ?';

  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }
    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
  });
};
