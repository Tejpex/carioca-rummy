import styled from "styled-components"
import { useEffect } from "react"
import { useCarioca } from "../contexts/CariocaContext"

export const Table = () => {
  const { discardPile, stock, dealCards, takeCard, playersHand, playerCanPickCard } = useCarioca()

  useEffect(() => {
    dealCards()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const lastCardThrown = discardPile.slice(-1)[0]
  const topOfTheStock = stock.slice(1)[0]

  const handleClick = (card, pile) => {
    if (playerCanPickCard) {
      takeCard(playersHand, card, pile)
    }
    
  }

  return (
    <div>
      {lastCardThrown && (
        <button onClick={() => handleClick(lastCardThrown, discardPile)}>
          <CardImage src={lastCardThrown.img} />
        </button>
      )}
      <button onClick={() => handleClick(topOfTheStock, stock)}>
        <CardImage src="/Baksida.png" alt="Card facing down" />
      </button>
    </div>
  ) 
}

const CardImage = styled.img`
  height: 90px;
`
