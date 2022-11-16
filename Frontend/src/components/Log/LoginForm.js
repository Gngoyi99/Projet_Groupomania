import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const nav = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      data: {
        email,
        password,
        isAdmin,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          localStorage.setItem("token", res.data.token);
          axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/user/${res.data.userId}`,
          });
          setIsAdmin(res.data.isAdmin);

          //Mettre le userData dans le localstorage
          console.log(res.data.isAdmin);
          localStorage.setItem("user", res.data.userId);
          const userData = res.data.userId;
          console.log(userData);
          const userAdmin = localStorage.setItem("isAdmin", res.data.isAdmin);

          nav("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
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
      <br />
      <button>Se connecter</button>
    </form>
  );
};

export default LoginForm;
