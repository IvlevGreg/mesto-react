import { useCallback, useEffect, useState } from 'react'
import { api } from '../utils/Api'
import { CardsList } from './CardsList'
import { User } from './User'

export function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  setSelectedCard,
}) {
  const [user, setUser] = useState(null)
  const [userStatus, setUserStatus] = useState('initial')
  const [cards, setCards] = useState(null)
  const [cardsStatus, setCardsStatus] = useState('initial')

  const onCardClick = useCallback((card) => {
    setSelectedCard(card)
  }, [])

  useEffect(() => {
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
  }, [])

  return (
    <main className="main">
      <section className="place">
        <User
          user={user}
          status={userStatus}
          handleEditProfileClick={onEditProfile}
          handleAddPlaceClick={onAddPlace}
          handleEditAvatarClick={onEditAvatar}
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
