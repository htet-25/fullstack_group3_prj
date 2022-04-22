const alert = require("alert");
const User = require("../models/User");
 
module.exports = (req,res) => {
    
    if(req.body.result == "Pass"){
        User.updateOne({userId : req.body.userId},{result : "PASS" , comment: req.body.comment , licenseType: req.body.testType}, (_err , docs) => {
            if(docs.matchedCount == "1"){
                alert("Result Updated");
                res.redirect("/Examiner");
            }
        });
    }else if(req.body.result == "Fail"){
        User.updateOne({userId : req.body.userId},{result : "FAIL" , comment: req.body.comment }, (_err , docs) => {
            if(docs.matchedCount == "1"){
                alert("Result Updated");
                res.redirect("/Examiner");
            }
        });
    }
    
};