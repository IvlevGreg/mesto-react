import IconRemoveCard from '../images/icons/icon-remove-card.svg'

export function Card({ card, onCardClick }) {
  const { likes, link, name } = card
  const handleCardClick = () => onCardClick(card)

  return (
    <li className="place__item">
      <button type="button" className="remove-button place__remove-button">
        <img
          className="remove-button__img"
          src={IconRemoveCard}
          alt="Удалить карточку"
        />
      </button>

      <button
        type="button"
        onClick={handleCardClick}
        className="place__open-popup-button"
      >
        <img src={link} alt={name} className="place__img" />
      </button>

      <div className="place__content">
        <h2 className="place__name">{name}</h2>
        <div className="">
          <button
            type="button"
            className="like-button place__like-button"
          ></button>
          <p className="place__like-amount">{likes.length}</p>
        </div>
      </div>
    </li>
  )
}
