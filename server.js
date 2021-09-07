const db = require('./db/database.js')
const express = require('express');
const app = express();

app.listen('3000', () => console.log('you are connected'))