import React, {useState, useEffect, useContext} from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleName(evt) {
    setName(evt.target.value)
  }

  function handleDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <label className="popup__label">
          <input
            className="popup__input popup__input_name"
            type="text"
            id="profileName-input"
            defaultValue={name}
            onChange={handleName}
            name="profileNameInput"
            required
            minLength="2"
            maxLength="40"
          />
          <span
            className="popup__error"
            id="profileName-input-error"
          />
        </label>
        <label className="popup__label">
          <input
            className="popup__input popup__input_descr"
            type="text"
            id="descr-input"
            defaultValue={description}
            onChange={handleDescription}
            name="profileDescrInput"
            required minLength="2"
            maxLength="200"
          />
          <span
            className="popup__error"
            id="descr-input-error"
          />
        </label>
      </>
    </PopupWithForm>

  )
}

export default EditProfilePopup;