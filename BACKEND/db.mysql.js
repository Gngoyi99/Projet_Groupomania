//Variable environnement
const dotenv = require("dotenv");
dotenv.config();

//importation de mysql
const mysql = require("mysql");
console.log(mysql);

//connexion à la Base
const mysqlconnexion = mysql.createConnection({
  host: "localhost",
  database: "GROUPOMANIA",
  user: "root",
  password: "77176",
});
console.log("--->mysqlconnexion");

console.log(mysqlconnexion);

mysqlconnexion.connect((err) => {
  if (err) {
    console.log(`error connecting: ${err.stack}`);
  } else {
    console.log("connecté à la base GROUPOMANIA");
    console.log(`connected as id ${mysqlconnexion.threadId}`);
  }
});

module.exports = mysqlconnexion;
