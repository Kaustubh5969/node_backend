const express = require('express');
const app = express();
const db = require('./db')

const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send("Hello, Wel-Come");
})

const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');


app.use('/person', personRoutes);
app.use('/menuItem', menuItemRoutes);


app.listen(5000, () => {
    console.log("Server is running on port 5000");
})