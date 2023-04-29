import { useState } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import { Main } from './Main'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)

  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)

  return (
    <>
      <Header />

      <Main
        onEditProfile={setIsEditProfilePopupOpen}
        onAddPlace={setIsAddPlacePopupOpen}
        onEditAvatar={setIsEditAvatarPopupOpen}
        isEditProfilePopupOpen={isEditProfilePopupOpen}
        isAddPlacePopupOpen={isAddPlacePopupOpen}
        isEditAvatarPopupOpen={isEditAvatarPopupOpen}
        selectedCard={selectedCard}
        setIsCardPopupOpen={setIsCardPopupOpen}
        isCardPopupOpen={isCardPopupOpen}
        setSelectedCard={setSelectedCard}
      />

      <Footer />
    </>
  )
}

export default App
