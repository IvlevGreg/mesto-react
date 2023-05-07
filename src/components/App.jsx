import { useCallback, useEffect, useState } from 'react'
import { CardsContext } from '../contexts/CardsContext'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { api } from '../utils/Api'
import { Footer } from './Footer'
import { Header } from './Header'
import { ImagePopup } from './ImagePopup'
import { Main } from './Main'
import { PopupWithForm } from './PopupWithForm'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(false)
  const [userStatus, setUserStatus] = useState('initial')
  const [cards, setCards] = useState(null)
  const [cardsStatus, setCardsStatus] = useState('initial')

  const [selectedCard, setSelectedCard] = useState(null)

  const handleEditProfileClick = useCallback(
    () => setIsEditProfilePopupOpen(true),
    []
  )
  const handleAddPlaceClick = useCallback(
    () => setIsEditAvatarPopupOpen(true),
    []
  )
  const handleEditAvatarClick = useCallback(
    () => setIsAddPlacePopupOpen(true),
    []
  )

  const closeAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)

    setSelectedCard(null)
  }, [])

  useEffect(() => {
    setUserStatus('loading')
    setCardsStatus('loading')
    api
      .getUserdata()
      .then((data) => {
        setUserStatus('success')
        setCurrentUser(data)

        api
          .getInitialCards()
          .then((data) => {
            setCards(data)
            setCardsStatus('success')
          })
          .catch(() => setCardsStatus('error'))
      })
      .catch(() => setUserStatus('error'))
  }, [])

  return (
    <CardsContext.Provider value={cards}>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          setSelectedCard={setSelectedCard}
          userStatus={userStatus}
          cardsStatus={cardsStatus}
        />

        <Footer />

        <PopupWithForm
          title="Редактировать профиль"
          name="edit-form"
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          btnText="Сохранить"
        >
          <label className="popup-form__label">
            <input
              type="text"
              className="popup-form__input popup-form__input_name"
              name="name"
              placeholder="Имя"
              required
              minLength="2"
              maxLength="40"
            />
            <span className="popup-form__input-error"></span>
          </label>

          <label className="popup-form__label">
            <input
              type="text"
              className="popup-form__input popup-form__input_descr"
              name="about"
              placeholder="Описание"
              required
              minLength="2"
              maxLength="200"
            />
            <span className="popup-form__input-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          title="Новое место"
          name="create-form"
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          btnText="Создать"
          isDisabled
        >
          <label className="popup-form__label">
            <input
              type="text"
              className="popup-form__input popup-form__input_img-name"
              name="name"
              placeholder="Название"
              required
              minLength="2"
              maxLength="30"
            />
            <span className="popup-form__input-error"></span>
          </label>

          <label className="popup-form__label">
            <input
              type="url"
              className="popup-form__input popup-form__input_link"
              name="link"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="popup-form__input-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          title="Обновить аватар"
          name="create-form"
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
          btnText="Сохранить"
          isDisabled
        >
          <label className="popup-form__label">
            <input
              type="url"
              className="popup-form__input popup-form__input_link"
              name="avatar"
              placeholder="Ссылка на автар"
              required
            />
            <span className="popup-form__input-error"></span>
          </label>
        </PopupWithForm>

        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      </CurrentUserContext.Provider>
    </CardsContext.Provider>
  )
}

export default App
