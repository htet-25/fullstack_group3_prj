const User = require("../models/User");
const path = require("path");


module.exports = (req, res) => {
  
  let image = req.files.image;
  let image2 = req.files.image2;
  image2.mv(path.resolve(__dirname, "../public/assets/img", image2.name));
  image.mv(
    path.resolve(__dirname, "../public/assets/img", image.name),
    async (_error) => {
      await User.create({
        userId: req.body.UserID,
        fName: req.body.fName,
        lName: req.body.lName,
        DOB: req.body.DOB,
        address: req.body.address,
        carDetails: req.body.details,
        license: req.body.license,
        image1: "assets/img/" + image.name,
        image2: "assets/img/" + image2.name,
        licenseType: "G1"
      });
      res.redirect("/Profile");
    }
  );
};
