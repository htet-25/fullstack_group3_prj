const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    ADate : Date,
    time : String,
    isAvailable : Boolean
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;
