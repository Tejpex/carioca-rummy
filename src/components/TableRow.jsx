import styled from "styled-components"
import { useCarioca } from "../contexts/CariocaContext"

export const TableRow = ({person}) => {
  const { checkForTrio, throwCard } = useCarioca()

  let table = person.table

  return (
    <>
      <TableCardRow>
        <div>
          <button onClick={() => checkForTrio(person)}>
            Spela kort
          </button>
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

/* 
          <button onClick={() => throwCard(playersHand)}>
            Släng kort
          </button>*/
