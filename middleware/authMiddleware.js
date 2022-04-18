const Login = require("../models/Login");

module.exports = (req, res, next) => {
  Login.findOne({ loginId: req.session.Id }, (error, login) => {
    if (error || !login) {
      return res.redirect("/Login");
    } else {
      next();
    }
  });

  // next();
};
