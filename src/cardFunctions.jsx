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