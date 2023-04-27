import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Portal } from './Portal'
import classNames from 'classnames'

export const Modal = (props) => {
  const { className, children, isOpen, onClose, lazy, classNameContainer } =
    props

  const [isMounted, setIsMounted] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
    } else {
      return setIsMounted(false)
    }
  }, [isOpen])

  const closeHandler = useCallback(() => {
    onClose()
  }, [onClose])

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        closeHandler()
      }
    },
    [closeHandler]
  )

  const onContentClick = (e) => {
    e.stopPropagation()
  }

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        window.removeEventListener('keydown', onKeyDown)
      }
    }
  }, [isOpen, onKeyDown])

  if (lazy && !isMounted) {
    return null
  }

  return (
    <Portal>
      <div
        className={classNames('popup', { popup_opened: isOpen }, className)}
        onClick={closeHandler}
      >
        <div className="popup__scroll" onClick={onContentClick}>
          <div className={classNames('popup__container', classNameContainer)}>
            <button
              type="button"
              className="close-button popup__close-button"
              onClick={onClose}
            />
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}
