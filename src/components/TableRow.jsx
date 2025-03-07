import styled from "styled-components"
import { Button } from "./Button"
import { useCarioca } from "../contexts/CariocaContext"

export const TableRow = ({person}) => {
  const { tryToPlayCards, throwCard, gameStageIndex, setMessage, player } = useCarioca()
  const trioTable = person.trioTable
  const scalaTable = person.scalaTable
  const messages = ["Delar ut kort...", "Börja med att ta ett kort.", "Din tur.", "Det är datorns tur."]


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

  return (
    <>
      <TableCardRow>
        {person === player && (
          <ButtonBox>
            <Button text="Spela kort" func={() => handleClick("play")} />
            <Button text="Släng kort" func={() => handleClick("throw")} />
          </ButtonBox>
        )}
        {trioTable.map((card, index) => (
          <CardImage src={card.img} key={index} alt={card.name} />
        ))}
        {scalaTable.map((scala, index) => (
          <div key={index}>
            {scala.map((card, index) => (
              <CardImage src={card.img} key={index} alt={card.name} />
            ))}
          </div>
        ))}
      </TableCardRow>
    </>
  )
}

const TableCardRow = styled.div`
  background-color: var(--primary);
  height: 100px;
  padding: 15px;
  display: flex;
  justify-content: flex-start;
`

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-right: 20px;
`

const CardImage = styled.img`
  height: 90px;
`
