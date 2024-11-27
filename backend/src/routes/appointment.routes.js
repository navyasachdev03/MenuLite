const express = require('express');
const { bookAppointment, viewAppointment, deleteAppointment } = require('../controllers/appointment.controller');
const router = express.Router();
const allowCors = require('../middlewares/cors.middleware');

router.post('/book', allowCors, bookAppointment);
router.get('/view/:name', allowCors, viewAppointment);
router.delete('/delete/:name', allowCors, deleteAppointment);

module.exports = router;