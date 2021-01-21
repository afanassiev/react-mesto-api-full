import React from "react";
import Success from "../images/success.svg";
import Failure from "../images/failure.svg";

function InfoTooltip({success, isOpen, onClose}) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <div className="info-tooltip">
          <img src={`${success ? Success : Failure}`} alt="Результат авторизации"/>
          <h2 className="info-tooltip__message">{`${success ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз"}`}</h2>
        </div>
        <button className="popup__close-button" type="button" onClick={onClose}/>
      </div>
    </div>
  )
}

export default InfoTooltip;
