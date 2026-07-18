const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const bookRoutes = require('./routes/bookRoutes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const analyticsMiddleware = require('./middleware/analytics');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(analyticsMiddleware);
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Library Book Inventory API is running',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/books', bookRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[Server] Library Book Inventory API running on port ${PORT}`);
  console.log(`[Server] Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
