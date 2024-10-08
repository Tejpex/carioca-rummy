import styled from "styled-components"
import { useCarioca } from "../contexts/CariocaContext"

export const HandRow = ({person}) => {
  const {
    sortByValue,
    toggleStaged,
    setNewHand
  } = useCarioca()

  const hand = person.hand

  const sortHandByValue = () => {
    const cards = sortByValue(person.hand)
    setNewHand(person, cards)
  }

  return (
    <CardRow>
      <div>
        <button onClick={() => sortHandByValue()}>Sortera efter värde</button>
      </div>
      {hand.map((card, index) => (
        <CardButton onClick={() => toggleStaged(person, card)} key={index}>
          {!card.staged && <CardImage src={card.img} alt={card.name} />}
          {card.staged && <CardImageStaged src={card.img} alt={card.name} />}
        </CardButton>
      ))}
    </CardRow>
  )
}

const CardRow = styled.div`
  background-color: red;
  padding: 15px;
  display: flex;
  justify-content: flex-start;
`

const CardButton = styled.button`
  background: none;
  border: none;
  padding: 0;
`

const CardImage = styled.img`
  height: 90px;
`

const CardImageStaged = styled.img`
  height: 90px;
  position: relative;
  top: 10px;
`
