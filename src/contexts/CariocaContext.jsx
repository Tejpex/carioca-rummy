/* eslint-disable react-refresh/only-export-components */
import PropTypes from "prop-types"
import { createContext, useContext, useState } from "react"
import cards from "../cards.json"
import testCards from "../testCards.json"

import { 
  sortByValue, 
  sortBySuit, 
  sortCards, 
  countCardsBySuit, 
  countCardsByValue, 
  countPoints, 
  dealCards,
  makeAScala 
} from "../cardFunctions"

const CariocaContext = createContext()

export const CariocaProvider = ({ children }) => {
  const [testMode, setTestMode] = useState(false)
  const cardsInUse = cards // Change between cards or testCards for testing
  const [showRules, setShowRules] = useState(false)
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

  const [sortingOn, setSortingOn] = useState("off")
  
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
    return singlesInBothSets
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

  const cardsAreAScala = (cards, person) => {
    const giveScalaErrors = contracts[contractNumber].scalas > player.scalasReached && person === player
    
    const result = makeAScala(cards)
    if (!result.success) {
      const errorsTranslated = {
        1: "Det behövs minst fyra kort för att spela en stege.",
        2: "Korten har inte samma färg.",
        3: "Korten bildar inte en stege.",
        4: "Korten bildar inte en stege.",
      }
      error = giveScalaErrors ? errorsTranslated[result.errorCode] : error
      return { success: false }
    } else {
      return { success: true, scala: result.scala }
    }
  }

  const cardMatchesAScala = (newCard, scalaTable) => {
    if (scalaTable.length === 0) { // Nothing to check against
      return { success: false }
    } 
    
    let newScala = []
    let index = scalaTable.length
      
    for (let i = 0; i < scalaTable.length; i++) {
      const result = makeAScala([...scalaTable[i], newCard])
      if (result.success) {
        newScala = result.scala
        index = i
        break
      }
    }

    if (index === scalaTable.length) {
      return { success: false }
    } else {
      const newScalaTable = [...scalaTable]
      newScalaTable[index] = newScala
      return { success: true, table: newScalaTable }
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
      checkingValue - cardToCheck.value < allowedGap
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

  const somebodyHasWon = (hand) => {
    if (
      hand.length === 0 ||
      player.hand.length === 0 ||
      computer.hand.length === 0
    ) {
      return true
    }
  }

  const cardMatchesSomethingOnTable = (card, ownTrios, opponentTrios, ownScalas, opponentScalas) => {
    if (
      ownTrios.some((c) => c.value === card.value) || //Matches own trios
      opponentTrios.some((c) => c.value === card.value) || // Matches opponent trios
      cardMatchesAScala(card, ownScalas).success || // Matches own scalas
      cardMatchesAScala(card, opponentScalas).success // Matches opponent scalas
    ) {
      return true
    }
  }

  //Helper functions to move around cards
  const setNewHand = (person, newHand) => {
    if (person === player) {
      setPlayer({ ...player, hand: newHand })
    } else if (person === computer) {
      setComputer({ ...computer, hand: newHand })
    }
  }
  
  const toggleStaged = (person, card) => {
    if (person !== computer) {
      const hand = person.hand
      const newHand = hand.map((oldCard) =>
        oldCard === card ? { ...oldCard, staged: !oldCard.staged } : oldCard
      )
      setNewHand(person, newHand)
    }
  }

  const moveCardsToHand = (person, card, pile) => {
    const newHand = [...person.hand, card]
    setNewHand(person, sortCards(newHand, sortingOn))

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
    const deal = dealCards(cardsInUse, 12)
    setPlayer({
      ...player,
      hand: sortCards(deal.firstPlayerCards, sortingOn),
      trioTable: [],
      triosReached: 0,
      scalaTable: [],
      scalasReached: 0,
      score: 0,
    })      
    setComputer({
      ...computer,
      hand: sortCards(deal.secondPlayerCards, sortingOn),
      trioTable: [],
      triosReached: 0,
      scalaTable: [],
      scalasReached: 0,
      score: 0,
    })
    setDiscardPile(deal.discardPile)
    setStock(deal.stock)
    setContractNumber(0)
    setGameStageIndex(1)
  }

  const nextContract = (pScore, cScore) => {
    const deal = dealCards(cardsInUse, 12)
    setPlayer({
      ...player,
      hand: sortCards(deal.firstPlayerCards, sortingOn),
      trioTable: [],
      triosReached: 0,
      scalaTable: [],
      scalasReached: 0,
      score: pScore,
    })
    setComputer({
      ...computer,
      hand: sortCards(deal.secondPlayerCards, sortingOn),
      trioTable: [],
      triosReached: 0,
      scalaTable: [],
      scalasReached: 0,
      score: cScore,
    })
    setDiscardPile(deal.discardPile)
    setStock(deal.stock)
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
    let newOwnScalaTable = [...ownScalaTable]
    const newOpponentTrioTable = [...opponentTrioTable]
    let newOpponentScalaTable = [...opponentScalaTable]

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
      cardsAreAScala(cardsToCheck, player).success &&
      contracts[contractNumber].scalas > scalaCount
    ) { //Play scala
      newOwnScalaTable.push(cardsAreAScala(cardsToCheck, player).scala)
      cardsToCheck.map((card) => {
        newHand.splice(newHand.indexOf(card), 1)
      })
      scalaCount += 1
    } else if ( // Goal is reached
      person.triosReached >= contracts[contractNumber].trios &&
      person.scalasReached >= contracts[contractNumber].scalas
    ) {
      cardsToCheck.map((card) => {
        let cardIsAMatch = false
        
        // Check for match with trios
        if (newOwnTrioTable.some(c => c.value === card.value)) { // Matches own trios
          newOwnTrioTable.push(card)
          cardIsAMatch = true
        } else if (newOpponentTrioTable.some((c) => c.value === card.value)) { // Matches opponents trios
          newOpponentTrioTable.push(card)
          cardIsAMatch = true
        } else if (cardMatchesAScala(card, newOwnScalaTable).success) { // Matches own scalas
          newOwnScalaTable = cardMatchesAScala(card, newOwnScalaTable).table
          cardIsAMatch = true
        } else if (cardMatchesAScala(card, newOpponentScalaTable).success) { // Matches opponents scalas
          newOpponentScalaTable = cardMatchesAScala(card, newOpponentScalaTable).table
          cardIsAMatch = true
        }
        
        // If card is a match, remove it from hand
        if (cardIsAMatch) {
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
        scalaTable: newOwnScalaTable,
        scalasReached: scalaCount
      })
      setComputer({
        ...computer,
        trioTable: sortByValue(newOpponentTrioTable),
        scalaTable: newOpponentScalaTable,
      })
    } else {
      setComputer({
        ...computer,
        hand: newHand,
        trioTable: sortByValue(newOwnTrioTable),
        triosReached: trioCount,
        scalaTable: newOwnScalaTable,
        scalasReached: scalaCount,
      })
      setPlayer({
        ...player,
        trioTable: sortByValue(newOpponentTrioTable),
        scalaTable: newOpponentScalaTable,
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
      setMessage("Välj ett kort att slänga.")
      setTimeout(() => setMessage(""), 3000)
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
    const newDiscardPile = [...discardPile]
    const newHand = [...computer.hand]
    const newTrioTable = [...computer.trioTable]
    let newScalaTable = [...computer.scalaTable]
    let scalaCount = computer.scalasReached
    let trioCount = computer.triosReached
    const newPlayerTrioTable = [...player.trioTable]
    let newPlayerScalaTable = [...player.scalaTable]

    // Decide which card to pick and pick it
    let cardPicked = {}
    if (
      contracts[contractNumber].scalas > scalaCount && // Scalas are a goal
      cardIsAlmostPartOfScala(lastCardThrown, computer.hand, 2) // Last card thrown matches scala on hand
    ) {
      cardPicked = lastCardThrown
    } else if (
      contracts[contractNumber].scalas <= scalaCount && // Scalas are not a goal
      contracts[contractNumber].trios > trioCount && //Trios are a goal
      countCardsByValue(computer.hand)[lastCardThrown.value] >= 2 //Two cards in hand has same value as lastCardThrown
    ) {
      cardPicked = lastCardThrown
    } else if (
      trioCount >= contracts[contractNumber].trios &&
      scalaCount >= contracts[contractNumber].scalas && // All goals reached
      cardMatchesSomethingOnTable(
        lastCardThrown,
        newTrioTable,
        newPlayerTrioTable,
        newScalaTable,
        newPlayerScalaTable
      ) // Last card thrown matches something on table
    ) {
      cardPicked = lastCardThrown
    } else { // Pick top card from stock
      cardPicked = topOfTheStock
      //Make sure lastCardThrown stays in discard pile
      newDiscardPile.push(lastCardThrown)
      //Remove top card from stock
      const newStock = [...stock].toSpliced(0, 1)
      setTimeout(() => setStock(newStock), 1500)
    }
    newHand.push(cardPicked)

    // Find which cards to play and move them from hand to table
    let trioCards = []
    let singleCards = []
    // Scalas are a goal
    if (contracts[contractNumber].scalas > computer.scalasReached) {
      // Step 1: Check each suit to see if there is at least four cards
      const scalaContenders = []
      for (const [key, value] of Object.entries(countCardsBySuit(newHand))) {
        if (value >= 4) {
          // If suit has min four cards push it as array to scalaContenders
          const sameSuitCards = newHand.filter((card) => card.suit === key)
          scalaContenders.push(sameSuitCards)
        }
      }
      // Step 2: Go through each suit and find cards to play
      scalaContenders.forEach((suit) => {
        // Remove cards of same value from suit
        for (const [key, value] of Object.entries(countCardsByValue(suit))) {
          if (value >= 2) {
            const doubleCards = suit.filter(
              (card) => card.value === Number(key)
            )
            for (let i = 1; i < doubleCards.length; i++) {
              suit.splice(suit.indexOf(doubleCards[i]), 1)
            }
          }
        }
        // Test each set of four cards in the suit to see if they are a scala
        suit.sort((a, b) => b.value - a.value)
        suit.forEach((c) => {
          const testCards = suit.slice(0, 4)
          // If cards are a scala, put them on table (but only if they're not already there)
          const result = cardsAreAScala(testCards)
          if (result.success) {
            newScalaTable.push(result.scala)
            testCards.forEach((card) => {
              newHand.splice(newHand.indexOf(card), 1)
              suit.splice(suit.indexOf(card), 1)
            })
            scalaCount++ // Count number of scalas played
          } else {
            // If cards are not a scala, remove the highest card and test again
            suit.splice(0, 1)
          }
        })
      })
    }
    // Trios are the only goal
    else if (contracts[contractNumber].trios > computer.triosReached) {
      // Find all trios and all single cards according to value
      // Singles are used later in throw-away-process
      for (const [key, value] of Object.entries(countCardsByValue(newHand))) {
        if (value >= 3) {
          const sameValueCards = newHand.filter(
            (card) => card.value === Number(key)
          )
          // Push three cards with same value to trioCards
          trioCards.push(sameValueCards[0])
          trioCards.push(sameValueCards[1])
          trioCards.push(sameValueCards[2])
          trioCount++
        } else if (value === 1) {
          const lonelyCards = newHand.filter(
            (card) => card.value === Number(key)
          )
          singleCards.push(lonelyCards[0]) //For use when throwing away cards
        }
      }

      // Play trio cards
      trioCards.map((card) => {
        newTrioTable.push(card)
        newHand.splice(newHand.indexOf(card), 1)
      })
    }
    // Goal has been reached before turn started or during turn
    if (
      trioCount >= contracts[contractNumber].trios &&
      scalaCount >= contracts[contractNumber].scalas
    ) {
      // Go through hand and play cards that match something on table
      newHand.map((card) => {
        if (newTrioTable.some((c) => c.value === card.value)) {
          // Matches own trios
          newTrioTable.push(card)
          newHand.splice(newHand.indexOf(card), 1)
        } else if (newPlayerTrioTable.some((c) => c.value === card.value)) {
          // Matches player trios
          newPlayerTrioTable.push(card)
          newHand.splice(newHand.indexOf(card), 1)
        } else if (cardMatchesAScala(card, newScalaTable).success) {
          // Matches own scalas
          newScalaTable = cardMatchesAScala(card, newScalaTable).table
          newHand.splice(newHand.indexOf(card), 1)
        } else if (cardMatchesAScala(card, newPlayerScalaTable).success) {
          // Matches opponents scalas
          newPlayerScalaTable = cardMatchesAScala(card, newPlayerScalaTable).table
          newHand.splice(newHand.indexOf(card), 1)
        }
      })
    }

    // Decide which card to throw
    let throwAwayCard = {}
    // Scalas are a goal
    if (contracts[contractNumber].scalas > scalaCount) {
      // Step 1: Find singles according to suit
      let singleCardsAccordingToSuit = []
      for (const [key, value] of Object.entries(countCardsBySuit(newHand))) {
        if (value === 1) {
          const lonelyCard = newHand.filter((card) => card.suit === key)
          singleCardsAccordingToSuit.push(lonelyCard[0])
        }
      }
      // Step 2: Try to find a throw-card amongst the singles
      if (singleCardsAccordingToSuit.length > 0) {
        if (contracts[contractNumber].trios > computer.triosReached) {
          // Trios is also a goal - compare single suit cards to all of hand to see if they are also singles in value
          const cardsLonelyInValueAndSuit = findSinglesInTwoSets(
            newHand,
            singleCardsAccordingToSuit
          )
          if (cardsLonelyInValueAndSuit.length > 0) {
            // Some cards are lonely in both suit and value - throw away highest
            console.log("Lonely in both suit and value", cardsLonelyInValueAndSuit)
            throwAwayCard = sortByValue(cardsLonelyInValueAndSuit)[
              cardsLonelyInValueAndSuit.length - 1
            ]
          }
        } else {
          // Trios is not a goal - throw away highest single
          console.log("Lonely in suit", singleCardsAccordingToSuit)
          throwAwayCard =
            singleCardsAccordingToSuit[singleCardsAccordingToSuit.length - 1]
        }
      }
      // Step 3: If no throw-card is set, find throw-card in onother way
      if (Object.keys(throwAwayCard).length === 0) {
        // Find cards with high value-gaps an put in maybe-pile
        const highestGap = findHighestValueGap(newHand) // Number that defines highest gap
        let cardsWeMightThrow = []
        newHand.forEach((card) => {
          const testHand = newHand.filter((c) => c != card)
          if (!cardIsAlmostPartOfScala(card, testHand, highestGap - 1)) {
            cardsWeMightThrow.push(card)
          }
        })
        // Use maybe-pile to decide which card to throw
        if (contracts[contractNumber].trios > computer.triosReached) {
          // Trios is also a goal - look at card value and find singles in value
          const singlesAmongstMaybes = findSinglesInTwoSets(
            newHand,
            cardsWeMightThrow
          )
          if (singlesAmongstMaybes.length > 0) {
            // Some maybe-cards are lonely in value - throw away highest
            console.log("Maybe-cards lonely in value", singlesAmongstMaybes)
            throwAwayCard =
              sortByValue(singlesAmongstMaybes)[singlesAmongstMaybes.length - 1]
          } else {
            // No maybes are singles - throw away highest anyway
            console.log("Highest amongst maybes, no singles", cardsWeMightThrow)
            throwAwayCard =
              sortByValue(cardsWeMightThrow)[cardsWeMightThrow.length - 1]
          }
        } else {
          // Trio is not a goal - throw away highest maybe-card
          console.log("Highest amongst maybes, no trio-goal", cardsWeMightThrow)
          throwAwayCard =
            sortByValue(cardsWeMightThrow)[cardsWeMightThrow.length - 1]
        }
      }
    }
    // Trios are the only goal and there are single cards
    else if (contracts[contractNumber].trios > trioCount && singleCards.length > 0) {
      // Throw away highest single
      const highestSingle = sortByValue(singleCards).slice(-1)[0]
      console.log("Trios only goal, throwing away highest single", singleCards)
      throwAwayCard = highestSingle
    } 
    // Still no throw-away-card? 
    if (!throwAwayCard || Object.keys(throwAwayCard).length === 0) {
      // Throw away highest card
      const highestValueCard = sortByValue(newHand).slice(-1)[0]
      throwAwayCard = highestValueCard
    }
    
    // Throw away throwAwayCard
    console.log("Throwing away", throwAwayCard)
    newHand.splice(newHand.indexOf(throwAwayCard), 1)
    newDiscardPile.push(throwAwayCard)

    // Make all changes in hands, piles and on table
    setTimeout(() => setDiscardPile(newDiscardPile), 1500)
    setTimeout(() => {
      setComputer({
        ...computer,
        hand: sortCards(newHand, sortingOn),
        trioTable: sortByValue(newTrioTable),
        scalaTable: newScalaTable,
        triosReached: trioCount,
        scalasReached: scalaCount,
      })
      setPlayer({
        ...player,
        trioTable: sortByValue(newPlayerTrioTable),
        scalaTable: newPlayerScalaTable,
      })
    }, 2000)
    if (somebodyHasWon(newHand)) {
      handleWin(computer, newHand)
    } else {
      setTimeout(() => setGameStageIndex(1), 2500)
    }
  }
  
  return (
    <CariocaContext.Provider
      value={{ player, computer, discardPile, stock, gameStageIndex, contracts, contractNumber, startNewGame, sortByValue, sortBySuit, takeCard, toggleStaged, tryToPlayCards, throwCard, gameStages, setNewHand, message, setMessage, setSortingOn, testMode, setTestMode, showRules, setShowRules }}
    >
      {children}
    </CariocaContext.Provider>
  )
}

export const useCarioca = () => useContext(CariocaContext)

CariocaProvider.propTypes = {
  children: PropTypes.any,
}
