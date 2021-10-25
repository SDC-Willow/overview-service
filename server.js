const {getProduct, getStyles, postCart} = require('./db/database.js')
const express = require('express');
const app = express();
const body = require('body-parser');
const path = require('path');
const redis = require('redis');
app.use(body.json());
app.use(body.urlencoded({extended: false}))

const redisPort = 6379;
const client = redis.createClient(redisPort);
const getProductCache = (req, res, next) => {
  const {product_id} =  req.params;
  client.get(product_id , (err, results) => {
    if(err) {
      next();
    } if(results !== null) {
      res.send(JSON.parse(results))
    } else {
      next();
    }
  })
}
const getStylesCache = (req, res, next) => {
  const {product_id} =  req.params;
  client.get(product_id + 'Style', (err, results) => {
    if(err) {
      next();
    } if(results !== null) {
      res.send(JSON.parse(results))
    } else {
      next();
    }
  })
}
app.get('/', (req, res) => {
  res.send('test');
})
app.get('/products/:product_id', getProductCache, (req, res) => {
  getProduct(req.params.product_id).then((results) => {
    const productsResults = req.params.product_id;
    client.setex(productsResults, 3600, JSON.stringify(results));
    res.send(results)
  }).catch((err) => {
    res.status(404).send(err.message);
  })
})

app.get('/products/:product_id/styles', getStylesCache, (req, res) => {
  getStyles(req.params.product_id).then((results) => {
    const productStyle = req.params.product_id + 'Style';
    console.log(productStyle);
    client.setex(productStyle, 3600, JSON.stringify(results));
    res.send(results)
  }).catch((err) => {
    res.status(200).send({});
  })
})

app.post('/cart', (req, res) => {
  postCart(req.body.sku_id).then(() => {
    res.status(200)
    res.end()
  }).catch((err) => {console.log(err)})
})

app.get('/loaderio-0fe6ce76b1bcf07dac806ea5c19751cd', (req, res) => {
  const options = {
    root: path.join(__dirname)
};

const fileName = 'loaderio-0fe6ce76b1bcf07dac806ea5c19751cd.txt';
res.sendFile(fileName, options, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Sent:', fileName);
    }
});
})

app.listen('3000', () => console.log('you are connected'))