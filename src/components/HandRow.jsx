import styled from "styled-components"
import { useCarioca } from "../contexts/CariocaContext"

export const HandRow = ({person}) => {
  const {
    sortByValue,
    sortBySuit,
    toggleStaged,
    setNewHand,
    setSortingOn,
    player,
    computer,
    testMode
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

  if (person === computer && !testMode) {
    return (
      <CardRow>
        <div>
          {hand.map((card, index) => (
            <CardImage src="/Baksida.png" alt="Card facing down" key={index} />
          ))}
        </div>
      </CardRow>
    )
  } else {
    return (
      <CardRow>
        {person === player && (
          <ButtonBox>
            <form onChange={() => handleSorting(event.target.value)}>
              <legend>Sortera korten:</legend>
              <div>
                <input type="radio" id="sort-off" name="sorting" value="off" />
                <label htmlFor="sort-off">Av</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="sort-value"
                  name="sorting"
                  value="value"
                />
                <label htmlFor="sort-value">Värde</label>
              </div>

              <div>
                <input type="radio" id="sort-suit" name="sorting" value="suit" />
                <label htmlFor="sort-suit">Färg</label>
              </div>
            </form>
          </ButtonBox>
        )}
        {hand.map((card, index) => (
          <CardButton onClick={() => toggleStaged(person, card)} key={index}>
            {!card.staged && <CardImage src={card.img} alt={card.name} />}
            {card.staged && <CardImageStaged src={card.img} alt={card.name} />}
          </CardButton>
        ))}
      </CardRow>
    )
  }
}

const ButtonBox = styled.div`
  font-family: "Raleway", serif;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
`

const CardRow = styled.div`
  background-color: var(--primary-light);
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
