import React, {useState} from 'react'

function Cart({checkoutPosition, setCheckoutPosition, total, cart}) {
  const checkoutStyle = {
    transform: `translate(-${checkoutPosition}px, 0)`,
    transition: 'transform 900ms ease-in-out',
  };

  function closeCart(event) {
    setCheckoutPosition(0);
  }

  return (
    <div className="checkout" style={checkoutStyle}>
      <div className="checkout-heading">
        <h1>Your Cart</h1>
        <span class="fa-stack fa-2x" onClick={closeCart}>
          <i class="fa-solid fa-circle fa-stack-2x"></i>
          <i class="fa-solid fa-x fa-stack-1x fa-inverse"></i>
        </span>
      </div>

      <div className="cart-table">
        <div className="cart-row cart-heading-row">
          <div className="cart-col-product"><strong>Product</strong></div>
          <div className="cart-col-style"><strong>Style</strong></div>
          <div className="cart-col-size"><strong>Size</strong></div>
          <div className="cart-col-quantity"><strong>Quantity</strong></div>
          <div className="cart-col-price"><strong>Price</strong></div>
        </div>
        {
          cart.map((item) => {
            return (
              <div className="cart-row">
                <div className="cart-col-product">{item.product}</div>
                <div className="cart-col-style">{item.style}</div>
                <div className="cart-col-size">{item.size}</div>
                <div className="cart-col-quantity">{item.quantity}</div>
                <div className="cart-col-price">{item.quantity} x ${item.price}.00 = ${item.quantity * item.price}.00</div>
              </div>
            )
          })
        }
      </div>
      <div className="total-price">Total: ${total}.00</div>
      <div className="checkout-button">Check Out</div>
    </div>
  )
}

export default Cart;