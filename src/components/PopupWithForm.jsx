import classNames from 'classnames'
import { useEffect, useRef } from 'react'

export function PopupWithForm({
  children,
  title,
  name,
  className,
  onClose,
  isOpen,
}) {
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleEscClose)
    }

    function handleEscClose(evt) {
      if (evt.key == 'Escape') {
        onClose()
      }
    }

    return window.removeEventListener('keydown', handleEscClose)
  }, [])

  const popupRef = useRef(null)

  //   function close() {
  //     popup.classList.remove('popup_opened')
  //     document.body.classList.remove('pages_popup-opened')

  //     document.removeEventListener('keyup', handleEscClose)
  //   }

  //   function handleOutsidePopup(evt) {
  //     if (evt.target === popup) {
  //       close()
  //     }
  //   }

  //   function setEventListeners() {
  //     popup.addEventListener('mousedown', (evt) => handleOutsidePopup(evt))
  //     buttonClose.addEventListener('click', () => close())
  //   }

  //   function open() {
  //     popup.classList.add('popup_opened')
  //     document.body.classList.add('pages_popup-opened')

  //     document.addEventListener('keyup', handleEscClose)
  //   }

  return (
    <div
      className={classNames(
        'popup',
        `popup_${name}`,
        { popup_opened: isOpen },
        className
      )}
      ref={popupRef}
      //TODO: проверить что обработчик удаляется
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
          >
            {children}
          </form>
        </div>
      </div>
    </div>
  )
}
