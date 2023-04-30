import { useCallback, useEffect, useState } from 'react'
import { api } from '../utils/Api'
import { CardsList } from './CardsList'
import { User } from './User'

export function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  setSelectedCard,
  setIsCardPopupOpen,
}) {
  const [user, setUser] = useState(null)
  const [userStatus, setUserStatus] = useState('loading')
  const [cards, setCards] = useState(null)
  const [cardsStatus, setCardsStatus] = useState('loading')

  const handleEditProfileClick = useCallback(() => onEditProfile(true), [])
  const handleAddPlaceClick = useCallback(() => onAddPlace(true), [])
  const handleEditAvatarClick = useCallback(() => onEditAvatar(true), [])

  const onCardClick = useCallback((card) => {
    setIsCardPopupOpen(true)
    setSelectedCard(card)
  }, [])

  useEffect(() => {
    if (user) return
    setUserStatus('loading')
    setCardsStatus('loading')
    api
      .getUserdata()
      .then((data) => {
        setUserStatus('success')
        setUser(data)

        api
          .getInitialCards()
          .then((data) => {
            setCards(data)
            setCardsStatus('success')
          })
          .catch(() => setCardsStatus('error'))
      })
      .catch(() => setUserStatus('error'))
  }, [user])

  return (
    <main className="main">
      <section className="place">
        <User
          user={user}
          status={userStatus}
          handleEditProfileClick={handleEditProfileClick}
          handleAddPlaceClick={handleAddPlaceClick}
          handleEditAvatarClick={handleEditAvatarClick}
        />
        <CardsList
          cards={cards}
          onCardClick={onCardClick}
          status={cardsStatus}
          userStatus={userStatus}
        />
      </section>
    </main>
  )
}
