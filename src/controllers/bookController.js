const { validationResult } = require('express-validator');
const bookService = require('../services/bookService');
const { sanitizeInput } = require('../utils/sanitizer');
const { logAnalytics } = require('../utils/analytics');

const getAllBooks = async (req, res, next) => {
  try {
    const { search, status, sortBy } = req.query;
    const sanitizedSearch = search ? sanitizeInput(search) : null;
    
    const books = await bookService.getAllBooks({
      search: sanitizedSearch,
      status,
      sortBy
    });

    if (books.length === 0) {
      return res.status(200).json({
        status: 'success',
        message: 'No books found in the inventory',
        data: {
          books: [],
          count: 0
        }
      });
    }

    logAnalytics('User viewed book list');

    res.status(200).json({
      status: 'success',
      data: {
        books,
        count: books.length
      }
    });
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await bookService.getBookById(id);

    if (!book) {
      return res.status(404).json({
        status: 'error',
        message: 'Book not found',
        data: null
      });
    }

    logAnalytics('User viewed book details');

    res.status(200).json({
      status: 'success',
      data: {
        book
      }
    });
  } catch (error) {
    next(error);
  }
};

const createBook = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }

    const sanitizedData = {
      title: sanitizeInput(req.body.title),
      author: sanitizeInput(req.body.author),
      isbn: sanitizeInput(req.body.isbn),
      status: req.body.status,
      quantity: req.body.quantity,
      description: req.body.description ? sanitizeInput(req.body.description) : null
    };

    const newBook = await bookService.createBook(sanitizedData);

    logAnalytics('[Analytics] User interacted with Express API - Book Created');

    res.status(201).json({
      status: 'success',
      message: 'Book created successfully',
      data: {
        book: newBook
      }
    });
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }

    const sanitizedData = {};
    if (req.body.title) sanitizedData.title = sanitizeInput(req.body.title);
    if (req.body.author) sanitizedData.author = sanitizeInput(req.body.author);
    if (req.body.isbn) sanitizedData.isbn = sanitizeInput(req.body.isbn);
    if (req.body.status) sanitizedData.status = req.body.status;
    if (req.body.quantity !== undefined) sanitizedData.quantity = req.body.quantity;
    if (req.body.description) sanitizedData.description = sanitizeInput(req.body.description);

    const updatedBook = await bookService.updateBook(id, sanitizedData);

    if (!updatedBook) {
      return res.status(404).json({
        status: 'error',
        message: 'Book not found',
        data: null
      });
    }

    logAnalytics('[Analytics] User interacted with Express API - Book Updated');

    res.status(200).json({
      status: 'success',
      message: 'Book updated successfully',
      data: {
        book: updatedBook
      }
    });
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await bookService.deleteBook(id);

    if (!deleted) {
      return res.status(404).json({
        status: 'error',
        message: 'Book not found',
        data: null
      });
    }

    logAnalytics('[Analytics] User interacted with Express API - Book Deleted');

    res.status(200).json({
      status: 'success',
      message: 'Book deleted successfully',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
