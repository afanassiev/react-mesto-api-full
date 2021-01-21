import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `item__delete-button ${isOwn ? '' : 'item__delete-button_hidden'}`
  );
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`item__checkbox ${isLiked ? 'item__checkbox_active' : ''}`);



  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="item">
      <img
        className="item__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <button
        className={`${cardDeleteButtonClassName}`}
        onClick={handleDeleteClick}
      />
      <div className="item__fragment item__fragment_textfield">
        <h2 className="item__title">{card.name}</h2>
        <div className="item__like">
          <button
            className={`${cardLikeButtonClassName}`}
            type="button"
            onClick={handleLikeClick}
          />
          <span className="item__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}