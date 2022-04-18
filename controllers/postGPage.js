const User = require("../models/User");
const path = require("path");

module.exports = (req, res) => {
    let userId = req.body.userId;
    let user = {};
    if (req.body.address) {
      user = { ...user, address: req.body.address };
    }
    if (req.body.details) {
      user = { ...user, carDetails: req.body.details };
    }
    if (req.files) {
      if (req.files.image) {
        let image = req.files.image;
        image.mv(path.resolve(__dirname, "../public/assets/img", image.name));
        user = { ...user, image1: "assets/img/" + image.name };
      }
      if (req.files.image2) {
        let image2 = req.files.image2;
        image2.mv(path.resolve(__dirname, "../public/assets/img", image2.name));
        user = { ...user, image2: "assets/img/" + image2.name };
      }
    }
  
    User.updateOne({ userId: userId }, { ...user }, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        if (docs.matchedCount == 0) {
          res.render("G2_page", {
            message: "You do not have an account create one.",
            hasProfile: false,
            gotDate: null,
            slots: {}
          });
        } else {
          const userdata = {
            userId: "",
            fName: "",
            lName: "",
            DOB: "",
            address: "",
            carDetails: "",
            license: "",
            image1: "",
            image2: "",
            message: "successfully updated",
          };
          res.render("G_page", { ...userdata });
        }
      }
    });
  
  };