import React from "react";
import {Switch, Route, Link} from 'react-router-dom'

export default function Header({signOut, loggedInUserEmail}) {
  return (
    <header className="header">
      <div className="header__container">
      <h1 className="header__logo">Логотип</h1>

      <Switch>
        <Route path="/sign-up">
          <Link
            to="/sign-in"
            className="header__auth"
          >Войти</Link>
        </Route>
        <Route path="/sign-in">
          <Link
            to="sign-up"
            className="header__auth"
          >Регистрация</Link>
        </Route>
        <Route exact path="/">
          <ul className="header__user-panel">
            <li><p className="header__email">{loggedInUserEmail}</p></li>
            <li><button className="header__logout" onClick={signOut}>Выйти</button></li>
          </ul>
        </Route>
      </Switch>
      </div>
      <hr className="header__line"/>
    </header>
  )
}
