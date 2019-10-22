function getExistingOrdersWhichCanFulfillIncomingOrder(existingBook, incomingOrder) {
  let matches = existingBook.filter((item) => {
    return item.type !== incomingOrder.type && item.price === incomingOrder.price && item.quanity === incomingOrder.quanity
  })

  return matches
}

function removeMatch(firstMatch, existingBook) {
  const matchingIndex = existingBook.findIndex((item) => {
    firstMatch.type === item.type && firstMatch.quanity === item.quantity && firstMatch.price === item.price
  })

  // make a copy of the existing book
  let updatedBook = existingBook

  // remove the matching order from the book
  updatedBook.splice(matchingIndex, 1)

  return updatedBook
}

function getUpdatedBook(existingBook, incomingOrder) {
  let updatedBook = []

  let matchingOrders = getExistingOrdersWhichCanFulfillIncomingOrder(existingBook, incomingOrder)

  // if there are an existing order that can fulfull the incoming order remove it from the book
  if (matchingOrders.length) {
    updatedBook = removeMatch(matchingOrders[0], existingBook)
  } else {
    // add incoming orders to the book when there was not a match in the book
    updatedBook = existingBook.concat(incomingOrder)
  }

  return updatedBook
}

function reconcileOrder(existingBook, incomingOrder) {
  let updatedBook = []

  // if no match exists, add to the existing book
  if (!existingBook.length) {
    updatedBook = existingBook.concat(incomingOrder)
  } else {
    updatedBook = getUpdatedBook(existingBook, incomingOrder)
  }

  return updatedBook
}

module.exports = reconcileOrder