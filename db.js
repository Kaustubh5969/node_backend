const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/Ashirwad_Hotel'

mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log("Connected to mongodb server");
});
db.on('error', (err)=>{
    console.log("Error", err);
});
db.on('disconnected', ()=>{
    console.log("mongodb server Disconnected");
});

module.exports = db;