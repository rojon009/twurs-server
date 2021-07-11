const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mlxmq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.connection.once('open', () => console.log('Connected to Database.'))