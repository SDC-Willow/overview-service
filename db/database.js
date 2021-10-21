const db = require('./login.js');
const redis = require('redis');
db.authenticate().then(() => console.log('connected to db')).catch((err) => console.log(err));

// const Products = db.define('products');
const getProduct = (productId) => {
  let features = []
  return db.query(`Select * from products where id=${productId}`).then(([[results]]) => {
    if(results === undefined) {
      throw new Error('Product id does not exist')
    }
   return db.query(`Select feature, value from features where product_id=${productId}`).then((res) => {
      results.features = res[0]
      if(results.default_price !== '0') {
        results.default_price += '.00'
      }
      return results;
    })
  }).catch((err) => {throw new Error('Invalid product id')})
}
// let features = []
// db.query('Select * from products where id=1').then(([[results]]) => {
//   db.query('Select feature, value from features where product_id=1').then((res) => {
//     results.features = res[0]
//   })
// })
// db.query(`Select products.*, (select JSON_ARRAY(${'feature, value'})) as features from products join  features where product_id=1`).then(([[results]]) => console.log('results', results)).catch((ee) => console.log('33',ee));

// db.query('Select * from products where id=1').then((results) => {
//   db.query('Select feature, value from features where product_id=1').then((res) => console.log(res))
// })
//Select *, (select JSON_ARRAY(${'name'})) as features from products where id=1
// Products.sync().then(() => {
//   Products.findAll({attributes: ['id', 'name', 'slogan', 'description', 'category', 'default_price'], where: {
//    id: 9999
//   }}).catch((err) => console.log(err)).then((re) => console.log(re))
// }).catch((err) => console.log(err));

const getStyles = (productId) => {
  return db.query(`Select concat(product_id) product_id from styles where product_id=${productId} limit 1`).then(([result]) => {
    // console.log('results', result[0])
    if(result[0] === undefined) {
      throw new Error('No styles for this product id')
    }
    let data = result[0]
    // console.log('data', data);
    return db.query(`Select id as style_id, name, sale_price, original_price, CAST(if(${"`default?`"}, 'true', 'false')as JSON) ${"`default?`"} from styles where product_id=${productId}`)
    .then((results) => {
      if(results !== undefined && results[0].length !== 0) {
      data.results = results[0];
      let photos = data.results.map((style) => {
        return db.query(`Select thumbnail_url, url from photos where style_id=${style.style_id}`).then(([results]) => {
          style.photos = results;
          return style
        })
      })
      return Promise.all(photos).then(() => {
        return data
     })
     .then((data) => {
       let skus = data.results.map((style) => {
         return db.query(`Select id, quantity, size from skus where style_id=${style.style_id}`).then(([results]) => {
           if(results.length === 0) {
             style.skus = null
           }
           let sku = results.map((skus) => {
            let {id, ...rest} = skus
            if(style.skus === undefined) {
              style.skus = {}
            }
            style.skus[id] = rest
            return style
           })
           return Promise.all(sku).then(() => {
             return sku
           })
         })
         return Promise.all(skus).then((result) => {
          return result
         })
        })
        return Promise.all(skus).then((results) => {
         return data
      })
     })
    }
    }).catch((er) => console.log(er))
  })
}

const postCart = (skuId) => {
    return db.query(`Update skus set quantity = quantity + 1 where id=${skuId}`)
}
module.exports = {
  getProduct,
  getStyles,
  postCart
}