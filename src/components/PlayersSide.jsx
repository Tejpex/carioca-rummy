import styled from "styled-components"
import { useCarioca } from "../contexts/CariocaContext"

export const PlayersSide = () => {
  const { playersHand, sortByValue, toggleStaged } = useCarioca()

  return (
    <>
      <CardRow>
        <div>
          <button onClick={() => sortByValue(playersHand)}>
            Sortera efter värde
          </button>
        </div>
        {playersHand.map((card, index) => (
          <CardButton onClick={() => toggleStaged(playersHand, card)} key={index}>
            {!card.staged && <CardImage src={card.img} alt={card.name} />}
            {card.staged && <CardImageStaged src={card.img} alt={card.name} />}
          </CardButton>
        ))}
      </CardRow>
      <button>Spela kort</button>
      <button>Släng kort</button>
    </>
  )
}

const CardRow = styled.div`
  background-color: red;
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
