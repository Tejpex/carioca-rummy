import styled from "styled-components"
import { useCarioca } from "../contexts/CariocaContext"

export const PlayersSide = () => {
  const { playersHand, sortByValue, stage, stageCard, unstageCard } = useCarioca()

  return (
    <>
      <CardRow>
        <div>
          <button onClick={() => sortByValue(playersHand)}>
            Sortera efter värde
          </button>
        </div>
        {playersHand.map((card, index) => (
          <button onClick={() => stageCard(playersHand, card)} key={index}>
            <CardImage src={card.img} alt={card.name} />
          </button>
        ))}
      </CardRow>
      <Stage>
        <button>Spela kort</button>
        <button>Släng kort</button>
        {stage.map((card, index) => (
          <button onClick={() => unstageCard(card)} key={index}>
            <CardImage src={card.img} alt={card.name} />
          </button>
        ))}
      </Stage>
    </>
  )
}

const CardRow = styled.div`
  background-color: red;
  padding: 15px;
  display: flex;
  justify-content: flex-start;
`

const Stage = styled.div`
  background-color: green;
  height: 100px;
`

const CardImage = styled.img`
  height: 90px;
`
