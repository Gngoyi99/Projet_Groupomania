import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Acceuil from "../../pages/Acceuil";
import Profil from "../../pages/Profil";
import Trending from "../../pages/Trending";

const index = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Acceuil} />
        <Route path="/profil" exact component={Profil} />
        <Route path="/trending" exact component={Trending} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
export default index;
