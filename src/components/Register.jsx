import { useState } from 'react'

export const Register = ({ onSubmit }) => {
  const t = 1

  const [values, setValues] = useState({})
  const onChange = (e) => {
    console.log(values)
    setValues({ ...values, [e.target.attributes.name.value]: e.target.value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    onSubmit(values)
  }

  return (
    <div className="page">
      <h2 className="page__title">Регистрация</h2>
      <form
        action="login"
        onSubmit={handleSubmit}
        className="popup-form popup-form_dark"
      >
        <div className="popup-form__input-container">
          <input
            className="popup-form__input popup-form__input_dark"
            placeholder="Email"
            name="email"
            value={values.email || ''}
            onChange={onChange}
          />
          <input
            className="popup-form__input popup-form__input_dark"
            placeholder="Пароль"
            name="password"
            value={values.password || ''}
            onChange={onChange}
          />
        </div>

        <div>
          <button
            type="submit"
            className="popup-form__submit-button popup-form__submit-button_dark"
          >
            Зарегистрироваться
          </button>
          <button type="button" className="popup-form__submit-button ">
            Уже зарегистрированы? Войти
          </button>
        </div>
      </form>
    </div>
  )
}