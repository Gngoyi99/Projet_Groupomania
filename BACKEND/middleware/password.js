const PasswordValidator = require("password-validator");
const password = require("password-validator");

const passwordSchema = new PasswordValidator();

///schema mot de passe
passwordSchema
  .is()
  .min(5) /// Minimun 5 lettres
  .is()
  .max(20) /// Maximun 20 lettres
  .has()
  .uppercase() /// Majuscule
  .has()
  .lowercase() /// Miniscule
  .has()
  .digits(2) /// Minimun 2 chiffres
  .has()
  .not()
  .spaces() /// Pas d'espaces
  .is()
  .not()
  .oneOf(["Password", "Password123"]); /// Pas authorisé

///verification
module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    return res.status(400).json({
      message:
        "Le mot de passe n'est pas assez fort :" +
        passwordSchema.validate("req.body.password", { list: true }),
    });
  }
};
