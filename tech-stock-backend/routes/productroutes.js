const express = require('express');
const router = express.Router();
const { getAll, create, update, remove } = require('../controllers/productcontroller');
const upload = require('../middleware/upload');

router.get('/', getAll);
router.post('/', upload.single('image'), create);
router.put('/:id', upload.single('image'), update);
router.delete('/:id', remove);

module.exports = router;
