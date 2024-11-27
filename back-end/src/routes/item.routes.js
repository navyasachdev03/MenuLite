const express = require('express');
const { addItem, getAllItems, getItemByCategory, updateItem, deleteItem } = require('../controllers/item.controller');
const router = express.Router();
const upload = require('../middlewares/multer.middleware');

router.post('/', upload.array("images"), addItem);
router.get('/', getAllItems);
router.get('/:category', getItemByCategory);
router.put('/:itemId', upload.array("images"), updateItem);
router.delete('/:itemId', deleteItem);

module.exports = router;