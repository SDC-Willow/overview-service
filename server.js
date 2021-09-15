const db = require('./db/database.js')
const express = require('express');
const app = express();


app.get('/product', (req, res) => {
  console.log(req.query)
  res.send('hi')
})
app.listen('3000', () => console.log('you are connected'))