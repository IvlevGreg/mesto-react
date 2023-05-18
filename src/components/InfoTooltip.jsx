import classNames from 'classnames'

export function InfoTooltip({ isOpen, className, onClose, status = 1 }) {
  if (!isOpen) return null

  return (
    <div
      className={classNames(
        'popup',
        'popup_card',
        { popup_opened: isOpen },
        className
      )}
    >
      <div className="popup__container popup__container_status">
        <button
          type="button"
          className="close-button popup__close-button"
          onClick={onClose}
        />
        <div
          className={classNames(
            'popup__result-img',

            { 'popup__result-img_success': status },
            { 'popup__result-img_error': !status },
            className
          )}
        />
        <h2 className="popup__subtitle">
          {status
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так!' + 'Попробуйте ещё раз.'}
        </h2>
      </div>
    </div>
  )
}
