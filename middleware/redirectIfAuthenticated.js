module.exports = (req, res, next) => {
  if (req.session.Id) {
    return res.redirect("/");
  } else {
    next();
  }
};
