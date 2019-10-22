function getExistingOrdersWhichCanFulfillIncomingOrder(existingBook, incomingOrder) {
  let matches = existingBook.filter((item) => {
    return item.type !== incomingOrder.type &&
      item.price === incomingOrder.price &&
      item.quantity >= incomingOrder.quantity
  })

  return matches
}

function updateOrRemoveMatch(existingBook, incomingOrder) {
  let updatedBook = []
  const matchingIndex = existingBook.findIndex((item) => {
    return incomingOrder.type !== item.type &&
      incomingOrder.quantity === item.quantity &&
      incomingOrder.price === item.price
  })

  const partialMatchingIndex = existingBook.findIndex((item) => {
    return incomingOrder.type !== item.type &&
      incomingOrder.quantity < item.quantity &&
      incomingOrder.price === item.price
  })
  
  if (matchingIndex > -1) {
    updatedBook = removeMatch(matchingIndex, existingBook)
  } else {
    updatedBook = existingBook
    updatedBook[partialMatchingIndex].quantity = updatedBook[partialMatchingIndex].quantity - incomingOrder.quantity
  }

  return updatedBook
}

function removeMatch(matchingIndex, existingBook) {
  // make a copy of the existing book
  let updatedBook = existingBook
  console.log({
    matchingIndex
  })

  // remove the matching order from the book
  updatedBook.splice(matchingIndex, 1)

  return updatedBook
}

function getUpdatedBook(existingBook, incomingOrder) {
  let updatedBook = []

  let matchingOrders = getExistingOrdersWhichCanFulfillIncomingOrder(existingBook, incomingOrder)
  console.log({
    matchingOrders
  })
  // if there are an existing order that can fulfull the incoming order remove it from the book
  if (matchingOrders.length) {
    updatedBook = updateOrRemoveMatch(existingBook, incomingOrder)
  } else {
    // add incoming orders to the book when there was not a match in the book
    updatedBook = existingBook.concat(incomingOrder)
  }

  return updatedBook
}

function reconcileOrder(existingBook, incomingOrder) {
  let updatedBook = []
  console.log({
    existingBook
  })
  console.log({
    incomingOrder
  })
  // if no match exists, add to the existing book
  if (!existingBook.length) {
    updatedBook = existingBook.concat(incomingOrder)
  } else {
    updatedBook = getUpdatedBook(existingBook, incomingOrder)
  }

  return updatedBook
}

module.exports = reconcileOrder