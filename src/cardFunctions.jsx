// Sorting and counting cards

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