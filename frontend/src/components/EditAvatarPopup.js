import React, {useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }

  useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen])

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <label className="popup__label">
          <input
            className="popup__input popup__input_avatar"
            type="url"
            id="url-avatar"
            name="urlAvatar"
            placeholder="Ссылка на аватар"
            ref={avatarRef}
            required
          />
          <span className="popup__error" id="url-avatar-error"/>
        </label>
      </>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;