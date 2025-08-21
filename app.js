require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const borrowerRoutes = require('./routes/borrowerRoutes');
const investRoutes = require('./routes/investRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://zesty-hamster-a70a8a.netlify.app',
  'https://soft-mochi-4eaaa7.netlify.app'
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(!allowedOrigins.includes(origin)) return callback(new Error('CORS not allowed from this origin'));
    callback(null, true);
  },
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/borrower', borrowerRoutes);
app.use('/api/invest', investRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("DB connection error:", err));
