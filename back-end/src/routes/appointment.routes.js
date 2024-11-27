const express = require('express');
const { bookAppointment, viewAppointment, deleteAppointment } = require('../controllers/appointment.controller');
const router = express.Router();

router.post('/book', bookAppointment);
router.get('/view/:name', viewAppointment);
router.delete('/delete/:name', deleteAppointment);

module.exports = router;