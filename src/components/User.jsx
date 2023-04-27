import { useState } from 'react'
import { PopupWithForm } from './shared/PopupWithForm'
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

      <PopupWithForm
        isOpen={isPopupEditProfileOpen}
        onClose={() => setIsPopupEditProfileOpen(false)}
        title="Редактировать профиль"
        btnText="Сохранить"
        inputs={[
          {
            type: 'text',
            name: 'name',
            placeholder: 'Имя',
            required: true,
            minLength: '2',
            maxLength: '40',
          },
          {
            type: 'text',
            name: 'about',
            placeholder: 'Описание',
            required: true,
            minLength: '2',
            maxLength: '200',
          },
        ]}
      />

      <PopupWithForm
        disabled
        isOpen={isPopupCardCreateOpen}
        onClose={() => setIsPopupCardCreateOpen(false)}
        title="Новое место"
        btnText="Создать"
        inputs={[
          {
            type: 'text',
            className: 'popup-form__input popup-form__input_img-name',
            name: 'name',
            placeholder: 'Название',
            required: true,
            minLength: '2',
            maxLength: '30',
          },
          {
            type: 'url',
            name: 'link',
            placeholder: 'Ссылка на картинку',
            required: true,
          },
        ]}
      />

      <PopupWithForm
        disabled
        isOpen={isPopupEditAvatarOpen}
        onClose={() => setIsPopupEditAvatarOpen(false)}
        title="Обновить аватар"
        btnText="Сохранить"
        inputs={[
          {
            type: 'url',
            className: 'popup-form__input popup-form__input_link',
            name: 'avatar',
            placeholder: 'Ссылка на автар',
            required: true,
          },
        ]}
      />
    </section>
  )
}
