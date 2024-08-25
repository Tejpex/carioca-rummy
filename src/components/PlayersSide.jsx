import styled from "styled-components"
import { useCarioca } from "../contexts/CariocaContext"

export const PlayersSide = () => {
  const { playersHand, sortByValue } = useCarioca()

  return (
    <CardRow>
      {playersHand
        .map((card, index) => ( 
          <CardImage src={card.img} alt={card.name} key={index} />
        ))}
      <button onClick={() => sortByValue(playersHand)}>Sortera efter värde</button>
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
