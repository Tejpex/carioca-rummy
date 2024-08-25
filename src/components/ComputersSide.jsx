import styled from "styled-components"
import { useCarioca } from "../contexts/CariocaContext"

export const ComputersSide = () => {
  const { computersHand } = useCarioca()

  return (
    <CardRow>
      {computersHand
        .map((card, index) => ( 
          <CardImage src="/Baksida.png" alt="Card facing down" key={index} />
        ))}
    </CardRow>
  )
}

const CardRow = styled.div`
  background-color: red;
  padding: 15px;
`

const CardImage = styled.img`
  height: 90px;
`
