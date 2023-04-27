import { Modal } from './Modal'

export function ImagePopup({ isOpen, onClose, name, src, alt = name }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      classNameContainer="popup__container_card"
      lazy
    >
      <>
        <img src={src} alt={alt} className="popup__img" />
        <h2 className="popup__name">{name}</h2>
      </>
    </Modal>
  )
}
