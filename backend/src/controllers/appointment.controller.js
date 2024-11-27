const Appointment = require('../models/appointment.model');

const bookAppointment = async (req, res) => {
    try {
        const existingAppointment = await Appointment.countDocuments({
            date: req.body.date,
            time: req.body.time,
        });

        const maxAppointments = 5;

        if (existingAppointment >= maxAppointments) {
            return res.status(409).json({ statusCode:409, msg: "Time slot not available" });
        }

        const newAppointment = new Appointment(req.body);
        const savedAppointment = await newAppointment.save();
        res.status(201).json({statusCode: 201, appointment: savedAppointment, msg: 'Appointment booked successfully'});
    } catch (error) {
        res.json(error);
    }
};

const viewAppointment = async (req, res) => {
    try {
        const bookedUser = await Appointment.findOne({ email: req.params.email });

        if (bookedUser) {
            return res.status(200).json({statusCode: 200, bookedAppointment: bookedUser});
        }

        return res.status(404).json({ msg: "No appointment found" });
    } catch (error) {
        res.json(error);
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const deletedAppointment = await Appointment.findOneAndDelete({ email: req.params.email });

        if (deletedAppointment) {
            return res.status(200).json({ statusCode: 200, msg: "Appointment deleted" });
        }

        return res.status(404).json({ msg: "No appointment found" });
    } catch (error) {
        res.json(error);
    }
};

module.exports = { bookAppointment, viewAppointment, deleteAppointment };