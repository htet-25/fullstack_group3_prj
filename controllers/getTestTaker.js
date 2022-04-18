
const User = require("../models/User");
//const Appointment = require("../models/Appointment");

module.exports = (req, res) => {
  
  User.findOne({userId: req.params.userId })
    .populate("myAppointment")
    .exec((_err, user) => {
      
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

       res.render("TakeTest",{
        
            userId: user.userId,
            fName: user.fName,
            lName: user.lName,
            DOB: user.DOB.toISOString().slice(0, 10),
            address: user.address,
            carDetails: user.carDetails,
            license: user.license,
            image1: user.image1,
            image2: user.image2,
            licenseType: user.licenseType, 
            testType: user.testType,
            date: user.myAppointment.ADate.toISOString().slice(0, 10),
            time: `${user.myAppointment.time} ${AmPm}`,
       });

      });
      
    
};
