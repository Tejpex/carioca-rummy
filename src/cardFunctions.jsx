// Sorting cards

/**
 * Sort cards in ascending order by the value on the card
 * @param  {Array} cards The cards that need sorting
 * @return {Array}      The cards in sorted order
 */
export const sortByValue = (cards) => {
  const sortedCards = [...cards]
  sortedCards.sort((a, b) => a.value - b.value)
  return sortedCards
}

/**
 * Sort cards in ascending order by both value and the suit on the card
 * @param  {Array} cards The cards that need sorting
 * @return {Array}      The cards in sorted order
 */
export const sortBySuit = (cards) => {
  const sortedCards = [...cards]
  sortedCards.sort((a, b) => a.value - b.value)
  sortedCards.sort((a, b) => (a.suit > b.suit ? 1 : b.suit > a.suit ? -1 : 0))
  return sortedCards
}

/**
 * Sort cards according to the sorting mode
 * @param  {Array} cards The cards that need sorting
 * @param  {String} sortingMode The mode of sorting that should be used "value" or "suit"
 * @return {Array}      The cards in sorted order
 */
export const sortCards = (cards, sortingMode) => {
  if (sortingMode === "value") {
    return sortByValue(cards)
  } else if (sortingMode === "suit") {
    return sortBySuit(cards)
  } else {
    return cards
  }
}

// Counting cards
/**
 * Count how many cards there are of each value
 * @param  {Array} cards The cards that should be counted
 * @return {Object}      Object where keys are card-values and values are the count
 */
export const countCardsByValue = (cards) => {
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

/**
 * Count how many cards there are in each suit
 * @param  {Array} cards The cards that should be counted
 * @return {Object}      Object where keys are suits and values are how many
 */
export const countCardsBySuit = (cards) => {
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


// Count points
/**
 * Count the sum of the card values for a persons hand
 * @param  {Object} person The person whose cards should be counted 
 * @return {Number}      Number of points person has in the hand
 */
export const countPoints = (person) => {
  let newPoint = 0
  person.hand.forEach((card) => (newPoint += card.value))
  return newPoint
}

// Deal cards
/**
 * Deal cards to two players, then put next card face up on the table
 * and the rest in the stock
 * @param  {Array} deck The deck of cards used in the game
 * @param  {Number} numberOfCardsToEach How many cards each player should get
 * @return {Object}      Object with firstPlayerCards, secondPlayerCards, discardPile and stock
 */
export const dealCards = (deck, numberOfCardsToEach) => {
  const deckLength = deck.length
  const deckInUse = [...deck]
  const firstPlayerCards = [] //Collects first players cards
  const secondPlayerCards = [] //Collects next players cards
  const discardPile = [] //Collects cards in discard pile
  const stock = [] //Collects cards in stock

  let index = 0 //Counts how many cards have been dealt
  while (index < deckLength) {
    // Take cards in random order from deck
    const card = deckInUse[Math.floor(Math.random() * deckInUse.length)]

    if (index === numberOfCardsToEach * 2) {
      // Puts card face up on table after dealing numberOfCardsToEach player
      discardPile.push(card)
    } else if (index > numberOfCardsToEach * 2) {
      // Puts last cards in the stock
      stock.push(card)
    } else if (index % 2 === 0) {
      // Deals every second card to first player (even-number under numberOfCardsToEach)
      firstPlayerCards.push(card)
    } else {
      // Deals every other card to second player (odd-number under numberOfCardsToEach)
      secondPlayerCards.push(card)
    }
    deckInUse.splice(deckInUse.indexOf(card), 1)
    index++
  }

  return { firstPlayerCards, secondPlayerCards, discardPile, stock }
}


// Check cards
/**
 * Check if all cards are of the same suit
 * @param  {Array} cards The cards that should be checked
 * @return {Boolean}      True if all cards are of the same suit, false otherwise
 */
const equalSuit = (cardSet) => {
  return cardSet.every((card) => card.suit === cardSet[0].suit)
}

/**
 * Check to see how many cards can make a scala
 * @param  {Array} cards The cards that should be checked
 * @return {Number}      The legnth of the scala possible to make
 */
const lengthOfScalaPossible = (cards) => {
  if (cards.length === 0) return 0 // Handle empty array

  const sortedCards = sortByValue(cards)
  let checkingValue = sortedCards[0].value // Which value to check against
  let scalaLength = 0 // How long the scala is

  for (let i = 0; i < sortedCards.length; i++) {
    if (sortedCards[i].value === checkingValue) { // Value approved, increase scala length and checking value
      scalaLength++
      checkingValue++
      // Check for duplicates and break if found
      if (i + 1 < sortedCards.length && sortedCards[i + 1].value === sortedCards[i].value) {
        break // Break on duplicate cards
      }
    } else {
      break // Break when the sequence is broken
    }
  }
  return scalaLength
}

// Make a scala
/**
 * Check if the cards can form a scala
 * @param  {Array} cards The cards that should be checked
 * @return {Object}      Object with success-status, errorCode, message and possible scala
 */
export const makeAScala = (cards) => {
  if (cards.length < 4) {
    // Not enough cards for a scala
    return {
      success: false,
      errorCode: 1,
      message: "Not enough cards for a scala",
      scala: null,
    }
  } 
  if (!equalSuit(cards)) {
    // Not all cards are of the same suit
    return {
      success: false,
      errorCode: 2,
      message: "Not all cards are of the same suit",
      scala: null,
    }
  }  

  // Divide cards into possible scalas
  const scalaContenders = sortByValue(cards) // Possible scala contenders
  const scalaResults = [] // Scala contenders divided into scalas
  while (scalaContenders.length > 0) {
    const length = lengthOfScalaPossible(scalaContenders) // Length of possible scala
    if (length === 0) break // Break if no scala possible
    scalaResults.push(scalaContenders.slice(0, length)) // Push possible scala to results
    scalaContenders.splice(0, length) // Remove scala from contenders
  }

  if (scalaResults.length === 0) {
    return {
      success: false,
      errorCode: 3,
      message: "No valid scala found",
      scala: null,
    }
  }

  const firstArray = scalaResults[0] || []
  const lastArray = scalaResults[scalaResults.length - 1] || []

  // If all cards are part of the same scala return that scala
  if (scalaResults.length === 1 && firstArray.length === cards.length) {
    return {
      success: true,
      message: "All cards are part of the same scala",
      scala: firstArray,
    }
  } else if (
    // Check for ace/king combinations
    firstArray.length > 0 && 
    lastArray.length > 0 && 
    firstArray[0].value === 1 && 
    lastArray[lastArray.length - 1].value === 13) {
      // Add last array (with king) to first array (with ace)
      lastArray.reverse() // Reverse last array to keep order on unshift
      lastArray.forEach((card) => {
        firstArray.unshift(card)
      })
      scalaResults.pop() // Remove last array from results
      if (firstArray.length >= 4 && firstArray.length === cards.length) {
        // Ace/king scala are only cards found
        return {
          success: true,
          message: "All cards are part of the same scala (with ace and king)",
          scala: firstArray,
        }
      }
  } 

  // No return so far = too many cards for one scala
  return {
    success: false,
    errorCode: 4,
    message:
      "Not all cards form a single scala, but here are the possible sequences",
    scala: scalaResults,
  }
}
    


 

    
//     let scala = [sortedCards[0]] // First card in scala
//     let checkingValue = sortedCards[0].value - 1 // Which value to check against
//     let checkingSuit = sortedCards[0].suit // Which suit to check against
//     sortedCards.forEach((card) => {
//       if (card.suit === checkingSuit && card.value === checkingValue + 1) {
//         // Card on table part of existing scala
//         scala.push(card)
//         checkingValue = card.value
//       } else {
//         // New scala
//         scala = [card]
//         checkingValue = card.value - 1
//         checkingSuit = card.suit
//       }
//     })
//     if (scala.length >= 3) {
//       // Scala found
//       console.log("Scala found")
//       return scala
//     } else {
//       // No scala found
//       console.log("No scala found")
//       throw new Error("No scala found!")
//     }
//   }
// 
// console.log("Checking if", newCard, "matches scala", scala)
// let checkingValue = scala[0].value - 1 // Which value to check against
// let checkingSuit = scala[0].suit // Which suit to check against
// console.log("Checking value", checkingValue, "Checking suit", checkingSuit)
// if (newCard.value === checkingValue && newCard.suit === checkingSuit) {
//   console.log("New card value one lower than first scala")
//   return true // New card one lower than first scala, approved
// } else {
//   scala.forEach((card) => {
//     if (card.suit === checkingSuit && card.value === checkingValue + 1) {
//       checkingValue = card.value // Card on table part of existing scala
//       console.log(
//         "Checking value",
//         checkingValue,
//         "Checking suit",
//         checkingSuit
//       )
//     } else if (
//       newCard.suit === checkingSuit &&
//       newCard.value === checkingValue + 1
//     ) {
//       console.log("New card value one higher than last card tested")
//       return true // New card one higher than scala on table, approved
//     } else {
//       checkingValue = card.value // Looking at next scala on table
//       checkingSuit = card.suit
//       console.log("Checking new scala")
//       console.log(
//         "Checking value",
//         checkingValue,
//         "Checking suit",
//         checkingSuit
//       )
//       if (
//         newCard.suit === checkingSuit &&
//         newCard.value === checkingValue - 1
//       ) {
//         console.log("New card value one lower than next scala")
//         return true // New card one lower than next scala, approved
//       }
//     }
//   })
// }
// 
// if (newCard.suit === checkingSuit && newCard.value === checkingValue + 1) {
//   console.log("New card value one higher than last scala")
//   return true // New card one higher than last scala on table, approved
// } else {
//   console.log("New card doesn't match any scala")
//   return false
// }