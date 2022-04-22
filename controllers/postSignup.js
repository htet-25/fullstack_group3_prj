const Login = require("../models/Login");
const alert = require("alert");

module.exports = (req, res) => {
  Login.create(
    {
      loginPassword: req.body.password,
      loginId: req.body.userId,
      loginType: req.body.userType,
    },
    (error, _login) => {
      if (error) {
        alert("error occured");
        return res.redirect("/Signup");
      }else{
        alert("successfully registered");
        res.redirect("/Login");
      }

      
    }
  );
};
