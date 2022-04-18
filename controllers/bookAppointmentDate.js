const Appointment = require("../models/Appointment");
const alert = require("alert");

module.exports = (req, res) => {
    const mongoDate = req.body.ADate.toString() + "T00:00:00.000+00:00";
    
    Appointment.find({ ADate : mongoDate }, (_error, slots) => {
        if (slots) {
            let slots2 = [];
            slots.forEach(slot => {
                if(slot.isAvailable){
                    slots2.push(slot.time);
                }
                
            });
            if (slots2.length == 0){
                alert("There Are No Slots On Date Try Another Date.");
                if (req.body.testType == "G") {
                    res.redirect("/G_page");
                  } else {
                    res.redirect("/G2_page");
                  }
        
            }else{
                if (req.body.testType == "G") {
                    res.render("G_page", {
                        message: "you have a profile book an appointment",
                        hasAppointment : false,
                        gotDate: req.body.ADate,
                        slots: slots2
                      });
                  } else {
                    res.render("G2_page", {
                        message: "you have a profile book an appointment",
                        hasAppointment : false,
                        gotDate: req.body.ADate,
                        slots: slots2
                      });
                  }
                
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