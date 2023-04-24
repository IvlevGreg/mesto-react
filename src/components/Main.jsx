import { useEffect, useState } from 'react'
import { api } from '../utils/Api'
import { CardsList } from './CardsList'
import { User } from './User'

export function Main() {
  const [user, setUser] = useState(null)
  const [userStatus, setUserStatus] = useState('loading')
  const [cards, setCards] = useState(null)
  const [cardsStatus, setCardsStatus] = useState('loading')

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
        <User user={user} status={userStatus} />
        <CardsList cards={cards} status={cardsStatus} userStatus={userStatus} />
      </section>
    </main>
  )
}
