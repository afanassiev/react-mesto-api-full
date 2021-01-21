import React, {useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAdderSubmit}) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function clearInputs() {
    setName('');
    setLink('');
  }

  useEffect(() => {
    if (!isOpen) {
      clearInputs();
    }
  })

  function handleSubmit(evt) {
    evt.preventDefault();
    onAdderSubmit({
      name,
      link
    });
  }

  function handleName(evt) {
    setName(evt.target.value);
  }

  function handleLink(evt) {
    setLink(evt.target.value);
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      buttonText="Добавить!"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <label className="popup__label">
          <input
            className="popup__input popup__input_placename"
            type="text"
            id="placename-input"
            name="placeNameInput"
            value={name}
            onChange={handleName}
            placeholder="Название"
            required
            minLength="1"
            maxLength="30"
          />
          <span
            className="popup__error"
            id="placename-input-error"
          />
        </label>
        <label className="popup__label">
          <input
            className="popup__input popup__input_link"
            type="url"
            id="url-input"
            name="urlInput"
            value={link}
            onChange={handleLink}
            placeholder="Ссылка на картинку"
            required
          />
          <span
            className="popup__error"
            id="url-input-error"
          />
        </label>
      </>
    </PopupWithForm>
  )
}

export default AddPlacePopup;