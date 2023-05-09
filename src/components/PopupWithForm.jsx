import classNames from 'classnames'
import { useRef, useEffect } from 'react'

export function PopupWithForm({
  children,
  title,
  name,
  className,
  onClose,
  isOpen,
  btnText,
  isDisabled = false,
  onSubmit,
}) {
  const popupRef = useRef(null)
  const handleSubmit = (e) => {
    onSubmit(e)
  }
  function handleEscClose(evt) {
    if (evt.key == 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleEscClose)
    return () => {
      window.removeEventListener('keydown', handleEscClose)
    }
  }, [])

  return (
    <div
      className={classNames(
        'popup',
        `popup_${name}`,
        { popup_opened: isOpen },
        className
      )}
      ref={popupRef}
      onMouseDown={(evt) => {
        if (evt.target === popupRef.current) onClose()
      }}
    >
      <div className="popup__scroll">
        <div className={'popup__container'}>
          <button
            type="button"
            className="close-button popup__close-button"
            onClick={onClose}
          />

          <h2 className="popup__title">{title}</h2>
          <form
            name={name}
            className="popup-form popup-form_edit popup__popup-form"
            noValidate
            onSubmit={handleSubmit}
          >
            {children}

            <button
              type="submit"
              className="popup-form__submit-button"
              disabled={isDisabled}
            >
              {btnText}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
