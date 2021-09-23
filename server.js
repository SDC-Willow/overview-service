const db = require('./db/database.js')
const express = require('express');
const app = express();


app.get('/products/:productid', (req, res) => {
  db(req.params.productid).then((results) => {
   res.send(results)
  }).catch((err) => {
    res.status(404).send(err.message);
  })
})

app.listen('3000', () => console.log('you are connected'))