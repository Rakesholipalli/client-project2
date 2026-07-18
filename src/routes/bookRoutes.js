const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { validateBook, validateBookUpdate } = require('../middleware/validation');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', validateBook, bookController.createBook);
router.put('/:id', validateBookUpdate, bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
