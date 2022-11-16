module.exports = function (req, res, next) {
  if ((isAdmin = false)) {
    return res.status(403).send("Accès refusé vous n'êtes pas admin");
  }
  next();
};
