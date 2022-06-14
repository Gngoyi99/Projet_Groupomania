const mysql = require("../db.mysql");
const bcrypt = require("bcrypt");
const mysqlconnexion = require("../db.mysql");
const jwt = require("jsonwebtoken");

//INSCRIPTION
exports.signup = (req, res) => {
  const { nom, prenom, pseudo, email, password } = req.body;
  console.log(nom);
  console.log(prenom);
  console.log(pseudo);
  console.log(email);
  console.log(password);

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash,
      };
      console.log(user);
      //requête SQL
      mysqlconnexion.query(
        "INSERT INTO USERS SET ?",
        user,
        (error, results) => {
          if (error) {
            console.log(error);
            res.json({ error });
          } else {
            console.log(results);
            res.json({
              message: "Utilisateur crée et enregistré dans la Base de donnée",
            });
          }
        }
      );
    })
    .catch((error) => res.status(500).json({ error }));
};
//CONNEXION
exports.login = (req, res, next) => {
  const email = req.body.email;
  //recherche de l'utilisateur dans la base de donnée
  mysqlconnexion.query(
    "SELECT * FROM users WHERE email = ?",
    email,
    (error, results) => {
      //Utilisateur trouvé
      if (error) {
        console.log(error);
        res.json({
          error,
        });
      } else {
        console.log(results);

        //Utilisateur non trouvé
        if (results == 0) {
          return res.status(404).json({
            message: "Utlisateur non reconnu dans la Base de donnée ",
          });
        }
      }
      bcrypt
        .compare(req.body.password, results[0].password)
        .then((valid) => {
          console.log(valid);

          //si le password n'est pas correct
          if (!valid) {
            return res.status(401).json({ message: "mot de passe incorrecte" });
          } else {
            //si le password est correct
            const token = jwt.sign(
              { userId: results[0].id },
              "RANDOM_TOKEN_SECRET",
              {
                expiresIn: "24h",
              }
            );
            console.log(token);
            res.status(201).json({
              userId: results[0].id,
              token,
            });
          }
        })
        .catch((error) => res.status(500).json({ error }));
    }
  );
};
