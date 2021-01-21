import React, {useState} from "react";
import {Link} from "react-router-dom";

function Register({registerUser}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onChangeEmail = (evt) => setEmail(evt.target.value);
  const onChangePassword = (evt) => setPassword(evt.target.value);

  function handleSubmit(evt) {
    evt.preventDefault()
    if (email || password) {
      registerUser(email, password)
    }
  }

  return (
    <form
      className="auth"
      onSubmit={handleSubmit}
    >
      <h2 className="auth__header">Регистрация</h2>
      <label className="auth__label">
        <input
          className="auth__input auth__input_email"
          type="email"
          id="email-input"
          placeholder="Email"
          name="authEmailInput"
          required
          value={email || ''}
          onChange={onChangeEmail}
          minLength="2"
          maxLength="40"
        />
        <span
          className="auth__error"
          id="email-input-error"
        />
      </label>
      <label className="auth__label">
        <input
          className="auth__input auth__input_password"
          type="password"
          id="password-input"
          placeholder="Пароль"
          name="authPasswordInput"
          value={password || ''}
          onChange={onChangePassword}
          required minLength="2"
          maxLength="20"
        />
        <span
          className="auth__error"
          id="password-input-error"
        />
      </label>
      <button
        className="auth__submit"
        type="submit"
      >Зарегистрироваться</button>
      <Link
        to="/sign-in"
        className="auth__link"
      >Уже зарегистрированы? Войти</Link>
    </form>
  )
}

export default Register;
