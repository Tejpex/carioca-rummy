import styled from "styled-components"

export const TableRow = ({person}) => {
  const trioTable = person.trioTable
  const scalaTable = person.scalaTable

  return (
    <>
      <TableCardRow>
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

const CardImage = styled.img`
  height: 90px;
`
