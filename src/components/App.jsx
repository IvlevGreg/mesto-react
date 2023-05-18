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
import { ConfirmPopup } from './ConfirmPopup'
import { Route, Routes } from 'react-router-dom'
import { ProtectedRouteElement } from './ProtectedRouteElement'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)
  const [activeRemoveCardId, setActiveRemoveCardId] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [userStatus, setUserStatus] = useState('initial')
  const [cards, setCards] = useState(null)
  const [cardsStatus, setCardsStatus] = useState('initial')

  const [selectedCard, setSelectedCard] = useState(null)

  const handleEditProfileClick = useCallback(
    () => setIsEditProfilePopupOpen(true),
    [],
  )
  const handleAddPlaceClick = useCallback(
    () => setIsAddPlacePopupOpen(true),
    [],
  )
  const handleEditAvatarClick = useCallback(
    () => setIsEditAvatarPopupOpen(true),
    [],
  )
  const handleRemoveCardClick = useCallback((id) => {
    setActiveRemoveCardId(id)
    setIsConfirmPopupOpen(true)
  }, [])

  const closeAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsConfirmPopupOpen(false)

    setSelectedCard(null)
  }, [])

  const handleCardLike = useCallback((currentCard, isLiked) => {
    api
      .changeLikeCardStatus(currentCard._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((card) => (card._id === currentCard._id ? newCard : card)),
        )
      })
      .catch((error) => {
        throw new Error(error)
      })
  })

  const handleCardDelete = useCallback(() => {
    api
      .removeCard(activeRemoveCardId)
      .then(() => {
        setCards((state) =>
          state.filter((card) => card._id !== activeRemoveCardId),
        )
        closeAllPopups()
      })
      .catch((error) => {
        throw new Error(error)
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
          setCards([newCard, ...cards])
          closeAllPopups()
        })
        .catch((error) => {
          throw new Error(error)
        })
    },
    [cards],
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

  const MainElement = <Main
    onEditProfile={handleEditProfileClick}
    onAddPlace={handleAddPlaceClick}
    onEditAvatar={handleEditAvatarClick}
    setSelectedCard={setSelectedCard}
    userStatus={userStatus}
    cards={cards}
    cardsStatus={cardsStatus}
    onCardLike={handleCardLike}
    onCardDelete={handleRemoveCardClick}
  />

  const loggedIn = true


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />

      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRouteElement loggedIn={loggedIn}>
              {MainElement}
            </ProtectedRouteElement>
          }
        />
        <Route path="*" element={<h1>Oops!... Not found</h1>} />
        <Route
          path="/log-out"
          element={
            <ProtectedRouteElement loggedIn={loggedIn}>
              <h1> log-out</h1>
            </ProtectedRouteElement>
          }
        />
      </Routes>
      <Footer />

      {/* попапы инициализируются только если данные юзера успешно подгружены*/}
      {userStatus === 'success' && (
        <>
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

          <ConfirmPopup
            onClose={closeAllPopups}
            isOpen={isConfirmPopupOpen}
            submitAction={handleCardDelete}
          />
        </>
      )}

      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
    </CurrentUserContext.Provider>
  )
}

export default App
