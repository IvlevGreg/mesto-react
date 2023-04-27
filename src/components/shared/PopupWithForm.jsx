import { Modal } from './Modal'

export function PopupWithForm({
  isOpen,
  onClose,
  title,
  inputs,
  btnText,
  disabled = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} lazy>
      <h2 className="popup__title">{title}</h2>
      <form
        name="edit-form"
        className="popup-form popup-form_edit popup__popup-form"
        noValidate
      >
        <fieldset className="popup-form__fieldset">
          {inputs.map((input) => (
            <label className="popup-form__label" key={input.name}>
              <input className="popup-form__input" {...input} />
              <span className="popup-form__input-error"></span>
            </label>
          ))}
        </fieldset>
        <button
          type="submit"
          className="popup-form__submit-button"
          disabled={disabled}
        >
          {btnText}
        </button>
      </form>
    </Modal>
  )
}
