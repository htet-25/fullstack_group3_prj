const User = require("../models/User");
const { stringify } = require("querystring");

module.exports = (req, res) => {
  User.findOne({ userId: req.session.Id }, function (err, user) {
    if (err) return console.log(err);
    if (user) {
      console.log(user);
      res.render("ProfileView", {
        userId: user.userId,
        fName: user.fName,
        lName: user.lName,
        DOB: user.DOB.toISOString().slice(0, 10),
        address: user.address,
        carDetails: user.carDetails,
        license: user.license,
        image1: user.image1,
        image2: user.image2,
        licenseType: user.licenseType 
      });
    } else {
      res.render("profileCreate",{message: "you donot have a profile create one here" ,userId: req.session.Id});
    }
  });
};
