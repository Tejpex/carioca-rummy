import styled from "styled-components"
import { useCarioca } from "../contexts/CariocaContext"

export const PlayersSide = () => {
  const { sortByValue, toggleStaged, checkForTrio, playersTable, throwCard, player } = useCarioca()

  const hand = player.hand 

  return (
    <>
      <CardRow>
        <div>
          <button onClick={() => sortByValue(player)}>
            Sortera efter värde
          </button>
        </div>
        {hand.map((card, index) => (
          <CardButton
            onClick={() => toggleStaged(hand, card)}
            key={index}
          >
            {!card.staged && <CardImage src={card.img} alt={card.name} />}
            {card.staged && <CardImageStaged src={card.img} alt={card.name} />}
          </CardButton>
        ))}
      </CardRow>
      <TableRow>
        <div>
          <button onClick={() => checkForTrio(playersHand, playersTable)}>
            Spela kort
          </button>
          <button onClick={() => throwCard(playersHand)}>
            Släng kort
          </button>
        </div>
        {playersTable.map((card, index) => (
          <CardImage src={card.img} key={index} alt={card.name} />
        ))}
      </TableRow>
    </>
  )
}

const CardRow = styled.div`
  background-color: red;
  padding: 15px;
  display: flex;
  justify-content: flex-start;
`

const TableRow = styled.div`
  background-color: green;
  height: 100px;
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
