const express = require('express');
const { addItem, getAllItems, getItemByCategory, updateItem, deleteItem } = require('../controllers/item.controller');
const router = express.Router();
const upload = require('../middlewares/multer.middleware');
const allowCors = require('../middlewares/cors.middleware');

router.post('/', allowCors, upload.array("images"), addItem);
router.get('/', allowCors, getAllItems);
router.get('/:category', allowCors, getItemByCategory);
router.put('/:itemId', allowCors, upload.array("images"), updateItem);
router.delete('/:itemId', allowCors, deleteItem);

module.exports = router;