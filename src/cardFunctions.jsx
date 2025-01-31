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

export const sortBySuit = (cards) => {
  const sortedCards = [...cards]
  sortedCards.sort((a, b) => a.value - b.value)
  sortedCards.sort((a, b) => (a.suit > b.suit ? 1 : b.suit > a.suit ? -1 : 0))
  return sortedCards
}

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
export const countPoints = (person) => {
  let newPoint = 0
  person.hand.forEach((card) => (newPoint += card.value))
  return newPoint
}