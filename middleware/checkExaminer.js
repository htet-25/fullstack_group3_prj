module.exports = (req, res, next) => {
    if (req.session.userType != "Examiner") {
        return res.redirect("/");
      }else{
        next();
      }
};