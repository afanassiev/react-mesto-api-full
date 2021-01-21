import React, {useState, useEffect} from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({cards, onCardLike, onCardDelete, onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="contain">
      <section className="profile">
        <div className="profile__data">
          <button className="profile__avatar-button" onClick={onEditAvatar}>
            <img src={currentUser.avatar} className="profile__avatar" alt="аватар пользователя"/>
          </button>
          <ul className="profile__info">
            <li className="profile__name">{currentUser.name}</li>
            <li className="profile__descr">{currentUser.about}</li>
          </ul>
          <button className="profile__editbutton" type="button" onClick={onEditProfile}/>
        </div>
        <button className="profile__addbutton" type="button" onClick={onAddPlace}/>
      </section>
      <section className="elements">
        {
          cards.map((card) =>
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
          )
        }
      </section>
    </main>
  )
}