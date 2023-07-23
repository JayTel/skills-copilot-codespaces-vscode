// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Connect to mongo db
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true });

// Use cors
app.use(cors());

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import routes
const commentRoute = require('./routes/comment');

// Use routes
app.use('/comments', commentRoute);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));