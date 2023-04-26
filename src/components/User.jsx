import { useState } from 'react'
import { Modal } from './shared/Modal'
import { UserLoader } from './UserLoader'

export function User({ user, status }) {
  if (status === 'loading') {
    return <UserLoader className="h-w-100" />
  }

  if (status === 'error' || !user) {
    return <h2>Упс... Что-то пошло не так</h2>
  }

  const { avatar, name, about } = user
  const [isPopupEditProfileOpen, setIsPopupEditProfileOpen] = useState(false)
  const [isPopupEditAvatarOpen, setIsPopupEditAvatarOpen] = useState(false)
  const [isPopupCardCreateOpen, setIsPopupCardCreateOpen] = useState(false)

  return (
    <section className="profile">
      <button
        className="profile__img-btn"
        onClick={() => setIsPopupEditAvatarOpen(true)}
      >
        <img className="profile__img" src={avatar} alt={name} />
      </button>

      <div className="profile__text-container">
        <h1 className="profile__title">{name}</h1>
        <button
          type="button"
          className="profile__edit-button edit-button"
          onClick={() => setIsPopupEditProfileOpen(true)}
        ></button>
        <p className="profile__descr">{about}</p>
      </div>

      <button
        type="button"
        className="add-button profile__add-button"
        onClick={() => setIsPopupCardCreateOpen(true)}
      ></button>

      <Modal
        isOpen={isPopupEditProfileOpen}
        onClose={() => setIsPopupEditProfileOpen(false)}
      >
        <h2 className="popup__title">Редактировать профиль</h2>
        <form
          name="edit-form"
          className="popup-form popup-form_edit popup__popup-form"
          noValidate
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
          <button type="submit" className="popup-form__submit-button">
            Сохранить
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={isPopupCardCreateOpen}
        onClose={() => setIsPopupCardCreateOpen(false)}
      >
        <h2 className="popup__title">Новое место</h2>
        <form
          name="create-form"
          className="popup-form popup-form_create popup__popup-form"
          noValidate
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
          <button
            type="submit"
            className="popup-form__submit-button popup-form__submit-button_disabled"
            disabled
          >
            Создать
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={isPopupEditAvatarOpen}
        onClose={() => setIsPopupEditAvatarOpen(false)}
      >
        <h2 className="popup__title">Обновить аватар</h2>
        <form
          name="create-form"
          className="popup-form popup-form_create popup__popup-form"
          noValidate
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

          <button
            type="submit"
            className="popup-form__submit-button popup-form__submit-button_disabled"
            disabled
          >
            Сохранить
          </button>
        </form>
      </Modal>
    </section>
  )
}
