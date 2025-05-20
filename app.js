const express = require('express');
const app = express();
const { connectDB } = require('./config/db');

const authRoutes = require('./routes/authRoute');
const bookRoutes = require('./routes/bookRoute');
const reviewRoutes = require('./routes/reviewRoute');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);


const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

module.exports = app;