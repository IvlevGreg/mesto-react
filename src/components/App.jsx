import { useCallback, useEffect, useState } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { api } from '../utils/Api'
import { Footer } from './Footer'
import { Header } from './Header'
import { ImagePopup } from './ImagePopup'
import { Main } from './Main'
import { EditProfilePopup } from './EditProfilePopup'
import { EditAvatarPopup } from './EditAvatarPopup'
import { AddPlacePopup } from './AddPlacePopup'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(false)
  const [userStatus, setUserStatus] = useState('initial')
  const [cards, setCards] = useState(null)
  const [cardsStatus, setCardsStatus] = useState('initial')

  const [selectedCard, setSelectedCard] = useState(null)

  const handleEditProfileClick = useCallback(
    () => setIsEditProfilePopupOpen(true),
    []
  )
  const handleAddPlaceClick = useCallback(
    () => setIsAddPlacePopupOpen(true),
    []
  )
  const handleEditAvatarClick = useCallback(
    () => setIsEditAvatarPopupOpen(true),
    []
  )

  const closeAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)

    setSelectedCard(null)
  }, [])

  const handleCardLike = useCallback((currentCard, isLiked) => {
    api.changeLikeCardStatus(currentCard._id, isLiked).then((newCard) => {
      setCards((state) =>
        state.map((card) => (card._id === currentCard._id ? newCard : card))
      )
    })
  })

  const handleCardDelete = useCallback((id) => {
    api.removeCard(id).then(() => {
      setCards((state) => state.filter((card) => card._id !== id))
    })
  })

  const handleUpdateUser = useCallback((user) => {
    api
      .updateUserData(user)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((error) => {
        throw new Error(error)
      })
  }, [])

  const handleAddPlaceSubmit = useCallback(
    (card) => {
      api
        .postNewCard(card)
        .then((newCard) => {
          console.log(newCard)
          console.log(cards)
          setCards([newCard, ...cards])
          closeAllPopups()
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    [cards]
  )

  const handleUpdateAvatar = useCallback((user) => {
    api
      .updateUserImg(user)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((error) => {
        throw new Error(error)
      })
  }, [])

  useEffect(() => {
    setUserStatus('loading')
    setCardsStatus('loading')
    api
      .getUserdata()
      .then((data) => {
        setUserStatus('success')
        setCurrentUser(data)

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
    <CurrentUserContext.Provider value={currentUser}>
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        setSelectedCard={setSelectedCard}
        userStatus={userStatus}
        cards={cards}
        cardsStatus={cardsStatus}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />

      <Footer />

      <EditProfilePopup
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}
        onUpdateUser={handleUpdateAvatar}
      />

      <AddPlacePopup
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        onAddPlace={handleAddPlaceSubmit}
      />


      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
    </CurrentUserContext.Provider>
  )
}

export default App
