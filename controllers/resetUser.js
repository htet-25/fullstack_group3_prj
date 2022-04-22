const User = require("../models/User");
const alert = require("alert");

module.exports = (req,res) => {
    User.updateOne({userId: req.params.userId},{$unset : {myAppointment: "" , comment : "" , testType : "" , result: ""}},(err,docs)=>{
        if(err || docs.matchedCount <= 0){
            alert("error occured");
            res.redirect("/");
        }else{
            alert("user reset done");
            res.redirect("/");
        }
    });
};