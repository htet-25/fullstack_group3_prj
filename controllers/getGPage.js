const User = require("../models/User");
const Appointment = require("../models/Appointment");
const alert = require("alert");

module.exports = (req, res) => {
  User.findOne({ userId: req.session.Id })
    .populate("myAppointment")
    .exec(function (err, user) {
      console.log(user);
      if (err) return console.log(err);
      if(user && user.licenseType == "G"){
        res.render("G_page", {
          message: "You have a G Licence",
          hasAppointment : false,
          gotDate: null,
          slots: []
        });
      }else if (user && user.myAppointment && user.testType == "G") {
        let AmPm;
        if (
          user.myAppointment.time == "12:00" ||
          user.myAppointment.time == "01:00" ||
          user.myAppointment.time == "12:30" ||
          user.myAppointment.time == "01:30"
        ) {
          AmPm = "PM";
        } else {
          AmPm = "AM";
        }
        res.render("G_page", {
          message: "Your Appointment",
          hasAppointment: {
            date: user.myAppointment.ADate.toISOString().slice(0, 10),
            time: `${user.myAppointment.time} ${AmPm}`,
          },
          gotDate: null,
          slots: [],
        });
      } else if (user && user.licenseType == "G1"){
            alert("You do not have a G2 licence going to G2 page.");
            res.redirect("/G2_page");
      }else if (user && user.licenseType == "G2"){
        res.render("G_page", {
          message: "you have a profile book an appointment",
          hasAppointment : false,
          gotDate: null,
          slots: []
        });
      } else {
        res.redirect("/Profile");
      }
    });

  // res.render("G2_page" , { message: "" });
};
