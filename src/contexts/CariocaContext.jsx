/* eslint-disable react-refresh/only-export-components */
import PropTypes from "prop-types"
import { createContext, useContext, useState } from "react"
import cards from "../cards.json"

const CariocaContext = createContext()

export const CariocaProvider = ({ children }) => {
  const [playersHand, setPlayersHand] = useState([])
  const [computersHand, setComputersHand] = useState([])
  const [playersTable, setPlayersTable] = useState([])
  const [computersTable, setComputersTable] = useState([])
  const [discardPile, setDiscardPile] = useState([])
  const [stock, setStock] = useState([])
  const contracts = [
    "2 Trios",
    "1 Trio, 1 Escala",
    "2 Escalas",
    "3 Trios",
    "2 Trios, 1 Escala",
    "1 Trio, 2 Escalas",
    "4 Trios",
    "3 Escalas",
  ]
  const [playerCanPickCard, setPlayerCanPickCard] = useState(false)
  
  const dealCards = () => {
    let index = 0
    const deckInPlay = [...cards]
    const pCards = []
    const cCards = []
    const dPile = []
    const newStock = []

    while (index <= cards.length) {
      const card = deckInPlay[Math.floor(Math.random()*deckInPlay.length)]

      if (index === 24) {
        // Puts 25th card face up on table
        dPile.push(card)
      } else if (index > 24) {
        // Puts last cards in the stock
        newStock.push(card)
      } else if (index % 2 === 0) {
        // Deals 12 cards to player (even-number under 25)
        pCards.push(card)
      } else {
        // Deals 12 cards to computer (odd-number under 25)
        cCards.push(card)
      }
      deckInPlay.splice(deckInPlay.indexOf(card), 1)
      index ++
    }

    setPlayersHand(pCards)
    setComputersHand(cCards)
    setDiscardPile(dPile)
    setStock(newStock)
    setPlayerCanPickCard(true)
  }

  const sortByValue = (array) => {
    const newArray = [...array]
    newArray.sort((a, b) => a.value - b.value)
    setPlayersHand(newArray)
  }

  const takeCard = (hand, card, pile) => {
    if (hand === playersHand) {
      setPlayersHand((prevHand) => [...prevHand, card])
      setPlayerCanPickCard(false)
    } else if (hand === computersHand) {
      setComputersHand((prevHand) => [...prevHand, card])
    }
    const newPile = [...pile]
    if (pile === discardPile) {
      newPile.splice(-1, 1)
      setDiscardPile(newPile)
    } else if (pile === stock) {
      newPile.splice(0, 1)
      setStock(newPile)
    }
  }
  
  const toggleStaged = (hand, card) => {
    if (hand === playersHand) {
      setPlayersHand(
        playersHand.map((pCard) => 
          pCard === card ? { ...pCard, staged: !pCard.staged } : pCard
        )
      )
    } else if (hand === computersHand) {
      setComputersHand(
        computersHand.map((cCard) =>
          cCard === card ? { ...cCard, staged: !cCard.staged } : cCard
        )
      )
    }
  }
  
  return (
    <CariocaContext.Provider
      value={{ playersHand, computersHand, discardPile, stock, dealCards, contracts, sortByValue, takeCard, toggleStaged, playerCanPickCard }}
    >
      {children}
    </CariocaContext.Provider>
  )
}

export const useCarioca = () => useContext(CariocaContext)

CariocaProvider.propTypes = {
  children: PropTypes.any,
}
