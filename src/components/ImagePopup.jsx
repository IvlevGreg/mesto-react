import classNames from 'classnames'
import { useEffect, useRef } from 'react'

export function ImagePopup({ card, className, onClose, isOpen }) {
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
  if (!card) return null

  const { name, link } = card

  return (
    <div
      className={classNames(
        'popup',
        'popup_card',
        { popup_opened: isOpen },
        className
      )}
      ref={popupRef}
      //TODO: проверить что обработчик удаляется
      onMouseDown={(evt) => {
        if (evt.target === popupRef.current) onClose()
      }}
    >
      <div className="popup__container popup__container_card">
        <button
          type="button"
          className="close-button popup__close-button popup__close-button_card"
          onClick={onClose}
        ></button>
        <img src={link} alt={name} className="popup__img" />
        <h2 className="popup__name">{name}</h2>
      </div>
    </div>
  )
}
