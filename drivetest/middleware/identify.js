exports.isDriver = (req, res, next) => {
  if (!req.user.isDriver()) {
    return res.redirect('/');
  }
  next();
}

exports.isAdmin = (req, res, next) => {
  if (!req.user.isAdmin()) {
    return res.redirect('/');
  }
  next();
}

exports.isExaminer = (req, res, next) => {
  if (!req.user.isExaminer()) {
    return res.redirect("/");
  }
  next();
};