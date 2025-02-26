import styled from "styled-components"
import { useEffect } from "react"
import { useCarioca } from "../contexts/CariocaContext"

export const Table = () => {
  const { player, discardPile, stock, startNewGame, takeCard, gameStageIndex } = useCarioca()

  useEffect(() => {
    startNewGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const lastCardThrown = discardPile.slice(-1)[0]
  const topOfTheStock = stock.slice(0)[0]

  const handleClick = (card, pile) => {
    if (gameStageIndex === 1) {
      takeCard(player, card, pile)
    } else {
      alert("Not your turn to pick a card.")
    }
  }

  return (
    <TableMidRow>
      {lastCardThrown && (
        <CardButton onClick={() => handleClick(lastCardThrown, discardPile)}>
          <CardImage src={lastCardThrown.img} />
        </CardButton>
      )}
      <CardButton onClick={() => handleClick(topOfTheStock, stock)}>
        <CardImage src="/Baksida.png" alt="Card facing down" />
      </CardButton>
    </TableMidRow>
  ) 
}

const TableMidRow = styled.div`
  background-color: var(--primary);
  height: 100px;
`

const CardButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 2px 5px;
`

const CardImage = styled.img`
  height: 90px;
`
