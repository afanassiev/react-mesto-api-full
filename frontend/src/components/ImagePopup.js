import React from "react";

export default function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup__image ${card ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <button className="popup__close-button popup__close-button_image" type="button" onClick={onClose}/>
        <img className="popup__image-pic" src={card.link}  alt={card.name}/>
        <h3 className="popup__image-name">{card.name}</h3>
      </div>
    </div>
  )
}