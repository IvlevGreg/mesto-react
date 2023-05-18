export const Login = () => {
  const t = 1
  return (
    <div className="page">
      <h2 className="page__title">Вход</h2>
      <form action="login" className="popup-form popup-form_dark">
        <div className="popup-form__input-container">
          <input
            className="popup-form__input popup-form__input_dark"
            placeholder="Email"
            name="email"
          />
          <input
            className="popup-form__input popup-form__input_dark"
            placeholder="Пароль"
            name="password"
          />
        </div>

        <button
          type="submit"
          className="popup-form__submit-button popup-form__submit-button_dark"
        >
          Войти
        </button>
      </form>
    </div>
  )
}
