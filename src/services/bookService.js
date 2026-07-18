// in-memory data store
let books = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0743273565',
    status: 'available',
    quantity: 5,
    description: 'A classic American novel',
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString()
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0451524935',
    status: 'available',
    quantity: 3,
    description: 'Dystopian social science fiction',
    createdAt: new Date('2024-01-02').toISOString(),
    updatedAt: new Date('2024-01-02').toISOString()
  }
];

let nextId = 3;

const getAllBooks = async (filters = {}) => {
  let filteredBooks = [...books];

  // search by title, author, or ISBN
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredBooks = filteredBooks.filter(book =>
      book.title.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower) ||
      book.isbn.includes(searchLower)
    );
  }

  if (filters.status) {
    filteredBooks = filteredBooks.filter(book => book.status === filters.status);
  }

  if (filters.sortBy) {
    switch (filters.sortBy) {
    case 'title':
      filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'author':
      filteredBooks.sort((a, b) => a.author.localeCompare(b.author));
      break;
    case 'createdAt':
      filteredBooks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    default:
      break;
    }
  }

  return filteredBooks;
};

const getBookById = async (id) => {
  return books.find(book => book.id === id) || null;
};

const createBook = async (bookData) => {
  const newBook = {
    id: String(nextId++),
    ...bookData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  books.push(newBook);
  return newBook;
};

const updateBook = async (id, updateData) => {
  const bookIndex = books.findIndex(book => book.id === id);

  if (bookIndex === -1) {
    return null;
  }

  books[bookIndex] = {
    ...books[bookIndex],
    ...updateData,
    updatedAt: new Date().toISOString()
  };

  return books[bookIndex];
};

const deleteBook = async (id) => {
  const bookIndex = books.findIndex(book => book.id === id);

  if (bookIndex === -1) {
    return false;
  }

  books.splice(bookIndex, 1);
  return true;
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
