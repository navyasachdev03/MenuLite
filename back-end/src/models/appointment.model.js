const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: String,
    guests: Number,
    date: Date,
    time: String,
});

module.exports = mongoose.model('Appointment', appointmentSchema);