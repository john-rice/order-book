function getUpdatedBook (existingBook, incomingOrder) {
  let updatedBook = [] 

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
