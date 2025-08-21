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
  'https://symphonious-chimera-73626a.netlify.app',
  'https://tubular-tarsier-164915.netlify.app'
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // allow Postman/server requests
    if(allowedOrigins.indexOf(origin) === -1){
      return callback(new Error('CORS not allowed from this origin'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Body parser
app.use(express.json());

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/borrower', borrowerRoutes);
app.use('/api/invest', investRoutes);
app.use('/api/admin', adminRoutes);

// Root route (optional)
app.get('/', (req, res) => {
  res.send('Backend is running. Frontend is hosted separately.');
});

// MongoDB & server start
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("DB connection error:", err));
