const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    email: String,
    name: String,
    guests: Number,
    date: Date,
    time: String,
});

module.exports = mongoose.model('Appointment', appointmentSchema);