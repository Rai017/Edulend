require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Routes
const authRoutes = require('./routes/authRoutes');
const borrowerRoutes = require('./routes/borrowerRoutes');
const investRoutes = require('./routes/investRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// ---------- MIDDLEWARES ----------

// CORS setup for local + deployed frontend
const allowedOrigins = [
  'http://localhost:3000',                       // local dev
  'https://zesty-hamster-a70a8a.netlify.app'    // deployed frontend
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

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ---------- ROUTES ----------
app.use('/api/auth', authRoutes);
app.use('/api/borrower', borrowerRoutes);
app.use('/api/invest', investRoutes);
app.use('/api/admin', adminRoutes);

// ---------- OPTIONAL: Serve frontend from backend ----------
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// ---------- DATABASE & SERVER ----------
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error("DB connection error:", err));
