const User = require("../models/User");
//const Appointment = require("../models/Appointment");

module.exports = (_req, res) => {
  const apps = [
    { userId: false, name: false, license: false, date: false, time: false, testType: false },
  ];
  User.find({ myAppointment: { $exists: true } , result: "FAIL" })
    .populate("myAppointment")
    .exec((_err, users) => {
      users.forEach((user) => {
        let AmPm;
        console.log(user);
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

        apps.push({
          userId: user.userId,
          name: `${user.fName} ${user.lName}`,
          license: user.license,
          date: user.myAppointment.ADate.toISOString().slice(0, 10),
          time: `${user.myAppointment.time} ${AmPm}`,
          testType: user.testType
        });
      });
      res.render("FailList", { list: apps });
    });
};
