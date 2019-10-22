function getExistingOrdersWhichCanFulfillIncomingOrder(existingBook, incomingOrder) {
  let matches = existingBook.filter( (item) => {
    return item.type !== incomingOrder.type && item.price === incomingOrder.price && item.quanity === incomingOrder.quanity
  })

  return matches
}

function getUpdatedBook (existingBook, incomingOrder) {
  let updatedBook = [] 
  
  let matchingOrders = getExistingOrdersWhichCanFulfillIncomingOrder(existingBook, incomingOrder)

  // if there are no existing orders that can fulfull the incoming order, add the new order to the book
  if (!matchingOrders.length) {
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
