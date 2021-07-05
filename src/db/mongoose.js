const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/twrs',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.connection.once('open', () => console.log('Connected to Database.'))