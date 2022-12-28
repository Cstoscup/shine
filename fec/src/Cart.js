import React, {useState, useEffect} from 'react';
import Shipping from './Shipping';

function Cart({checkoutPosition, setCheckoutPosition, total, cart, setCart}) {
  const [slide, setSlide] = useState(1);
  const [render, setRender] = useState(0)

  const checkoutStyle = {
    transform: `translate(-${checkoutPosition}px, 0)`,
    transition: 'transform 900ms ease-in-out',
  };

  function closeCart(event) {
    setCheckoutPosition(0);
  }

  function increaseQuantity(event) {
    event.preventDefault();
    let index = event.target.parentElement.id;
    let newCart = cart;
    newCart[index].quantity++;
    setCart(newCart);
    setRender(render + 1);
  }

  function decreaseQuantity(event) {
    event.preventDefault();
    let index = event.target.parentElement.id;
    let newCart = cart;
    newCart[index].quantity--;
    if (newCart[index].quantity === 0) {
      newCart.splice(index, 1);
    }
    setCart(newCart);
    setRender(render - 1);
  }

  if (cart.length === 0) {
    return (
      <div className="checkout" style={checkoutStyle}>
        <div className="checkout-heading">
          <h1>Your Cart</h1>
          <span class="fa-stack fa-2x" onClick={closeCart}>
            <i class="fa-solid fa-circle fa-stack-2x"></i>
            <i class="fa-solid fa-x fa-stack-1x fa-inverse"></i>
          </span>
        </div>
        <div>Oops! You haven't added anything to your cart yet!</div>
      </div>
    )
  }

  if (slide === 1) {
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
            cart.map((item, index) => {
              return (
                <div className="cart-row">
                  <div className="cart-col-product">{item.product}</div>
                  <div className="cart-col-style">{item.style}</div>
                  <div className="cart-col-size">{item.size}</div>
                  <div className="cart-col-quantity" id={index}>
                    <div className="cart-quantity-minus" onClick={decreaseQuantity}>-</div>
                    <div className="cart-quantity">{item.quantity}</div>
                    <div className="cart-quantity-plus" onClick={increaseQuantity}>+</div>
                  </div>
                  <div className="cart-col-price">{item.quantity} x ${item.price}.00 = ${item.quantity * item.price}.00</div>
                </div>
              )
            })
          }
        </div>
        <div className="total-price">Total: ${total}.00</div>
        <div className="checkout-button" onClick={() => { setSlide(slide + 1) }}>Check Out</div>
      </div>
    )
  }

  if (slide === 2) {
    return (
      <div className="checkout" style={checkoutStyle}>
        <div className="checkout-heading">
          <h1>Shipping Details</h1>
          <span class="fa-stack fa-2x" onClick={closeCart}>
            <i class="fa-solid fa-circle fa-stack-2x"></i>
            <i class="fa-solid fa-x fa-stack-1x fa-inverse"></i>
          </span>
        </div>
        <Shipping slide={slide} setSlide={setSlide} />
      </div>
    )
  }

  if (slide === 3) {
    return (
      <div className="checkout" style={checkoutStyle}>
        <div className="checkout-heading">
          <h1>Payment and Billing</h1>
          <span class="fa-stack fa-2x" onClick={closeCart}>
            <i class="fa-solid fa-circle fa-stack-2x"></i>
            <i class="fa-solid fa-x fa-stack-1x fa-inverse"></i>
          </span>
        </div>
        <div className="checkout-tracker">
          <div className="stage">
            <div className="number"><i class="fa-solid fa-check"></i></div>
            <div>Shipping Details</div>
          </div>
          <div>
            <div className="number current">2</div>
            <div>Payment and Billing</div>
          </div>
          <div className="stage">
            <div className="number">3</div>
            <div>Review and Place Order</div>
          </div>
        </div>
        <div className="billing-buttons">
          <div className="checkout-button" onClick={() => { setSlide(slide - 1) }}>Return to Shipping Details</div>
          <div className="checkout-button">Continue</div>
        </div>
      </div>
    )
  }

}

export default Cart;