import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Cart from './Cart';
import ProductDetails from './ProductDetails';
import ProductCard from './ProductCard';

function App() {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [checkoutPosition, setCheckoutPosition] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://ec2-3-129-229-2.us-east-2.compute.amazonaws.com/products?count=9')
      .then((results) => {
        setProducts(results.data);
      })
  }, [])

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
      { currentProduct ? null :
        <div className="all-products">
          {
            products.map((product, index) => {
              return (
                <ProductCard product={product} setCurrentProduct={setCurrentProduct} />
              )
            })
          }
        </div>

      }
      { currentProduct ? <ProductDetails currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} count={count} setCount={setCount} cart={cart} setCart={setCart} /> : null }
      <Cart checkoutPosition={checkoutPosition} setCheckoutPosition={setCheckoutPosition} total={total} setTotal={setTotal} cart={cart} setCart={setCart} count={count} setCount={setCount} currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} />
      <div className="checkout-overlay" id="checkout-overlay"></div>
    </div>
);


}

export default App;
