const express = require('express');
const router = express.Router();
const { getCategories, addCategory, deleteCategory } = require('../controllers/categorycontroller');

router.get('/', getCategories);
router.post('/', addCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
