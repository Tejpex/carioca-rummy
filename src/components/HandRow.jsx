import styled from "styled-components"
import { useCarioca } from "../contexts/CariocaContext"

export const HandRow = ({person}) => {
  const {
    sortByValue,
    sortBySuit,
    toggleStaged,
    setNewHand
  } = useCarioca()

  const hand = person.hand

  const sortHandByValue = () => {
    const cards = sortByValue(person.hand)
    setNewHand(person, cards)
  }

  const sortHandByColor = () => {
    const cards = sortBySuit(person.hand)
    setNewHand(person, cards)
  }

  return (
    <CardRow>
      <ButtonBox>
        <button onClick={() => sortHandByValue()}>Sortera efter värde</button>
        <button onClick={() => sortHandByColor()}>Sortera efter färg</button>
      </ButtonBox>
      {hand.map((card, index) => (
        <CardButton onClick={() => toggleStaged(person, card)} key={index}>
          {!card.staged && <CardImage src={card.img} alt={card.name} />}
          {card.staged && <CardImageStaged src={card.img} alt={card.name} />}
        </CardButton>
      ))}
    </CardRow>
  )
}

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

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
