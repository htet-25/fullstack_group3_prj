const Appointment = require("../models/Appointment");
const alert = require("alert");

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
        else{
          alert("Appointment Created.");
          res.redirect("/Appointment");
        }
        
      }
      );
};
