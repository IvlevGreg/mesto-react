import { useCallback, useContext } from 'react'
import { CardsContext } from '../contexts/CardsContext'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { CardsList } from './CardsList'
import { User } from './User'

export function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  userStatus,
  cardsStatus,
  setSelectedCard,
}) {
  const user = useContext(CurrentUserContext)
  const cards = useContext(CardsContext)

  const onCardClick = useCallback((card) => {
    setSelectedCard(card)
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
