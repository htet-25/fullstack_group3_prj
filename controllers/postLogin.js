const Login = require("../models/Login");
const bcrypt = require("bcrypt");
const alert = require("alert");

module.exports = (req, res) => {
  Login.findOne({ loginId: req.body.userId }, (_error, login) => {
    if (login) {
      bcrypt.compare(req.body.password, login.loginPassword, (_error, same) => {
        if (same) {
          req.session.Id = login.loginId;
          req.session.userType = login.loginType;
          res.redirect("/");
        } else {
          alert("Username and Password do not match");
          res.redirect("/Login");
        }
      });
    } else {
      res.redirect("/Signup");
    }
  });
};
