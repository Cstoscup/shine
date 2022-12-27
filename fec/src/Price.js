import React from 'react'

function Price({price, salePrice}) {
  if (salePrice) {
    return (
      <div className="product-price">
        <span className="crossed-price">${price}.00</span>
        <span> ${salePrice}.00</span>
      </div>
    )
  }
  return (
    <div className="product-price">${price}.00</div>
  )
}

export default Price