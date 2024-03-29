const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
var logger = require('morgan');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

app.use(cors());
app.use('/public', express.static('public'));

// morgan HTTP request logger middleware
app.use(logger('dev'));

// Define Route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/inventory', require('./routes/api/inventory'));
app.use('/api/order', require('./routes/api/order'));
app.use('/api/dashboard', require('./routes/api/dashboard'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'client', 'build', 'index.html', 'public')
    );
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
