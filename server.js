require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');

// Mongo & Mongoose Connection Variables
const db = mongoose.connection;
const MongoStore = require('connect-mongo')(session);

// Express & PORT Variables
const app = express();
const PORT = process.env.PORT || 3001;

// HandleBars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// Set Up Express Connection
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set Up Mongoose Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/so-shul', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Set Up MongoDB Connection
app.use(session({
  secret: 'My super secret cookie',
  cookie: {},
  store: new MongoStore({mongooseConnection: db}),
  resave: true,
  saveUninitialized: true
}));


// Use this to log mongo queries being executed!
mongoose.set('debug', true);

// Error handling for database
db.on('error', console.error.bind(console, 'connection error:'));

// Connect to the DB
db.once('open', function() {
    app.use(require('./routes'));
    app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
});