function getUpdatedBook (existingBook, incomingOrder) {
  let updatedBook = [] 
  let correspondingOrders = existingBook.filter( (item) => {
    return item.type === incomingOrder.type
  })

  // if the number of orders with the same type as the incoming type is the same as the number of all existing orders
  if (correspondingOrders.length === existingBook.length) {
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
