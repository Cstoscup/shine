import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import RelatedProducts from './RelatedProducts';
import Overview from './Overview';
import Cart from './Cart';

function App() {
  const [relatedProducts, setRelatedProducts] = useState([])
  const [currentProduct, setCurrentProduct] = useState(1);
  const [left, setLeft] = useState(0);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [checkoutPosition, setCheckoutPosition] = useState(0);

  useEffect(() => {
    setLeft(0)
    if (localStorage.getItem('cart')) {
      setCart(JSON.parse(localStorage.getItem('cart')));
    }
    if (localStorage.getItem('count')) {
      setCount(JSON.parse(localStorage.getItem('count')));
    }
    axios.get(`http://localhost:3002/products/${currentProduct}/related`)
      .then((data) => {
        let related = [];
        for (var i = 0; i < data.data.length; i++) {
          if (!related.includes(data.data[i])) {
            related.push(data.data[i])
          }
        }
        setRelatedProducts(related)
      })
  }, [currentProduct])

  function viewCart(event) {
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
      <div className="product-details">
        <Overview currentProduct={currentProduct} count={count} setCount={setCount} cart={cart} setCart={setCart} />
        <RelatedProducts relatedProducts={relatedProducts} currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} left={left} setLeft={setLeft} />
      </div>
      <Cart checkoutPosition={checkoutPosition} setCheckoutPosition={setCheckoutPosition} total={total} setTotal={setTotal} cart={cart} setCart={setCart} count={count} setCount={setCount} />
    </div>
  );
}

export default App;
