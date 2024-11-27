const Appointment = require('../models/appointment.model');

const bookAppointment = async (req, res) => {
    try {
        const existingAppointment = await Appointment.countDocuments({
            date: req.body.date,
            time: req.body.time,
        });

        const maxAppointments = 5;

        if (existingAppointment >= maxAppointments) {
            return res.status(409).json({ msg: "Time slot not available" });
        }

        const newAppointment = new Appointment(req.body);
        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch (error) {
        res.json(error);
    }
};

const viewAppointment = async (req, res) => {
    try {
        const bookedUser = await Appointment.findOne({ name: req.params.name });

        if (bookedUser) {
            return res.json(bookedUser);
        }

        return res.status(404).json({ msg: "No appointment found" });
    } catch (error) {
        res.json(error);
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const deletedAppointment = await Appointment.findOneAndDelete({ name: req.params.name });

        if (deletedAppointment) {
            return res.json({ msg: "Appointment deleted" });
        }

        return res.status(404).json({ msg: "No appointment found" });
    } catch (error) {
        res.json(error);
    }
};

module.exports = { bookAppointment, viewAppointment, deleteAppointment };