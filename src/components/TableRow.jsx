import styled from "styled-components"
import { useCarioca } from "../contexts/CariocaContext"

export const TableRow = ({person}) => {
  const { checkForTrio, throwCard, gameStageIndex } = useCarioca()
  let table = person.table
  const messages = ["Delar ut kort...", "Börja med att ta ett kort.", "Din tur.", "Det är datorns tur."]


  const handleClick = (command) => {
    if (gameStageIndex === 2) {
      if (command === "play") {
        checkForTrio(person)
      } else if (command === "throw") {
        throwCard(person)
      }
    } else {
      alert(messages[gameStageIndex])
    }
  }

  return (
    <>
      <TableCardRow>
        <div>
          <button onClick={() => handleClick("play")}>Spela kort</button>
          <button onClick={() => handleClick("throw")}>Släng kort</button>
        </div>
        {table.map((card, index) => (
          <CardImage src={card.img} key={index} alt={card.name} />
        ))}
      </TableCardRow>
    </>
  )
}

const TableCardRow = styled.div`
  background-color: green;
  height: 100px;
  padding: 15px;
  display: flex;
  justify-content: flex-start;
`

const CardImage = styled.img`
  height: 90px;
`
