
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

 mongoose.connect('mongodb://localhost/movie-rent')
 .then( () => console.log('Connected to Mongodb..'))
 .catch ( err => console.log('Could not connected to Mongodb'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));