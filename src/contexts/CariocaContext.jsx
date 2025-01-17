/* eslint-disable react-refresh/only-export-components */
import PropTypes from "prop-types"
import { createContext, useContext, useState } from "react"
import cards from "../cards.json"
import testCards from "../testCards.json"

const CariocaContext = createContext()

export const CariocaProvider = ({ children }) => {
  const [message, setMessage] = useState()
  let error = "Inget fel"

  const [player, setPlayer] = useState({
    hand: [],
    trioTable: [],
    triosReached: 0,
    scalaTable: [],
    scalasReached: 0,
    score: null
  })

  const [computer, setComputer] = useState({
    hand: [],
    trioTable: [],
    triosReached: 0,
    scalaTable: [],
    scalasReached: 0,
    score: null
  })
  
  const [discardPile, setDiscardPile] = useState([])
  const [stock, setStock] = useState([])
  // ------------ !!!!! Changed for test-purpose! !!!! -------------
  const contracts = [
    {
      index: 0,
      name: "2 triss",
      trios: 1,
      scalas: 2,
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

  const countCardsBySuit = (cards) => {
    const counterSameSuit = {}
    cards.forEach((card) => {
      if (counterSameSuit[card.suit]) {
        counterSameSuit[card.suit] += 1
      } else {
        counterSameSuit[card.suit] = 1
      }
    })
    return counterSameSuit
  }

  const findHighestValueGap = (cardSet) => {
    const cardsSorted = sortBySuit(cardSet)
    let checkingSuit = "suit"
    let checkingValue = cardsSorted[0].value
    let highestGap = 0
    cardsSorted.forEach((card) => {
      if (card.suit === checkingSuit) {
        if (card.value - checkingValue > highestGap) {
          highestGap = card.value - checkingValue
        }
      } else {
        checkingSuit = card.suit
      }
      checkingValue = card.value
    })
    return highestGap
  }

  const findSinglesInTwoSets = (bigCardSet, smallCardSet) => {
    let singlesInBothSets = []
    // Look at big card set to find single values
    for (const [key, value] of Object.entries(
      countCardsByValue(bigCardSet)
    )) { 
      if (value === 1) {
        // Are cards also found in small set?
        smallCardSet.forEach((card) => {
          if (card.value === Number(key)) {
            singlesInBothSets.push(card)
          }
        })
      }
    }
    console.log("SinglesInBothSets", singlesInBothSets)
    return singlesInBothSets
  }
  
  const sortByValue = (cards) => {
    const sortedCards = [...cards]
    sortedCards.sort((a, b) => a.value - b.value)
    return sortedCards
  }

  const sortBySuit = (cards) => {
    const sortedCards = [...cards]
    sortedCards.sort((a, b) => a.value - b.value)
    sortedCards.sort((a, b) =>
      a.suit > b.suit ? 1 : b.suit > a.suit ? -1 : 0
    )
    return sortedCards
  }

  const addCardsTogether = (oldCards, newCard) => {
    const newCards = [...oldCards, newCard]
    return newCards
  }

  const cardsAreATrio = (cards) => {
    const giveTrioErrors = contracts[contractNumber].trios > player.triosReached
    const equalInValue = (cardSet) => {
      return cardSet.every((card) => card.value === cardSet[0].value)
    }
    
    if (cards.length < 3) {
      error = giveTrioErrors ? "Det behövs minst tre kort för att spela en triss." : error
      return false
    } else if (!equalInValue(cards)) {
      error = giveTrioErrors ? "Korten har inte samma värde." : error
      return false
    } else {
      return true
    }
  }

  const cardsAreAScala = (cards) => {
    const giveScalaErrors = contracts[contractNumber].scalas > player.scalasReached
    const sortedCards = sortByValue(cards)
    const equalSuit = (cardSet) => {
      return cardSet.every((card) => card.suit === cardSet[0].suit)
    }
    const valuesIncreaseByOne = (cardSet) => {
      let checkingValue = cardSet[0].value - 1 // Which value to check against
      let gapCount = 0 // How many gaps are there (one allowed with ace+king)
      cardSet.forEach((card) => {
        if (card.value === checkingValue + 1) {
          checkingValue = card.value // Value approved, increase checking value
        } else {
          if (cardSet[0].value === 1 && cardSet[cardSet.length - 1].value === 13 && gapCount === 0) {
            gapCount += 1
            checkingValue = card.value
          } else {
            return false
          }
        }
      })
      
      if (checkingValue === cardSet[cardSet.length - 1].value) {
        return true // Last checking value is same as last card
      }     
    }

    if (cards.length < 4) {
      error = giveScalaErrors ? "Det behövs minst fyra kort för att spela en stege." : error
      return false
    } else if (!equalSuit(sortedCards)) {
      error = giveScalaErrors ? "Korten har inte samma färg." : error
      return false
    } else if (!valuesIncreaseByOne(sortedCards)) {
      error = giveScalaErrors ? "Korten bildar inte en stege." : error
      return false
    } else {
      return true
    }
  }

  const cardMatchesAScala = (newCard, cardSet) => {
    if (cardSet.length === 0) { // No existing scalas
      return false
    } 

    let checkingValue = cardSet[0].value - 1 // Which value to check against
    if (newCard.value === checkingValue) {
      return true // New card one lower than first scala, approved
    } else {
      cardSet.forEach((card) => {
        if (card.value === checkingValue + 1) {
          checkingValue = card.value // Card on table part of existing scala
        } else if (newCard.value === checkingValue + 1) {
          return true // New card one higher than scala on table, approved
        } else {
          checkingValue = card.value // Looking at next scala on table
          if (newCard.value === checkingValue - 1) {
            return true // New card one lower than next scala, approved
          }
        }
      })   
    }

    if (newCard.value === checkingValue +1) {
      return true // New card one higher than last scala on table, approved
    } else {
      return false    
    }
  }

  const cardIsAlmostPartOfScala = (cardToCheck, cardSet, allowedGap) => {
    const cardSetSorted = sortBySuit(cardSet)
    let checkingSuit = cardSetSorted[0].suit // Which suit to check against
    let checkingValue = cardSetSorted[0].value // Which value to check against
    let returnStatement = false

    if (
      cardToCheck.suit === checkingSuit &&
      checkingValue - cardToCheck.value > 0 &&
      checkingValue - cardToCheck.value <= allowedGap
    ) {
      returnStatement = true // New card slightly lower value than first card, approved
    }

    cardSetSorted.forEach((card) => { 
      // console.log("Testing new", cardToCheck, "against old", card, "Suit", checkingSuit, "Value",checkingValue)
      if (card.suit === checkingSuit) { // Card in set still on same suit
        if (card.value - checkingValue <= 1) { 
          checkingValue = card.value // Card in set doesn't need new card
        } else if (
          cardToCheck.suit === checkingSuit &&
          cardToCheck.value - checkingValue > 0 &&
          cardToCheck.value - checkingValue <= allowedGap
        ) {
          returnStatement = true // New card slightly higher value than last card, approved
        } else {
          checkingValue = card.value // Looking at higher value card in set
          if (
            cardToCheck.suit === checkingSuit &&
            checkingValue - cardToCheck.value > 0 &&
            checkingValue - cardToCheck.value <= allowedGap
          ) {
            returnStatement = true // New card slightly lower than higher value card, approved
          }
        }
      } else {
        if (
          cardToCheck.suit === checkingSuit &&
          cardToCheck.value - checkingValue > 0 &&
          cardToCheck.value - checkingValue <= allowedGap
        ) {
          returnStatement = true // New card slightly higher value than last card, approved
        } else {
          checkingSuit = card.suit
          checkingValue = card.value
          if (
            cardToCheck.suit === checkingSuit &&
            checkingValue - cardToCheck.value > 0 &&
            checkingValue - cardToCheck.value <= allowedGap
          ) {
            returnStatement = true // New card slightly lower than new suit card, approved
          }
        }
      }
    })

    if (
      cardToCheck.suit === checkingSuit &&
      cardToCheck.value - checkingValue > 0 &&
      cardToCheck.value - checkingValue <= allowedGap
    ) {
      returnStatement = true // New card slightly higher than last card in cardSet, approved
    }

    return returnStatement
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
  const dealCards = (pScore, cScore) => {
    //const deckInPlay = [...testCards] // Cards for testing
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

    setPlayer({
      ...player,
      hand: newPlayerCards,
      trioTable: [],
      triosReached: 0,
      scalaTable: [],
      scalasReached: 0,
      score: pScore,
    })
    setComputer({
      ...computer,
      hand: newComputerCards,
      trioTable: [],
      triosReached: 0,
      scalaTable: [],
      scalasReached: 0,
      score: cScore,
    })
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

  //Functions to handle gameplay
  const startNewGame = () => {
    dealCards(0, 0)
    setContractNumber(0)
    setGameStageIndex(1)
  }

  const nextContract = (pScore, cScore) => {
    dealCards(pScore, cScore)
    setContractNumber(contractNumber + 1)
    setGameStageIndex(1)   
  }

  const takeCard = (person, card, pile) => {
    moveCardsToHand(person, card, pile)
    setGameStageIndex(2)
  }

  const tryToPlayCards = (person) => {
    // Card sets already in play
    const hand = person.hand
    const ownTrioTable = person.trioTable
    const ownScalaTable = person.scalaTable
    const opponentTrioTable = person === player ? computer.trioTable : player.trioTable
    const opponentScalaTable = person === player ? computer.scalaTable : player.scalaTable
    const cardsToCheck = hand.filter((card) => card.staged)

    // New card sets
    const newHand = [...hand]
    const newOwnTrioTable = [...ownTrioTable]
    const newOwnScalaTable = [...ownScalaTable]
    const newOpponentTrioTable = [...opponentTrioTable]
    const newOpponentScalaTable = [...opponentScalaTable]

    // Keep track of goals
    let trioCount = person.triosReached
    let scalaCount = person.scalasReached

    // Which cards goes where
    if (
      cardsAreATrio(cardsToCheck) &&
      contracts[contractNumber].trios > trioCount
    ) { // Play trio
      cardsToCheck.map((card) => {
        newOwnTrioTable.push(card)
        newHand.splice(newHand.indexOf(card), 1)
      })
      trioCount += 1
    } else if (
      cardsAreAScala(cardsToCheck) &&
      contracts[contractNumber].scalas > scalaCount
    ) { //Play scala
      cardsToCheck.map((card) => {
        newOwnScalaTable.push(card)
        newHand.splice(newHand.indexOf(card), 1)
      })
      scalaCount += 1
    } else if ( // Goal is reached
      person.triosReached >= contracts[contractNumber].trios &&
      person.scalasReached >= contracts[contractNumber].scalas
    ) {
      cardsToCheck.map((card) => {
        if (ownTrioTable.some(c => c.value === card.value)) { // Matches own trios
          newOwnTrioTable.push(card)
          newHand.splice(newHand.indexOf(card), 1)
        } else if (opponentTrioTable.some((c) => c.value === card.value)) { // Matches opponents trios
          newOpponentTrioTable.push(card)
          newHand.splice(newHand.indexOf(card), 1)
        } else if (cardMatchesAScala(card, ownScalaTable)) { // Matches own scalas
          newOwnScalaTable.push(card)
          newHand.splice(newHand.indexOf(card), 1)
        } else if (cardMatchesAScala(card, opponentScalaTable)) { // Matches opponents scalas
          newOpponentScalaTable.push(card)
          newHand.splice(newHand.indexOf(card), 1)
        } else {
          setMessage("Korten matchar inte något på bordet.")
          setTimeout(() => setMessage(""), 3000)
        }
      })
    } else {
      setMessage(error)
      setTimeout(() => setMessage(""), 3000)
    }

    if (person === player) {
      setPlayer({
        ...player,
        hand: newHand,
        trioTable: sortByValue(newOwnTrioTable),
        triosReached: trioCount,
        scalaTable: sortBySuit(newOwnScalaTable),
        scalasReached: scalaCount
      })
      setComputer({
        ...computer,
        trioTable: sortByValue(newOpponentTrioTable),
        scalaTable: sortBySuit(newOpponentScalaTable),
      })
    } else {
      setComputer({
        ...computer,
        hand: newHand,
        trioTable: sortByValue(newOwnTrioTable),
        triosReached: trioCount,
        scalaTable: sortBySuit(newOwnScalaTable),
        scalasReached: scalaCount,
      })
      setPlayer({
        ...player,
        trioTable: sortByValue(newOpponentTrioTable),
        scalaTable: sortBySuit(newOpponentScalaTable),
      })
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
    let newPlayerScore = player.score
    let newComputerScore = computer.score 
    if (person === player && hand.length === 0) {
      setMessage(`Du vann omgången. Datorn fick ${countPoints(computer)} poäng.`) 
      newComputerScore += countPoints(computer)
    } 
    if (person === computer && hand.length === 0) {
      setMessage(`Datorn vann omgången. Du fick ${countPoints(player)} poäng.`)  
      newPlayerScore += countPoints(player)
    }
    setTimeout(() => setMessage(""), 2000)
    setTimeout(() => nextContract(newPlayerScore, newComputerScore), 2100)
  }

  const computerPlay = (lastCardThrown) => {
    // Computers turn starts
    setGameStageIndex(3)

    // Starting values
    const topOfTheStock = stock.slice(0)[0]
    let cardPicked = {}
    const newDiscardPile = [...discardPile]
    const newHand = [...computer.hand]
    let throwAwayCard = {}

    // Gamplay depending on goal
    // Scalas are a goal
    if (contracts[contractNumber].scalas > computer.scalasReached) { 
      console.log("Scalas are goal")

      // Decide which card to pick and pick it
      if (cardIsAlmostPartOfScala(lastCardThrown, computer.hand, 2)) {
        cardPicked = lastCardThrown
      } else {
        cardPicked = topOfTheStock
        //Make sure lastCardThrown stays in discard pile
        newDiscardPile.push(lastCardThrown)
        //Remove top card from stock
        const newStock = [...stock].toSpliced(0, 1)
        setTimeout(() => setStock(newStock), 1500)
      }
      newHand.push(cardPicked)

      // Decide which card to throw
      // Step 1: Find singles according to suit
      let singleCards = []
      for (const [key, value] of Object.entries(countCardsBySuit(newHand))) {
        if (value === 1) {
          const lonelyCard = newHand.filter(
            (card) => card.suit === key
          )
          singleCards.push(lonelyCard[0])
        }
      }
      console.log("Singles", singleCards)
      // Step 2: Try to find a throw-card amongst the singles
      if (singleCards.length > 0) {
        singleCards.sort((a, b) => a.value - b.value)
        if (contracts[contractNumber].trios > computer.triosReached) {
          // Trios is also a goal - look at card value and find singles in both suit and value
          // If such cards are fund, set the highest to throw away
          let cardsLonelyInValue = []
          for (const [key, value] of Object.entries(
            countCardsByValue(newHand)
          )) { // Look at entire hand to find single values
            if (value === 1) {
              // Look in singleCards to find matches
              singleCards.forEach((card) => {
                if (card.value === Number(key)) {
                  cardsLonelyInValue.push(card)
                }
              })
            }
          }
          console.log("CardsLonelyInValue", cardsLonelyInValue)
          if (cardsLonelyInValue.length > 0) {
            // Some cards are lonely in both suit and value - throw away highest
            cardsLonelyInValue.sort((a, b) => a.value - b.value)
            throwAwayCard = cardsLonelyInValue[cardsLonelyInValue.length - 1]
            console.log("Throw away(Lonely in value):", throwAwayCard)
          }
        } else {
          // Trios is not a goal - throw away highest single
          throwAwayCard = singleCards[singleCards.length - 1]
          console.log("Throw away(No trio goal):", throwAwayCard)
        }
      } 
      // Step 3: If no throw-card is set, find throw-card in onother way
      if (throwAwayCard == {}) {
        console.log("No throw-away yet.")
        // Find cards with high value-gaps an put in maybe-pile
        const highestGap = findHighestValueGap(newHand)
        console.log("Gap", highestGap)
        let cardsWeMightThrow = []
        newHand.forEach((card) => {
          const testHand = newHand.filter((c) => c != card)
          if (!cardIsAlmostPartOfScala(card, testHand, highestGap - 1)) {
            cardsWeMightThrow.push(card)
          }
        })
        console.log("Maybe-pile", cardsWeMightThrow)
        // Use maybe-pile to decide which card to throw
        // if Trio is goal find the singles and throw the highest
        // Trio is not a goal
        cardsWeMightThrow.sort((a, b) => a.value - b.value)
        throwAwayCard = cardsWeMightThrow[cardsWeMightThrow.length - 1]
        console.log("Throw away(Highest of highest gap):", throwAwayCard)
      }
      

    }
    // Trios are the only goal 
    else if (contracts[contractNumber].trios > computer.triosReached) {
      // Decide which card to pick and pick it
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
      newHand.push(cardPicked)
    }

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
          const lonelyCards = newHand.filter(
            (card) => card.value === Number(key)
          )
          singleCards.push(lonelyCards[0]) //For use when throwing away cards
        }
      }

      // Play cards
      const newTable = [...computer.trioTable]
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
      () => setComputer({ ...computer, hand: newHand, trioTable: newTable }),
      2000
    )
    if (somebodyHasWon(newHand)) {
      handleWin(computer, newHand)
    } else {
      setTimeout(() => setGameStageIndex(1), 2500)
    }
  }
  
  return (
    <CariocaContext.Provider
      value={{ player, computer, discardPile, stock, gameStageIndex, contracts, contractNumber, startNewGame, sortByValue, sortBySuit, takeCard, toggleStaged, tryToPlayCards, throwCard, gameStages, setNewHand, message, setMessage }}
    >
      {children}
    </CariocaContext.Provider>
  )
}

export const useCarioca = () => useContext(CariocaContext)

CariocaProvider.propTypes = {
  children: PropTypes.any,
}
