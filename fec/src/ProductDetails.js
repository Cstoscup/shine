import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Overview from './Overview';
import RelatedProducts from './RelatedProducts';

function ProductDetails({currentProduct, setCurrentProduct, count, setCount, cart, setCart}) {
  const [left, setLeft] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([])

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

  return (
    <div className="product-details">
      <Overview currentProduct={currentProduct} count={count} setCount={setCount} cart={cart} setCart={setCart} />
      <RelatedProducts relatedProducts={relatedProducts} currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} left={left} setLeft={setLeft} />
    </div>
  )
}

export default ProductDetails