const express = require ('express');
const path = require ('path');

const app = express();


const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const uri = 'mongodb+srv://irfoloji:21irrr21@cluster0.ljaosj1.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true}).then(() => {
    console.log('Connected to database!');
    }).catch(err => console.log(err));


app.use(cors());
app.use(bodyParser.json());



const userRoutes = require('./user');
const adminRoutes = require('./admin');

app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;