import styled from "styled-components"
import { useState } from "react"
import { Button } from "./Button"
import { useCarioca } from "../contexts/CariocaContext"

export const HandRow = ({person}) => {
  const {
    sortByValue,
    sortBySuit,
    toggleStaged,
    setNewHand,
    sortingOn,
    setSortingOn,
    player,
    computer, 
    tryToPlayCards, 
    throwCard, 
    gameStageIndex, 
    setMessage
  } = useCarioca()

  const [openCards, setOpenCards] = useState(false)

  const hand = person.hand
  const messages = [
    "Delar ut kort...",
    "Börja med att ta ett kort.",
    "Din tur.",
    "Det är datorns tur.",
  ]
  
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

  const handleClick = (command) => {
    if (gameStageIndex === 2) {
      if (command === "play") {
        tryToPlayCards(person)
      } else if (command === "throw") {
        throwCard(person)
      }
    } else {
      setMessage(messages[gameStageIndex])
      setTimeout(() => setMessage(""), 2000)
    }
  }

  if (person === computer && !openCards) {
    return (
      <CardRow>
        <div>
          {hand.map((card, index) => (
            <CardImage src="/Baksida.png" alt="Card facing down" key={index} />
          ))}
        </div>
        <ButtonBox>
          <Button
            text="Visa korten"
            func={() => setOpenCards(!openCards)}
            color="var(--light-shadow)"
          />
        </ButtonBox>
      </CardRow>
    )
  } else {
    return (
      <CardRow>
        {person === player && (
          <RadioButtonBox>
            <form onChange={() => handleSorting(event.target.value)}>
              <legend>Sortera korten:</legend>
              <div>
                <input
                  type="radio"
                  id="sort-off"
                  name="sorting"
                  value="off"
                  defaultChecked={sortingOn === "off"}
                />
                <label htmlFor="sort-off">Av</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="sort-value"
                  name="sorting"
                  value="value"
                  defaultChecked={sortingOn === "value"}
                />
                <label htmlFor="sort-value">Värde</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="sort-suit"
                  name="sorting"
                  value="suit"
                  defaultChecked={sortingOn === "suit"}
                />
                <label htmlFor="sort-suit">Färg</label>
              </div>
            </form>
          </RadioButtonBox>
        )}
        {person === player && (
          <ButtonBox>
            <Button
              text="Spela kort"
              func={() => handleClick("play")}
              color="var(--secondary-light)"
            />
            <Button
              text="Släng kort"
              func={() => handleClick("throw")}
              color="var(--light-shadow)"
            />
          </ButtonBox>
        )}
        {hand.map((card, index) => (
          <CardButton onClick={() => toggleStaged(person, card)} key={index}>
            {!card.staged && <CardImage src={card.img} alt={card.name} />}
            {card.staged && <CardImageStaged src={card.img} alt={card.name} />}
          </CardButton>
        ))}
        {person === computer && (
          <ButtonBox>
            <Button
              text="Dölj korten"
              func={() => setOpenCards(!openCards)}
              color="var(--light-shadow)"
            />
          </ButtonBox>
        )}
      </CardRow>
    )
  }
}

const RadioButtonBox = styled.div`
  margin: 0 10px;
  font-family: "Raleway", serif;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
`

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 20px 0 10px;
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
