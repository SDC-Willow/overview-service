const db = require('./login.js');

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
  })
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
module.exports = getProduct;