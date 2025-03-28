const express = require('express');
const app = express();
const db = require('./db')
const passport = require('./auth')


const bodyParser = require('body-parser');
app.use(bodyParser.json());

//middleWare
const  logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request url : ${req.originalUrl}`);
    next();
}

app.use(logRequest);

const authenticateUser = passport.authenticate('local', {session:false});
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