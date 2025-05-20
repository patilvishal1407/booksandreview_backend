require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log('Connected to database');
  } catch (err) {
    console.error('Database connection error', err);
    process.exit(1);
  }
};

module.exports = { pool, connectDB };
