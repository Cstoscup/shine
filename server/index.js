const express = require('express');
const compression = require('compression')
const { Product, Feature, Style, Photo, Sku, Related, Customer } = require('./database.js');
const { Op } = require("sequelize");
const cors = require('cors')


const app = express();
const port = 3002;

app.use(cors());
app.use(compression());
app.use(express.json());

app.post('/customer', (req, res) => {
  console.log('REQ BODY: ', req.body)
  Customer.create({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    phone_number: req.body.phoneNumber,
    address_1: req.body.address1,
    address_2: req.body.address2,
    city: req.body.city,
    state: req.body.state,
    zip_code: req.body.zipCode
  })
    .then((response) => {
      res.send(response);
    })
})

app.get('/products', (req, res) => {
  let page = req.query.page || 1;
  let count = req.query.count || 5;

  Product.findAll({
    where: {
      id: {
        [Op.gte]: (page - 1) * count,
        [Op.lte]: ((page - 1) * count) + count
      }
    }
  })
    .then((products) => {
      res.send(products);
    })
})

app.get('/products/:product_id', (req, res) => {
  Product.findAll({
    where: { id: req.params.product_id },
    attributes: ['id', 'name', 'slogan', 'description', 'category', 'default_price'],
    include: [{
      model: Feature,
      attributes: ['feature', 'value']
    }]
  })
    .then((product) => {
      res.send(product[0]);
    })
})

app.get('/products/:product_id/styles', (req, res) => {
  Style.findAll({
    where: { ProductId: req.params.product_id },
    attributes: [['id', 'style_id'], 'name', 'original_price', 'sale_price', ['default', 'default?']],
    include: [{
      model: Photo,
      attributes: ['thumbnail_url', 'url']
    }, {
      model: Sku,
      attributes: ['id', 'quantity', 'size']
    }]
  })
    .then((styles) => {
      res.send({ "product_id": req.params.product_id, "results": styles});
    })
})

app.get('/products/:product_id/related', (req, res) => {
  Related.findAll({ where: { current_product_id: req.params.product_id }, attributes: ['related_product_id']})
    .then((products) => {
      res.send(products.map((product) => product.related_product_id));
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})