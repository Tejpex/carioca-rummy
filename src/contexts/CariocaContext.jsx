/* eslint-disable react-refresh/only-export-components */
import PropTypes from "prop-types"
import { createContext, useContext, useState } from "react"
import cards from "../cards.json"

const CariocaContext = createContext()

export const CariocaProvider = ({ children }) => {
  const [message, setMessage] = useState()
  const [player, setPlayer] = useState({
    hand: [],
    table: [],
    score: 0
  })

  const [computer, setComputer] = useState({
    hand: [],
    table: [],
    score: 0
  })
  
  const [discardPile, setDiscardPile] = useState([])
  const [stock, setStock] = useState([])

  const contracts = [
    {
      index: 0,
      name: "2 triss",
      trios: 2,
      scalas: 0,
    },
    {
      index: 1,
      name: "1 triss, 1 stege",
      trios: 1,
      scalas: 1,
    },
    {
      index: 2,
      name: "2 stegar",
      trios: 0,
      scalas: 2,
    },
    {
      index: 3,
      name: "3 triss",
      trios: 3,
      scalas: 0,
    },
    {
      index: 4,
      name: "2 triss, 1 stege",
      trios: 2,
      scalas: 1,
    },
    {
      index: 5,
      name: "1 triss, 2 stegar",
      trios: 1,
      scalas: 2,
    },
    {
      index: 6,
      name: "4 triss",
      trios: 4,
      scalas: 0,
    },
    {
      index: 7,
      name: "3 stegar",
      trios: 0,
      scalas: 3,
    }
  ]
  const [contractNumber, setContractNumber] = useState(0)

  const gameStages = ["Dela ut kort", "Ta ett kort", "Spela kort eller släng ett kort", "Datorn spelar"]
  const [gameStageIndex, setGameStageIndex] = useState(0)

  //Helper functions to calculate things
  const countCardsByValue = (cards) => {
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
  
  const sortByValue = (cards) => {
    const sortedCards = [...cards]
    sortedCards.sort((a, b) => a.value - b.value)
    return sortedCards
  }

  const addCardsTogether = (oldCards, newCard) => {
    const newCards = [...oldCards, newCard]
    return newCards
  }

  const checkReachedGoal = (person) => {
    const table = person.table
    let triosReached = 0
    for (const [key, value] of Object.entries(countCardsByValue(table))) {
      if (value >= 3) {
        triosReached += 1
      }
    }
    if (triosReached >= 2) {
      return true
    } else {
      return false
    }
  }

  const countPoints = (person) => {
    let newPoint = 0
    person.hand.forEach((card) => (newPoint += card.value))
    return newPoint
  }

  const somebodyHasWon = (hand) => {
    if (
      hand.length === 0 ||
      player.hand.length === 0 ||
      computer.hand.length === 0
    ) {
      return true
    }
  }

  //Helper functions to move around cards
  const dealCards = () => {
    const deckInPlay = [...cards] //Make copy of all cards to use in play
    const newPlayerCards = [] //Collects players cards
    const newComputerCards = [] //Collects computers cards
    const newDiscardPile = [] //Collects cards in discard pile
    const newStock = [] //Collects cards in stock
    let index = 0 //Counts how many cards have been dealt

    while (index < cards.length) {
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

    setPlayer({ ...player, hand: newPlayerCards, table: []})
    setComputer({ ...computer, hand: newComputerCards, table: []})
    setDiscardPile(newDiscardPile)
    setStock(newStock)
  }

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
  
  const toggleStaged = (person, card) => {
    const hand = person.hand
    const newHand = hand.map((oldCard) =>
      oldCard === card ? { ...oldCard, staged: !oldCard.staged } : oldCard
    )
    setNewHand(person, newHand)
  }

  const moveCardsToHand = (person, card, pile) => {
    const hand = person.hand
    setNewHand(person, addCardsTogether(hand, card))

    const newPile = [...pile]
    if (pile === discardPile) {
      const newDiscard = newPile.toSpliced(-1, 1)
      setDiscardPile(newDiscard)
    } else if (pile === stock) {
      const newStock = newPile.toSpliced(0, 1)
      setStock(newStock)
    }
  }

  const playCards = (person, cards) => {
    const hand = person.hand
    const newHand = [...hand]
    const table = person.table
    const newTable = [...table]

    cards.map((card) => {
      newTable.push(card)
      newHand.splice(newHand.indexOf(card), 1)
    })

    if (person === player) {
      setPlayer({ ...player, hand: newHand, table: newTable })
    } else if (person === computer) {
      setComputer({ ...computer, hand: newHand, table: newTable })
    }
    if (somebodyHasWon(newHand)) {
      handleWin(person, newHand)
    }
  }

  //Functions to handle gameplay
  const startNewGame = () => {
    dealCards()
    setContractNumber(0)
    setGameStageIndex(1)
  }

  const nextContract = () => {
    dealCards()
    setContractNumber(contractNumber + 1)
    setGameStageIndex(1)
    
  }

  const takeCard = (person, card, pile) => {
    moveCardsToHand(person, card, pile)
    setGameStageIndex(2)
  }
  
  

  const checkForTrio = (person) => {
    const hand = person.hand
    const cardsToCheck = hand.filter((card) => card.staged)
    
    if (cardsToCheck.length === 3 && 
      cardsToCheck[0].value === cardsToCheck[1].value && 
      cardsToCheck[1].value === cardsToCheck[2].value) {
        playCards(person, cardsToCheck)
    } else if (checkReachedGoal(person)) {
      const playerTableCount = countCardsByValue(player.table)
      const computerTableCount = countCardsByValue(computer.table)
      let cardsToPlay = []
      cardsToCheck.map((card) => {
        if (playerTableCount[card.value] >= 3) {
          cardsToPlay.push(card)
        } else if (computerTableCount[card.value] >= 3) {
          cardsToPlay.push(card)
        } else {
          alert("Kortet matchar inte något på bordet.")
        }
      })
      playCards(person, cardsToPlay)
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
      if (somebodyHasWon(hand)) {
        handleWin(person, hand)
      } else {
        computerPlay(cardsToThrow[0])
      }   
    } else {
      alert("Välj ett kort att slänga.")
    }
  }

  const handleWin = (person, hand) => {
    const pPoint = countPoints(player)
    const cPoint = countPoints(computer)
    if (person === player && hand.length === 0) {
      setMessage(`Du vann omgången. Datorn fick ${cPoint} poäng.`)
      setComputer({ ...computer, score: cPoint })
    } 
    if (person === computer && hand.length === 0) {
      setMessage(`Datorn vann omgången. Du fick ${pPoint} poäng.`)
      setPlayer({ ...player, score: pPoint })
    }
    setTimeout(() => setMessage(""), 2000)
    setTimeout(() => alert("Next round"), 2100)
  }

  const computerPlay = (lastCardThrown) => {
    // Computers turn starts
    setGameStageIndex(3)

    // Decide which card to pick and pick it
    const topOfTheStock = stock.slice(0)[0]
    let cardPicked = {}
    const newDiscardPile = [...discardPile]

    if (countCardsByValue(computer.hand)[lastCardThrown.value] >= 2) {
      //Two cards in hand with same value as lastCardThrown
      cardPicked = lastCardThrown
    } else {
      cardPicked = topOfTheStock
      //Make sure lastCardThrown stays in discard pile
      newDiscardPile.push(lastCardThrown)
      //Remove top card from stock
      const newStock = [...stock].toSpliced(0, 1)
      setTimeout(() => setStock(newStock), 1500)
    }

    // Decide which cards to play and which to throw
    const newHand = [...computer.hand, cardPicked]
    let trioCards = []
    let singleCards = []
    for (const [key, value] of Object.entries(countCardsByValue(newHand))) {
      if (value >= 3) {
        const sameValueCards = newHand.filter(
          (card) => card.value === Number(key)
        )
        trioCards.push(sameValueCards[0])
        trioCards.push(sameValueCards[1])
        trioCards.push(sameValueCards[2])
      } else if (value === 1) {
        const lonelyCards = newHand.filter((card) => card.value === Number(key))
        singleCards.push(lonelyCards[0]) //For use when throwing away cards
      }
    }

    // Play cards
    const newTable = [...computer.table]
    trioCards.map((card) => {
      newTable.push(card)
      newHand.splice(newHand.indexOf(card), 1)
    })

    // Decide which card to throw and throw it
    if (singleCards.length > 0) {
      singleCards.sort((a, b) => a.value - b.value)
      const highestSingle = singleCards.slice(-1)[0]
      newHand.splice(newHand.indexOf(highestSingle), 1)
      newDiscardPile.push(highestSingle)
    } else {
      // If computer has no singles
      const highestValueCard = sortByValue(newHand).slice(-1)[0]
      newHand.splice(newHand.indexOf(highestValueCard), 1)
      newDiscardPile.push(highestValueCard)
    }

    // Make all changes in hands, piles and on table
    setTimeout(() => setDiscardPile(newDiscardPile), 1500)
    setTimeout(
      () => setComputer({ ...computer, hand: newHand, table: newTable }),
      2000
    )
    if (somebodyHasWon(newHand)) {
      handleWin(computer, newHand)
    } else {
      setTimeout(() => setGameStageIndex(1), 3000)
    }
  }
  
  return (
    <CariocaContext.Provider
      value={{ player, computer, discardPile, stock, gameStageIndex, contracts, contractNumber, startNewGame, sortByValue, takeCard, toggleStaged, checkForTrio, throwCard, gameStages, setNewHand, message }}
    >
      {children}
    </CariocaContext.Provider>
  )
}

export const useCarioca = () => useContext(CariocaContext)

CariocaProvider.propTypes = {
  children: PropTypes.any,
}
