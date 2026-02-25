const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const userRoutes = require('./routes/user.route');
const cors = require('cors');
const cookie = require('cookie-parser');
const transactionRoute = require('./routes/transaction.route')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());



app.use(cors({
  origin: 'https://money-tracker-frontend-w9s6.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.use('/user', userRoutes);

app.use('/transactions',transactionRoute)





module.exports = app;