require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const borrowerRoutes = require('./routes/borrowerRoutes');
const investRoutes = require('./routes/investRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); 

app.use('/api/auth', authRoutes);
app.use('/api/borrower', borrowerRoutes);
app.use('/api/invest', investRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(()=>app.listen(PORT, ()=>console.log('Server running on', PORT)))
  .catch(err=>console.error(err));
