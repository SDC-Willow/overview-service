const chai = require('chai');
const {getProduct, getStyles} = require('../db/database.js');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const assert = chai.assert
chai.should();
describe('Test', () => {
  it('It should not return any styles for a product with no styles.', () =>{
   return assert.isRejected(getStyles(11), Error, 'No styles for this product id')
  });

  it('It should return a product with styles', () => {
   return getStyles(1).then((results) => {return results.results}).should.eventually.have.length(6)
  });

  it('It should return a product with styles and no skus', () => {
    return getStyles(2).then((results) => {return results.results[0].skus}).should.eventually.equal(null);
  })

  it('It should return a product', () => {
    return getProduct(1).then((results) => results).should.eventually.have.property('name');
  })

  it('It should return a product with features', () => {
    return getProduct(7).then((results) => {return results.features}).should.eventually.have.length(3)
  })
})

