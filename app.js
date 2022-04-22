//entry point
console.log('entry app.js')

require('dotenv').config()
const cors = require('cors');
const express = require('express');
const app = express();
const { port, MONGO_URI } = process.env;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());



module.exports = app;