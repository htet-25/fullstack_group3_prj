const Login = require("../models/Login");

module.exports = (req, res) => {
  Login.create(
    {
      loginPassword: req.body.password,
      loginId: req.body.userId,
      loginType: req.body.userType,
    },
    (error, _login) => {
      if (error) {
        return res.redirect("/Signup");
      }

      res.redirect("/Login");
    }
  );
};
