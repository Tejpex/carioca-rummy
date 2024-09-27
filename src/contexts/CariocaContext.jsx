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
    "2 triss",
    "1 triss, 1 stege",
    "2 stegar",
    "3 triss",
    "2 triss, 1 stege",
    "1 triss, 2 stegar",
    "4 triss",
    "3 stegar",
  ]

  const gameStages = ["Dela ut kort", "Ta ett kort", "Spela kort eller släng ett kort", "Datorn spelar"]
  const [gameStageIndex, setGameStageIndex] = useState(0)

  const setNewHand = (person, newHand) => {
    if (person === player) {
      setPlayer({ ...player, hand: newHand })
    } else if (person === computer) {
      setComputer({ ...computer, hand: newHand })
    }
  }

  const setNewTable = (person, newTable) => {
    if (person === player) {
      setPlayer({ ...player, table: newTable })
    } else if (person === computer) {
      setComputer({ ...computer, table: newTable })
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

  const checkForTrio = (person, extraCard) => {
    const hand = person.hand
    let newHand = [...hand]
    if (extraCard) {
      newHand = [...hand, extraCard]
    }
    const table = person.table
    const cardsToCheck = newHand.filter((card) => card.staged)
    if (cardsToCheck.length === 3 && 
      cardsToCheck[0].value === cardsToCheck[1].value && 
      cardsToCheck[1].value === cardsToCheck[2].value) {
          const newTable = [...table]
          cardsToCheck.map((card) => {
            newTable.push(card)
            hand.splice(hand.indexOf(card), 1)
          })
          setNewTable(person, newTable)
    } else {
      alert("Det behövs tre kort av samma värde för att spela triss.")
    }
  }

  const throwCard = (person) => {
    const hand = person.hand
    const cardsToThrow = hand.filter((card) => card.staged)
    if (cardsToThrow.length === 1) {
      const newDPile = [...discardPile]
      newDPile.push(cardsToThrow[0])
      newDPile.map(card => card.staged = false)
      hand.splice(hand.indexOf(cardsToThrow[0]), 1)
      setDiscardPile(newDPile)
      computerPlay(cardsToThrow[0])
    } else {
      alert("Du kan bara slänga ett kort.")
    }
  }

  const countCards = (cards) => {
    const counterSameValue = {}
    cards.forEach((card) => {
      if (counterSameValue[card.value]) {
        counterSameValue[card.value] += 1
      } else {
        counterSameValue[card.value] = 1
      }
    })
    return counterSameValue
  }

  const computerPlay = (lastCardThrown) => {
    setGameStageIndex(3)
    const topOfTheStock = stock.slice(1)[0]
    let newCard = {}
    
    if (countCards(computer.hand)[lastCardThrown.value] >= 2) {
      setTimeout(() => takeCard(computer, lastCardThrown, discardPile), 2000)
      newCard = lastCardThrown
    } else {
      setTimeout(() => takeCard(computer, topOfTheStock, stock), 2000)
      newCard = topOfTheStock
    }

    let newHand = [...computer.hand, newCard]
    for (const [key, value] of Object.entries(countCards(newHand))) {
      if (value >= 3) {
        const trioCards = newHand.filter((card) => card.value === Number(key))
        trioCards.map(card => card.staged = true)
        setTimeout(() => checkForTrio(computer, newCard), 2500)
      }
    }

    setTimeout(() => setGameStageIndex(1), 3000)

  }
  
  return (
    <CariocaContext.Provider
      value={{ player, computer, discardPile, stock, gameStageIndex, dealCards, contracts, sortByValue, takeCard, toggleStaged, checkForTrio, throwCard, gameStages }}
    >
      {children}
    </CariocaContext.Provider>
  )
}

export const useCarioca = () => useContext(CariocaContext)

CariocaProvider.propTypes = {
  children: PropTypes.any,
}
