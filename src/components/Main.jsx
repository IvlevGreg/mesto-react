import { useCallback, useEffect, useState } from 'react'
import { api } from '../utils/Api'
import { CardsList } from './CardsList'
import { PopupWithForm } from './PopupWithForm'
import { ImagePopup } from './ImagePopup'
import { User } from './User'

export function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  isEditProfilePopupOpen,
  isAddPlacePopupOpen,
  isEditAvatarPopupOpen,
  selectedCard,
  setSelectedCard,
  setIsCardPopupOpen,
  isCardPopupOpen,
}) {
  const [user, setUser] = useState(null)
  const [userStatus, setUserStatus] = useState('loading')
  const [cards, setCards] = useState(null)
  const [cardsStatus, setCardsStatus] = useState('loading')

  const handleEditProfileClick = useCallback(() => onEditProfile(true), [])
  const handleAddPlaceClick = useCallback(() => onAddPlace(true), [])
  const handleEditAvatarClick = useCallback(() => onEditAvatar(true), [])

  const onCardClick = useCallback((card) => {
    setIsCardPopupOpen(true)
    setSelectedCard(card)
  }, [])

  const onCloseCardPopup = useCallback(() => {
    setIsCardPopupOpen(false)
    setSelectedCard(null)
  }, [])

  useEffect(() => {
    if (user) return
    setUserStatus('loading')
    setCardsStatus('loading')
    api
      .getUserdata()
      .then((data) => {
        setUserStatus('success')
        setUser(data)

        api
          .getInitialCards()
          .then((data) => {
            setCards(data)
            setCardsStatus('success')
          })
          .catch(() => setCardsStatus('error'))
      })
      .catch(() => setUserStatus('error'))
  }, [user])

  return (
    <main className="main">
      <section className="place">
        <User
          user={user}
          status={userStatus}
          handleEditProfileClick={handleEditProfileClick}
          handleAddPlaceClick={handleAddPlaceClick}
          handleEditAvatarClick={handleEditAvatarClick}
        />
        <CardsList
          cards={cards}
          onCardClick={onCardClick}
          status={cardsStatus}
          userStatus={userStatus}
        />
      </section>

      <PopupWithForm
        title="Редактировать профиль"
        name="edit-form"
        onClose={() => onEditProfile(false)}
        isOpen={isEditProfilePopupOpen}
        btnText="Сохранить"
      >
        <fieldset className="popup-form__fieldset">
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
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        title="Новое место"
        name="create-form"
        onClose={() => onAddPlace(false)}
        isOpen={isAddPlacePopupOpen}
        btnText="Создать"
        isDisabled
      >
        <fieldset className="popup-form__fieldset">
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
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        title="Обновить аватар"
        name="create-form"
        onClose={() => onEditAvatar(false)}
        isOpen={isEditAvatarPopupOpen}
        btnText="Сохранить"
        isDisabled
      >
        <fieldset className="popup-form__fieldset">
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
        </fieldset>
      </PopupWithForm>

      <ImagePopup
        isOpen={isCardPopupOpen}
        onClose={onCloseCardPopup}
        card={selectedCard}
      />
    </main>
  )
}
