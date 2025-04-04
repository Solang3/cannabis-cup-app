// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth'); // ✅ important
console.log('✅ Loaded auth routes');


const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
app.use(express.json());        // ✅ to read JSON bodies

app.use('/api/auth', authRoutes);  // ✅ this mounts /register and /login

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.listen(process.env.PORT || 5050, () => {
    console.log(`Server running on port ${process.env.PORT || 5050}`);
  });
  
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

const eventRoutes = require('./routes/events');
app.use('/api/events', eventRoutes);

const formRoutes = require('./routes/forms');
app.use('/api/forms', formRoutes);

const entryRoutes = require('./routes/entries');
app.use('/api/entries', entryRoutes);

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

app.use('/api/auth', require('./routes/googleAuth'));


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => console.error('Mongo error:', err));
