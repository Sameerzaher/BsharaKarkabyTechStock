const db = require('../models/db');

exports.getSuppliers = (req, res) => {
  db.query('SELECT * FROM Suppliers', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.addSupplier = (req, res) => {
  const { name, email, phone } = req.body;
  db.query('INSERT INTO Suppliers (name, email, phone) VALUES (?, ?, ?)', [name, email, phone], (err, result) => {
    if (err) return res.status(400).json({ error: err });
    res.json({ message: 'Supplier added', id: result.insertId });
  });
};

exports.deleteSupplier = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Suppliers WHERE id = ?', [id], (err) => {
    if (err) return res.status(400).json({ error: err });
    res.json({ message: 'Supplier deleted' });
  });
};
