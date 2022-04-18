const Login = require("../models/Login");
const bcrypt = require("bcrypt");

module.exports = (req, res) => {
  Login.findOne({ loginId: req.body.userId }, (_error, login) => {
    if (login) {
      bcrypt.compare(req.body.password, login.loginPassword, (_error, same) => {
        if (same) {
          req.session.Id = login.loginId;
          req.session.userType = login.loginType;
          res.redirect("/");
        } else {
          res.redirect("/Login");
        }
      });
    } else {
      res.redirect("/Signup");
    }
  });
};
