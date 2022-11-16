const UserModel = require("../Models/user");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");
const maxAge = 3 * 24 * 60 * 60 * 1000;

module.exports.signup = async (req, res) => {
  const { prenom, nom, email, password } = req.body;

  try {
    const user = await UserModel.create({ prenom, nom, email, password });
    res.status(201).json({ userId: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    res.status(200).json({
      userId: user._id,
      token: jwt.sign(
        { userId: user._id, isAdmin: user.isAdmin },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "24h",
        }
      ),
      isAdmin: user.isAdmin,
    });
    console.log(user);
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
};

module.exports.logout = (req, res) => {
  res.status(200).json({ message: "déconnexion" });
  res.redirect("/");
};
