const express = require('express');
const app = express();
require('./db/mongoose')

const userRoute = require('./routers/user.route');
const productRoute = require('./routers/product.route');
const categoryRoute = require('./routers/category.route');

app.use(express.json())

app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/categories', categoryRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('server is running on port 5000'))
