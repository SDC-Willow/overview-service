const {getProduct, getStyles, postCart} = require('./db/database.js')
const express = require('express');
const app = express();
const body = require('body-parser');
app.use(body.json());
app.use(body.urlencoded({extended: false}))

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
  postCart(req.body.sku_id).then(() => {
    res.status(200)
    res.end()
  }).catch((err) => {console.log(err)})
})

app.listen('3000', () => console.log('you are connected'))