const Appointment = require("../models/Appointment");

module.exports = (req, res) => {
    Appointment.create(
        {
          ADate: req.body.ADate,
          time: req.body.timeSlot,
          isAvailable: true
        },
        (error) => {
        if (error) {
          return res.redirect("/Dashboard");
        }
        res.redirect("/Appointment");
      }
      );
};
