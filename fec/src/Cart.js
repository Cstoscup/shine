import React, {useState, useEffect} from 'react';
import Shipping from './Shipping';
import Payment from './Payment';
import axios from 'axios';

function Cart({checkoutPosition, setCheckoutPosition, total, setTotal, cart, setCart, count, setCount, currentProduct, setCurrentProduct}) {
  const [slide, setSlide] = useState(1);
  const [shipping, setShipping] = useState(9.99);
  const [shippingInfo, setShippingInfo] = useState({});

  console.log(cart);

  useEffect(() => {
    let totalPrice = 0;

    for (var i = 0; i < cart.length; i++) {
      let itemPrice = cart[i].price * cart[i].quantity;
      totalPrice = totalPrice + itemPrice;
    }

    setTotal(totalPrice);

    if (totalPrice >= 300) {
      setShipping(0);
    } else {
      setShipping(9.99);
    }
  }, [count])

  const checkoutStyle = {
    transform: `translate(-${checkoutPosition}px, 0)`,
    transition: 'transform 900ms ease-in-out',
  };

  function closeCart(event) {
    setCheckoutPosition(0);
    document.getElementById('checkout-overlay').classList.remove('show-me');
  }

  function increaseQuantity(event) {
    event.preventDefault();
    let index = event.target.parentElement.id;
    let newCart = cart;
    if (newCart[index].quantity !== newCart[index].totalQuantity) {
      newCart[index].quantity++;
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(cart));
      setCount(count + 1);
      localStorage.setItem('count', JSON.stringify(count + 1));
    }

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
    localStorage.setItem('cart', JSON.stringify(cart));
    setCount(count - 1);
    localStorage.setItem('count', JSON.stringify(count - 1));
  }

  function placeOrder(event) {
    event.preventDefault();
    cart.forEach((item) => {
      axios.post('http://localhost:3002/skus', {style_id: item.styleId, size: item.size, quantity: item.quantity})
        .then((response) => {
          console.log(response);
        })
    })
    setCart([]);
    setCount(0);
    setCurrentProduct(null);
    localStorage.setItem('cart', JSON.stringify([]));
    localStorage.setItem('count', JSON.stringify(0));
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
                <div key={index} className="cart-row">
                  <div className="cart-col-product">{item.product}</div>
                  <div className="cart-col-style">{item.style}</div>
                  <div className="cart-col-size">{item.size}</div>
                  <div className="cart-col-quantity" id={index}>
                    <i class="cart-quantity-minus fa-solid fa-minus" onClick={decreaseQuantity}></i>
                    <div className="cart-quantity">{item.quantity}</div>
                    <i class="cart-quantity-plus fa-solid fa-plus" onClick={increaseQuantity}></i>
                  </div>
                  <div className="cart-col-price">{item.quantity} x ${item.price}.00 = ${item.quantity * item.price}.00</div>
                </div>
              )
            })
          }
        </div>
        <div className="total-price">
          <div className="price-breakdown">
            <div>Subtotal:</div><div>${total}.00</div>
          </div>
          <div className="price-breakdown">
            <div>Shipping:</div>{ shipping > 0 ? <div>${shipping.toFixed(2)}</div> : <div>FREE</div>}
          </div>
          <div className="price-breakdown">
            <div><strong>Total: </strong></div><div><strong>${(total + shipping).toFixed(2)}</strong></div>
          </div>
        </div>
        { total >= 300 ? null : <div className="free-shipping-ad">Add ${(300 - total).toFixed(2)} to your cart for free shipping!</div>}
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
        <Shipping slide={slide} setSlide={setSlide} shippingInfo={shippingInfo} setShippingInfo={setShippingInfo} />
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
        <Payment slide={slide} setSlide={setSlide} />
      </div>
    )
  }

  if (slide === 4) {
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
          <div className="stage">
            <div className="number">2</div>
            <div>Payment and Billing</div>
          </div>
          <div>
            <div className="number current">3</div>
            <div>Review and Place Order</div>
          </div>
        </div>
        <div>Ship to: </div>
        <div className="ship-to-address">
          <div>{shippingInfo.firstName} {shippingInfo.lastName}</div>
          <div>{shippingInfo.address1} {shippingInfo.address2}</div>
          <div>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</div>
        </div>
        <div className="billing-buttons">
          <div className="checkout-button" onClick={() => { setSlide(slide - 1) }}>Return to Payment and Billing</div>
          <div className="checkout-button" onClick={placeOrder}>Place Order</div>
        </div>
      </div>
    )
  }

}

export default Cart;