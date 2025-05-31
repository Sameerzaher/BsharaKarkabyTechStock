const express = require('express');
const router = express.Router();
const { getSuppliers, addSupplier, deleteSupplier } = require('../controllers/suppliercontroller');

router.get('/', getSuppliers);
router.post('/', addSupplier);
router.delete('/:id', deleteSupplier);

module.exports = router;