import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlelogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email");
    const passwordError = document.querySelector(".password");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          //window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  return (
    <form action="" onSubmit={handlelogin} id="sign-up-form">
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
      <br />
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
      <input type="submit" value="se connecter" />
    </form>
  );
};

export default SignInForm;
