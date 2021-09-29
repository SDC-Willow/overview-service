const {getProduct, getStyles, postCart} = require('./db/database.js')
const express = require('express');
const app = express();


app.get('/products/:product_id', (req, res) => {
  getProduct(req.params.product_id).then((results) => {
   res.send(results)
  }).catch((err) => {
    res.status(404).send(err.message);
  })
})

app.get('/products/:product_id/styles', (req, res) => {
  getStyles(req.params.product_id).then((results) => {
    res.send(results)
  }).catch((err) => {
    res.status(404).send(err.message);
  })
})

app.post('/cart', (req, res) => {
  postCart(1).then(() => {
    res.status(200)
    res.end()
  }).catch((err) => {console.log(err)})
})

app.listen('3000', () => console.log('you are connected'))