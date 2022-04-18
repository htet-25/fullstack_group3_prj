const Appointment = require("../models/Appointment");
const User = require("../models/User");
const { stringify } = require("querystring");
const alert = require("alert");

module.exports = (req, res) => {
  const mongoDate = req.body.AppDate.toString() + "T00:00:00.000+00:00";

  Appointment.find({ ADate: mongoDate }, (_error, slots) => {
    if (!_error && slots) {
      let id;
      let flag;
      slots.forEach((slot) => {
        if (slot.time == req.body.timeSlot) {
          id = slot._id;
        }
      });

      if (id) {
        Appointment.updateOne(
          { _id: id },
          { isAvailable: false },
          (_err, docs) => {
            if (!_err && docs.modifiedCount == 1) {
              User.updateOne(
                { userId: req.session.Id },
                { myAppointment: id, testType: req.body.testType },
                (_err, docs) => {
                  if (docs.modifiedCount == 1) {
                    res.redirect("/success");
                  } else {
                    Appointment.updateOne({ _id: id }, { isAvailable: true });
                  }
                }
              );
            }
          }
        );
      }
    } else {
      alert("There Are No Slots On Date Try Another Date.");
      if (req.body.testType == "G") {
        res.redirect("/G_page");
      } else {
        res.redirect("/G2_page");
      }
    }
  });
};
