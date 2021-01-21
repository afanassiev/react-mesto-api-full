import React from "react";
import PopupWithForm from "./PopupWithForm";

function RemovePlacePopup({isOpen, onClose, onCardDelete}) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onCardDelete();
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete-confirmation"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  )
}

export default RemovePlacePopup;