import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Cart from './Cart';
import ProductDetails from './ProductDetails';

function App() {
  const [currentProduct, setCurrentProduct] = useState(3);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [checkoutPosition, setCheckoutPosition] = useState(0);

  function viewCart(event) {
    document.getElementById('checkout-overlay').classList.add('show-me');
    let totalPrice = 0;
    for (var i = 0; i < cart.length; i++) {
      let itemPrice = cart[i].price * cart[i].quantity;
      totalPrice = totalPrice + itemPrice;
    }
    setTotal(totalPrice);
    setCheckoutPosition(802);
  }


  return (
    <div className="App">
      <div className="heading">
        <div className="store-name">Shine</div>
        <div className="cart-with-count" onClick={viewCart}>
          { count > 0 ? <div className="cart-count">{count}</div> : null }
          <i className="cart fa-solid fa-cart-shopping"></i>
        </div>
      </div>
      <ProductDetails currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} count={count} setCount={setCount} cart={cart} setCart={setCart} />
      <Cart checkoutPosition={checkoutPosition} setCheckoutPosition={setCheckoutPosition} total={total} setTotal={setTotal} cart={cart} setCart={setCart} count={count} setCount={setCount} />
      <div className="checkout-overlay" id="checkout-overlay"></div>
    </div>
);


}

export default App;
