const express = require('express');
const app = express();
require('./db/mongoose')

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('server is running on port 5000'))
