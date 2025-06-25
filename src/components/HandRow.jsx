import styled from "styled-components"
import { useState } from "react"
import { useCarioca } from "../contexts/CariocaContext"
import { RadioButtonBox } from "./RadioButtonBox"
import { Button } from "./Button"

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
          <RadioButtonBox person={person}/>
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

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
