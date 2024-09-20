/* eslint-disable react-refresh/only-export-components */
import PropTypes from "prop-types"
import { createContext, useContext, useState } from "react"
import cards from "../cards.json"

const CariocaContext = createContext()

export const CariocaProvider = ({ children }) => {
  const [player, setPlayer] = useState({
    hand: [],
    table: []
  })

  const [computer, setComputer] = useState({
    hand: [],
    table: []
  })
  
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

  // 0-deal cards, 1-player pick card, 2-player plays, 3-player throws card
  const [gameStageIndex, setGameStageIndex] = useState(0)

  const setNewHand = (person, newHand) => {
    if (person === player) {
      setPlayer({ ...player, hand: newHand })
    } else if (person === computer) {
      setComputer({ ...computer, hand: newHand })
    }
  }
  
  const dealCards = () => {
    let index = 0
    const deckInPlay = [...cards]
    const newPlayerCards = []
    const newComputerCards = []
    const newDiscardPile = []
    const newStock = []

    while (index <= cards.length) {
      const card = deckInPlay[Math.floor(Math.random()*deckInPlay.length)]

      if (index === 24) {
        // Puts 25th card face up on table
        newDiscardPile.push(card)
      } else if (index > 24) {
        // Puts last cards in the stock
        newStock.push(card)
      } else if (index % 2 === 0) {
        // Deals 12 cards to player (even-number under 25)
        newPlayerCards.push(card)
      } else {
        // Deals 12 cards to computer (odd-number under 25)
        newComputerCards.push(card)
      }
      deckInPlay.splice(deckInPlay.indexOf(card), 1)
      index ++
    }

    setPlayer({ ...player, hand: newPlayerCards })
    setComputer({ ...computer, hand: newComputerCards})
    setDiscardPile(newDiscardPile)
    setStock(newStock)
    setGameStageIndex(1)
  }

  const sortByValue = (person) => {
    const hand = person.hand
    const newHand = [...hand]
    newHand.sort((a, b) => a.value - b.value)
    setNewHand(person, newHand)
  }

  const takeCard = (person, card, pile) => {
    const hand = person.hand
    const newHand = [...hand, card]
    setNewHand(person, newHand)

    const newPile = [...pile]
    if (pile === discardPile) {
      newPile.splice(-1, 1)
      setDiscardPile(newPile)
    } else if (pile === stock) {
      newPile.splice(0, 1)
      setStock(newPile)
    }
    setGameStageIndex(gameStageIndex + 1)
  }
  
  const toggleStaged = (person, card) => {
    const hand = person.hand
    const newHand = hand.map((oldCard) =>
      oldCard === card ? { ...oldCard, staged: !oldCard.staged } : oldCard
    )
    setNewHand(person, newHand)
  }

  const checkForTrio = (hand, table) => {
    const cardsToCheck = hand.filter((card) => card.staged)
    if (cardsToCheck.length === 3) {
      if (cardsToCheck[0].value === cardsToCheck[1].value) {
        if (cardsToCheck[1].value === cardsToCheck[2].value) {
          const newTable = [...table]
          cardsToCheck.map((card) => {
            newTable.push(card)
            hand.splice(hand.indexOf(card), 1)
          })
          setPlayersTable(newTable)
        } else {
          console.log("Two same value")
        }
      } else {
        console.log("Different value")
      }
    } else {
      console.log("Not 3 cards")
    }
  }

  const throwCard = (hand) => {
    const cardsToThrow = hand.filter((card) => card.staged)
    if (cardsToThrow.length === 1) {
      const newDPile = [...discardPile]
      newDPile.push(cardsToThrow[0])
      hand.splice(hand.indexOf(cardsToThrow[0]), 1)
      setDiscardPile(newDPile)
    } else {
      console.log("Not one card.")
    }
  }

  const computerPlay = () => {

  }
  
  return (
    <CariocaContext.Provider
      value={{ player, computer, discardPile, stock, gameStageIndex, dealCards, contracts, sortByValue, takeCard, toggleStaged, checkForTrio, throwCard  }}
    >
      {children}
    </CariocaContext.Provider>
  )
}

export const useCarioca = () => useContext(CariocaContext)

CariocaProvider.propTypes = {
  children: PropTypes.any,
}
