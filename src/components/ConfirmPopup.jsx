import { PopupWithForm } from './PopupWithForm'

export function ConfirmPopup({ isOpen, onClose, submitAction }) {
  function handleSubmit(e) {
    e.preventDefault()
    console.log(2)
    submitAction()
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      onClose={onClose}
      isOpen={isOpen}
      btnText="Да"
      isDisabled={false}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  )
}
