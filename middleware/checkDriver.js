module.exports = (req, res, next) => {
    if (req.session.userType != "Driver") {
        return res.redirect("/");
      }else{
        next();
      }
};