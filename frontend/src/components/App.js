import React, { useEffect, useState } from 'react';
import {Route, Redirect, Switch, useHistory} from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import RemovePlacePopup from "./RemovePlacePopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import auth from "../utils/auth";

function App() {

  const history = useHistory();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isRemovePopupOpen, setIsRemovePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [cards, setCards] = useState([]);
  const [removingCard, setRemovingCard] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');

  useEffect(() => {
    tokenCheck();
  }, []);

  const errorHandler = err => {
    console.log(err);
  }

  useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch(errorHandler)
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
      .catch(errorHandler)
  }, [])


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function registerConfirm(state) {
    setIsTooltipOpen(true);
    setSuccess(state);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          setCards(newCards);
    })
      .catch(errorHandler)
  }

  function handleCardDelete() {
    api.deleteCard(removingCard._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== removingCard._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch(errorHandler)
  }

  function handleRemovePopup(card) {
    setIsRemovePopupOpen(true);
    setRemovingCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsRemovePopupOpen(false);
    setSelectedCard('');
    setIsTooltipOpen(false);
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(errorHandler)
  }

  function handleUpdateAvatar(data) {
    api.setUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(errorHandler)
  }

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
      .then((newCard) => {
        setCards([...cards, newCard])
        closeAllPopups();
      })
      .catch(errorHandler)
  }

  function registerUser(email, password) {
    return auth.register(email, password)
      .then(() => {
        registerConfirm(true);
        history.push('/sign-in');
      })
      .catch(err => {
        registerConfirm(false);
        if (err === 400) {
          console.log('Некорректно заполнено одно из полей');
        }
        errorHandler(err);
      })
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt).then(res => {
        if (res) {
          setLoggedInUserEmail(res.data.email);
          setIsLoggedIn(true);
          history.push('/');
        }})
        .catch(err => {
          if (err === 400) {
            console.log('Токен не передан или передан не в том формате');
          }
          if (err === 401) {
            console.log('Переданный токен некорректен')
          }
          errorHandler(err);
        })
    }
  }

  function loginUser(email, password) {
    return auth.authorize(email, password)
      .then(res => {
        if (res && res.token) {
          localStorage.setItem('jwt', res.token);
          tokenCheck();
        }
      })
      .catch(err => {
        if (err === 400) {
          console.log('Не передано одно из полей');
        }
        if (err === 401) {
          console.log('Пользователь с такой комбинацией email и пароля не найден');
        }
        errorHandler(err);
      })
  }

  function signOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
      <div className="page__content">
        <Header
          signOut={signOut}
          loggedInUserEmail={loggedInUserEmail}
        />

        <Switch>
          <ProtectedRoute
            exact path="/"
            component={Main}
            loggedIn={isLoggedIn}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleRemovePopup}
          />
          <Route path={'/sign-up'}>
            <Register registerUser={registerUser} />
          </Route>
          <Route path={'/sign-in'} >
            <Login loginUser={loginUser} />
          </Route>
        </Switch>


        <Footer/>
        <InfoTooltip
          isOpen={isTooltipOpen}
          success={success}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAdderSubmit={handleAddPlaceSubmit}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <RemovePlacePopup
          isOpen={isRemovePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
        />
      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
