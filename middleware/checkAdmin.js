module.exports = (req, res, next) => {
    if (req.session.userType != "Admin") {
        return res.redirect("/");
      }else{
        next();
      }
};