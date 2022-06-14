import React, { useState } from "react";
import axios from "axios";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const nomError = document.querySelector(".nom.error");
    const prenomError = document.querySelector(".prenom.error");
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".passwordConfirm.error"
    );

    passwordConfirmError.innerHTML = "";
    if (password != passwordConfirm) {
      passwordConfirmError.innerHTML =
        "les mots de passe ne correspondent pas!!!";
    }

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/signup`,
      data: {
        nom,
        prenom,
        pseudo,
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          nomError.innerHTML = res.data.errors.nom;
          prenomError.innerHTML = res.data.errors.prenom;
          pseudoError.innerHTML = res.data.errors.pseudo;
          emailError = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          setFormSubmit(true);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignUpForm />
          <h4 className="succes">
            Enregistrement réussi chez Groupomania, veuillez-vous connecter!
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="nom">Nom</label>
          <br />
          <input
            type="text"
            name="nom"
            id="nom"
            onChange={(e) => setNom(e.target.value)}
            value={nom}
          />
          <div className="nom error"></div>

          <label htmlFor="prenom">Prénom</label>
          <br />
          <input
            type="text"
            name="prenom"
            id="prenom"
            onChange={(e) => setPrenom(e.target.value)}
            value={prenom}
          />
          <div className="prenom error"></div>
          <label htmlFor="pseudo">Pseudo</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
          />
          <div className="pseudo error"></div>

          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="email error"></div>

          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="password error"></div>
          <label htmlFor="passwordConfirm">Confirmer le mot de passe</label>
          <br />
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
          />
          <div className="passwordConfirm error"></div>
          <br />
          <input type="submit" value="Valider" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
