import React, {useState, useEffect} from 'react';
import axios from 'axios';

function ProductCard({product, setCurrentProduct}) {
  const [productInfo, setProductInfo] = useState(null);
  const [productData, setProductData] = useState(null);
  const [left, setLeft] = useState(0);

  const carouselStyle = {
    transform: `translate(-${left}px, 0)`,
    transition: 'transform 900ms ease-in-out',
  };

  useEffect(() => {
    axios.get(`http://localhost:3002/products/${product}`)
      .then((data) => {
        setProductInfo(data.data)
      })
  }, [])

  useEffect(() => {
    axios.get(`http://localhost:3002/products/${product}/styles`)
      .then((data) => {
        setProductData(data.data.results[0])
      })
  }, [])

  function changeProduct(event) {
    event.preventDefault();
    setCurrentProduct(productInfo.id);
  }

  if (productInfo && productData) {
    return (
      <div className="related-product" onClick={changeProduct} style={carouselStyle}>
        { productData.photos.length > 0 ? <img src={productData.photos[0].url} alt="product" /> : <img src="https://media.istockphoto.com/id/894361286/photo/mr-cool-himself.jpg?b=1&s=170667a&w=0&k=20&c=NzT1YaWbG8Dnt4Gfh_hqRrYT9IEK0VIBvYzK20OMHiY=" alt="product"/>}
        <div className="related-product-information">
          <div className="related-product-name">{productInfo.name}</div>
          <div className="related-product-price">${productData.original_price}.00</div>
        </div>

      </div>
    )
  } else {
    return null;
  }
}

export default ProductCard;