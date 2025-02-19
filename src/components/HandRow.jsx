import styled from "styled-components"
import { useCarioca } from "../contexts/CariocaContext"

export const HandRow = ({person}) => {
  const {
    sortByValue,
    sortBySuit,
    toggleStaged,
    setNewHand,
    setSortingOn
  } = useCarioca()

  const hand = person.hand
  
  const handleSorting = (value) => {
    if (value === "value") {
      const cards = sortByValue(person.hand)
      setNewHand(person, cards)
    } else if (value === "suit") {
      const cards = sortBySuit(person.hand)
      setNewHand(person, cards)
    }
    setSortingOn(value)
  }

  return (
    <CardRow>
      <ButtonBox>
        <form onChange={() => handleSorting(event.target.value)}>
          <legend>Sortera korten:</legend>
          <div>
            <input type="radio" id="sort-off" name="sorting" value="off" />
            <label for="sort-off">Av</label>
          </div>

          <div>
            <input type="radio" id="sort-value" name="sorting" value="value" />
            <label for="sort-value">Värde</label>
          </div>

          <div>
            <input type="radio" id="sort-suit" name="sorting" value="suit" />
            <label for="sort-suit">Färg</label>
          </div>
        </form>
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
