import React from "react";

export default function PopupWithForm({title, name, children, isOpen, onClose, onSubmit, buttonText}) {
  return (
    <div className={`popup popup__${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <form
          name={name}
          className="popup__form popup__form_profile"
          onSubmit={onSubmit}
          noValidate
        >
          <h2 className="popup__header">{title}</h2>
          {children}
          <button className="popup__savebutton">{buttonText}</button>
        </form>
        <button className="popup__close-button" type="button" onClick={onClose}/>
      </div>
    </div>
  )
}