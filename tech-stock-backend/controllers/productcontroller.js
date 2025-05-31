const db = require('../models/db');

exports.getAll = (req, res) => {
  db.query('SELECT * FROM Products', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.create = (req, res) => {
  const { name, description, price, unit_in_stock, supplier_id, category_id, image } = req.body;
  const sql = `INSERT INTO Products (name, description, price, unit_in_stock, supplier_id, category_id, image)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [name, description, price, unit_in_stock, supplier_id, category_id, image], (err, result) => {
    if (err) return res.status(400).json({ error: err });
    res.json({ message: 'Product created', id: result.insertId });
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { name, description, price, unit_in_stock, supplier_id, category_id, image } = req.body;
  const sql = `UPDATE Products SET name=?, description=?, price=?, unit_in_stock=?, supplier_id=?, category_id=?, image=?
               WHERE id=?`;
  db.query(sql, [name, description, price, unit_in_stock, supplier_id, category_id, image, id], (err) => {
    if (err) return res.status(400).json({ error: err });
    res.json({ message: 'Product updated' });
  });
};

exports.remove = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Products WHERE id = ?', [id], (err) => {
    if (err) return res.status(400).json({ error: err });
    res.json({ message: 'Product deleted' });
  });
};