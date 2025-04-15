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
  sortedCards.sort((a, b) => (a.suitOrder > b.suitOrder ? 1 : b.suitOrder > a.suitOrder ? -1 : 0))
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

// Grouping cards

/**
 * Group cards into different arrays depending on their suit 
 * @param  {Array} cards The cards that should be grouped into suits
 * @return {Array}      Array of arrays with same suit cards gruped together
 */
export const groupBySuit = (cards) => {
  const grouped = cards.reduce((acc, card) => {
    if (!acc[card.suit]) {
      acc[card.suit] = []
    }
    acc[card.suit].push(card)
    return acc
  }, {})
  return Object.values(grouped)
}

/**
 * Group cards into different arrays where each array is a sequence of cards 
 * @param  {Array} cards The cards that should be grouped into sequences
 * @return {Array}      Array of arrays with sequenced cards gruped together
 */
export const groupIntoSequences = (cards) => {
  if (cards.length === 0) return [] // Handle empty array

  const lengthOfSequence = (cardsToCheck) => {
    if (cardsToCheck.length === 0) return 0 // Handle empty array
    let checkingValue = cardsToCheck[0].value // Which value to check against
    let sequenceLength = 0 // How long the sequence is

    for (let i = 0; i < cardsToCheck.length; i++) {
      if (cardsToCheck[i].value === checkingValue) {
        // Value approved, increase sequence length and checking value
        sequenceLength++
        checkingValue++
        // Check for duplicates and break if found
        if (i + 1 < cardsToCheck.length &&
          cardsToCheck[i + 1].value === cardsToCheck[i].value) { 
          break 
        }
      } else {
        break // Break when the sequence is broken
      }
    }

    return sequenceLength
  }
  
  const sortedCards = sortByValue(cards)
  const foundSequences = [] // Array to hold the found sequences
  while (sortedCards.length > 0) {
    const length = lengthOfSequence(sortedCards) // Length of sequence
    if (length === 0) break // Break if no sequence possible
    foundSequences.push(sortedCards.slice(0, length)) // Push sequence to results
    sortedCards.splice(0, length) // Remove sequence from contenders
  }

  return foundSequences
}

/**
 * Join two arrays of cards, where one has an ace and one has a king, into one array 
 * @param  {Array} aceArray The cards that has an ace
 * @param  {Array} kingArray The cards that has a king
 * @return {Array}      Array with the two arrays joined together
 */
const joinAceAndKing = (aceArray, kingArray) => {
  // Reverse last array to keep order on unshift
  kingArray.reverse().forEach((card) => {
    aceArray.unshift(card)
  })
  return aceArray
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
 * Check to see if all cards are of the same suit
 * @param  {Array} cards The cards that should be checked
 * @return {Boolean}      True if all cards are of the same suit, false otherwise
 */
const equalSuit = (cardSet) => {
  return cardSet.every((card) => card.suit === cardSet[0].suit)
}

// Make a scala
/**
 * Check if the cards can form a scala and if so return the scala
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

  // Divide cards into sequences
  const sequencedCards = groupIntoSequences(cards)

  if (sequencedCards.length === 0) {
    return {
      success: false,
      errorCode: 3,
      message: "No valid scala found",
      scala: null,
    }
  }

  // If all cards are part of the same scala return that scala
  if (sequencedCards.length === 1 && sequencedCards[0].length === cards.length) {
    return {
      success: true,
      message: "All cards are part of the same scala",
      scala: sequencedCards[0],
    }
  } 
  
  // Find possible scalas
  if (sequencedCards.length > 1) {
    const firstSequence = sequencedCards[0]
    const lastSequence = sequencedCards[sequencedCards.length - 1]

    // Check for ace/king combinations
    if (firstSequence[0].value === 1 && lastSequence[lastSequence.length - 1].value === 13) {
      const newScala = joinAceAndKing(firstSequence, lastSequence)
      if (newScala.length >= 4 && newScala.length === cards.length) {
        // Ace/king scala are only cards found
        return {
          success: true,
          message: "All cards are part of the same scala (with ace and king)",
          scala: newScala,
        }
      } else {
        sequencedCards[0] = newScala
        sequencedCards.pop() // Remove last sequence (with king)
      }
    } 

    // No return so far = too many cards for one scala
    return {
      success: false,
      errorCode: 4,
      message:
        "Not all cards form a single scala, but here are the found sequences",
      possibleScalas: formatToPossibleScalas(sequencedCards),
    }
  }
}

/**
 * Format an array of sequences to maximize it's potential to form scalas
 * @param  {Array} cardsArray Array of array with sequenced cards
 * @return {Object}      Object with array of possible scalas, array of singles and array of remaining cards
 */
const formatToPossibleScalas = (cardsArray) => {
  // If length is 0 or 1 there is nothing to do
  if (cardsArray.length === 0) {
    return {
      possibleScalas: null,
      singles: null,
      remainingCards: null,
    }
  } else if (cardsArray.length === 1) {
    const array = cardsArray[0]
    return {
      possibleScalas: array.length >= 4 ? array : null,
      singles: array.length === 1 ? array : null,
      remainingCards: array.length > 1 && array.length < 4 ? array : null,
    }
  }
  const cardsToFormat = [...cardsArray]

  // If length is 2 or more, check for ace/king combinations
  let firstSequence = cardsToFormat[0]
  let lastSequence = cardsToFormat[cardsToFormat.length - 1]
  if (
    firstSequence[0].value === 1 &&
    lastSequence[lastSequence.length - 1].value === 13
  ) {
    firstSequence = joinAceAndKing(firstSequence, lastSequence)
    cardsToFormat.pop() // Remove last array (with king)
  }

  // Remove single cards, they can't form scalas
  let cardsWithoutSingles = cardsToFormat.filter((arr) => arr.length > 1)

  // Make one array with all single cards (not multiple arrays)
  const singlesArray = []
  cardsToFormat
    .filter((arr) => arr.length === 1)
    .forEach((arr) => {
      singlesArray.push(arr[0])
    })

  // Empty out cardsWithoutSingles and put them in right array
  const possibleScalas = [],
    smallerSequences = []

  while (cardsWithoutSingles.length > 0) {
    // Handle special case with only one card-array left
    if (cardsWithoutSingles.length === 1) {
      if (cardsWithoutSingles[0].length >= 4) {
        possibleScalas.push(cardsWithoutSingles[0])
      } else {
        smallerSequences.push(cardsWithoutSingles[0])
      }
      cardsWithoutSingles.splice(0, 1) // Remove array
    } else {
      // Go through all card-arrays and check if they can be joined or if they are ready to be a scala
      for (let i = 0; i < cardsWithoutSingles.length; i++) {
        const arr = cardsWithoutSingles[i]
        const nextArr = cardsWithoutSingles[i + 1] || []
        const lastArr =
          cardsWithoutSingles[cardsWithoutSingles.length - 1] || []

        // Skip if array is empty
        if (arr.length === 0) continue

        // Handle arrays with less than four cards
        if (arr.length < 4 && nextArr.length > 0) {
          // Join arrays if next array starts with same value as current array ends with
          if (nextArr[0].value === arr[arr.length - 1].value) {
            singlesArray.push(nextArr[0]) // Save duplicate card as single
            nextArr.splice(0, 1) // Remove duplicate card
            nextArr.forEach((card) => arr.push(card)) // Join arrays
            nextArr.splice(0, nextArr.length) // Empty next array
          } else if (
            lastArr.length > 0 &&
            arr[0].value === lastArr[lastArr.length - 1].value
          ) {
            // Check if array can be joined with last array
            singlesArray.push(arr[0]) // Save duplicate card as single
            arr.splice(0, 1) // Remove duplicate card
            const newArray = joinAceAndKing(arr, lastArr)
            cardsWithoutSingles[i] = newArray // Replace current array with new array
            lastArr.splice(0, lastArr.length) // Empty last array
          } else {
            // Array can't be joined
            smallerSequences.push([...arr])
            arr.splice(0, arr.length)
          }
        } else if (arr.length >= 4) {
          // Handle arrays with four or more cards
          if (
            lastArr.length > 0 &&
            lastArr.length < 4 &&
            arr[0].value === lastArr[lastArr.length - 1].value
          ) {
            // If last array has less than four cards - try to join it
            singlesArray.push(arr[0]) // Save duplicate card as single
            arr.splice(0, 1) // Remove duplicate card
            const newArray = joinAceAndKing(arr, lastArr)
            cardsWithoutSingles[i] = newArray // Replace current array with new array
            lastArr.splice(0, lastArr.length) // Empty last array
          } else if (nextArr.length >= 4) {
            // If next array has four or more cards it's a finished scala
            possibleScalas.push([...arr])
            arr.splice(0, arr.length) // Empty array
          } else if (i + 1 === cardsWithoutSingles.length) {
            // Last array
            possibleScalas.push(arr)
            cardsWithoutSingles.pop() // Remove last array
          } else if (
            i + 2 === cardsWithoutSingles.length &&
            nextArr[0].value === arr[arr.length - 1].value
          ) {
            // Second to last array. Join arrays if next array starts with same value as current array ends with
            singlesArray.push(nextArr[0]) // Save duplicate card as single
            nextArr.splice(0, 1) // Remove duplicate card
            nextArr.forEach((card) => arr.push(card)) // Join arrays
            nextArr.splice(0, nextArr.length) // Empty next array
          }
        }
      }

      // Remove empty arrays
      cardsWithoutSingles = cardsWithoutSingles.filter((arr) => arr.length > 0)
    }
  }

  return {
    scalas: possibleScalas,
    singles: singlesArray,
    remainingCards: smallerSequences,
  }
}
