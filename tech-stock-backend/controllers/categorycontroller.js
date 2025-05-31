const db = require('../models/db');

exports.getCategories = (req, res) => {
  db.query('SELECT * FROM Category', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.addCategory = (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO Category (name) VALUES (?)', [name], (err, result) => {
    if (err) return res.status(400).json({ error: err });
    res.json({ message: 'Category added', id: result.insertId });
  });
};

exports.deleteCategory = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Category WHERE id = ?', [id], (err) => {
    if (err) return res.status(400).json({ error: err });
    res.json({ message: 'Category deleted' });
  });
};
