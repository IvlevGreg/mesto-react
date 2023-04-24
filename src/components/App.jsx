import { Footer } from './Footer'
import { Header } from './Header'
import { Main } from './Main'

function App() {
  return (
    <>
      <Header />

      <Main />

      <div className="popup popup_edit">
        <div className="popup__scroll">
          <div className="popup__container">
            <button
              type="button"
              className="close-button popup__close-button"
            ></button>

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
          </div>
        </div>
      </div>

      <div className="popup popup_create">
        <div className="popup__scroll">
          <div className="popup__container">
            <button
              type="button"
              className="close-button popup__close-button"
            ></button>

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
          </div>
        </div>
      </div>

      <div className="popup popup_profile-img-edit">
        <div className="popup__scroll">
          <div className="popup__container">
            <button
              type="button"
              className="close-button popup__close-button"
            ></button>

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
          </div>
        </div>
      </div>

      <div className="popup popup_card-remove">
        <div className="popup__scroll">
          <div className="popup__container">
            <button
              type="button"
              className="close-button popup__close-button"
            ></button>

            <h2 className="popup__title">Вы уверены?</h2>
            <form
              name="create-form"
              className="popup-form popup-form_create popup__popup-form"
              noValidate
            >
              <button type="submit" className="popup-form__submit-button ">
                Да
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="popup popup_card">
        <div className="popup__container popup__container_card">
          <button
            type="button"
            className="close-button popup__close-button popup__close-button_card"
          ></button>
          <img
            src="./images/no-image.png"
            alt="Картинка заглушка"
            className="popup__img"
          />
          <h2 className="popup__name"></h2>
        </div>
      </div>

      <Footer />

      <template id="template-place-item">
        <li className="place__item">
          <button type="button" className="remove-button place__remove-button">
            <img
              className="remove-button__img"
              src="./images/icons/icon-remove-card.svg"
              alt="Удалить карточку"
            />
          </button>

          <button type="button" className="place__open-popup-button">
            <img
              src="./images/no-image.png"
              alt="Картинка заглушка"
              className="place__img"
            />
          </button>

          <div className="place__content">
            <h2 className="place__name"></h2>
            <div className="">
              <button
                type="button"
                className="like-button place__like-button"
              ></button>
              <p className="place__like-amount"></p>
            </div>
          </div>
        </li>
      </template>

      <template id="template-profile">
        <section className="profile">
          <button className="profile__img-btn">
            <img
              className="profile__img"
              src="./images/profile/JacquesCousteau.jpg"
              alt=""
            />
          </button>

          <div className="profile__text-container">
            <h1 className="profile__title"></h1>
            <button
              type="button"
              className="profile__edit-button edit-button"
            ></button>
            <p className="profile__descr"></p>
          </div>

          <button
            type="button"
            className="add-button profile__add-button"
          ></button>
        </section>
      </template>
    </>
  )
}

export default App
