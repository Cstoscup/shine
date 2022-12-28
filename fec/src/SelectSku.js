import React, { useState, useEffect } from 'react'

function SelectSku({styleIndex, productInfo, productData, count, setCount, cart, setCart}) {
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedQuantity, setSelectedQuantity] = useState({});
  const [size, setSize] = useState(productData[styleIndex].skus[0].size)
  const [quantity, setQuantity] = useState(0)
  const [quantityOptions, setQuantityOptions] = useState([])

  useEffect(() => {
    setSelectedSize('SELECT SIZE');
    setSelectedQuantity(1);
    setQuantity(0);
  }, [styleIndex])

  useEffect(() => {
    let quantityArray = []

    for (var i = 1; i <= quantity; i++) {
      quantityArray.push(i);
    }

    setQuantityOptions(quantityArray);
  }, [quantity])

  function selectSize(event) {
    event.preventDefault();
    setSize(event.target.value);
    setSelectedSize(event.target.value);

    for (var i = 0; i < productData[styleIndex].skus.length; i++) {
      if (productData[styleIndex].skus[i].size === event.target.value) {
        setQuantity(productData[styleIndex].skus[i].quantity)
      }
    }
  }

  function selectQuantity(event) {
    event.preventDefault();
    setSelectedQuantity(event.target.value);
  }

  function addToCart(event) {
    event.preventDefault();
    setCount(count + Number(selectedQuantity));
    let newCart = cart;
    newCart.push({
      product: productInfo.name,
      style: productData[styleIndex].name,
      size: size,
      quantity: Number(selectedQuantity),
      totalQuantity: Number(quantity),
      price: productData[styleIndex].sale_price || productData[styleIndex].original_price
    })
  }

  return (
    <div>
      <div className="select-size-quantity-section">
        <select value={selectedSize} onChange={selectSize} className="select-size">
          <option value="select-size">SELECT SIZE</option>
          {
            productData[styleIndex].skus.map((sku, index) => {
              return (
                <option key={index} value={sku.size}>{sku.size}</option>
              )
            })
          }
        </select>
        <select value={selectedQuantity} onChange={selectQuantity} className="select-quantity">
          {
            quantityOptions.map((skuAmount, index) => {
              return (
                <option key={index} value={skuAmount}>{skuAmount}</option>
              )
            })
          }
        </select>

      </div>
      <div className="add-to-cart-button" onClick={addToCart}>Add to cart</div>
    </div>

  )
}

export default SelectSku