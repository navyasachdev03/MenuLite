const express = require('express');
const { register, login, logout } = require('../controllers/user.controller');
const allowCors = require('../middlewares/cors.middleware');
const router = express.Router();

router.post('/register', allowCors, register);
router.post('/login', allowCors, login);
router.post('/logout', allowCors, logout);

module.exports = router;