const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
require('./db/mongoose')

// All routes imported
const userRoute = require('./routers/user.route');
const adminRoute = require('./routers/admin.route');
const productRoute = require('./routers/product.route');
const categoryRoute = require('./routers/category.route');
const orderRoute = require('./routers/order.route');


// Express conf
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("Welcome to the Twurs Tech Shop E-commerce API")
})

app.use('/users', userRoute);
app.use('/admins', adminRoute);
app.use('/products', productRoute);
app.use('/categories', categoryRoute);
app.use('/orders', orderRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('server is running on port 5000'))


