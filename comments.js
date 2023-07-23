// Create Web server 

// Import express module
const express = require('express');
// Import path module
const path = require('path');
// Import body-parser module
const bodyParser = require('body-parser');

// Import mongoose module
const mongoose = require('mongoose');

// Create express object
const app = express();

// Import Comment model
const Comment = require('./models/comment');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/commentDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log(err);
    });

// Set view engine to ejs
app.set('view engine', 'ejs');
// Set views folder to 'views'
app.set('views', 'views');

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use static middleware
app.use(express.static(path.join(__dirname, 'public')));

// Set port
const port = process.env.PORT || 3000;

// Get comments from database
app.get('/', (req, res, next) => {
    Comment.find()
        .then(comments => {
            res.render('index', {
                comments: comments
            });
        })
        .catch(err => {
            console.log(err);
        });
});

// Post comment
app.post('/comment', (req, res, next) => {
    // Create new comment
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    // Save comment to database
    comment.save()
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
});

// Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});