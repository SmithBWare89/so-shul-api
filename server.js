const express = require('express');
const mongoose = require('mongoose');
const db = mongoose.connection;
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();
const PORT = process.env.PORT || 3001;
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI || 'mongodb://localhost/so-shul',
  collection: 'so-shul'
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/so-shul', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(require('express-session'))

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

// Error handling for database
db.on('error', console.error.bind(console, 'connection error:'));
store.on('error', function(error) {console.log(error)});

// Connect to the DB
db.once('open', function() {
    app.use(require('./routes'));
    app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
})