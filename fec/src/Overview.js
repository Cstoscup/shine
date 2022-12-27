import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Styles from './Styles';
import Price from './Price';
import Thumbnails from './Thumbnails';
import SelectSku from './SelectSku';

function Overview({currentProduct, count, setCount, cart, setCart}) {
  const [productInfo, setProductInfo] = useState(null);
  const [productData, setProductData] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [styleIndex, setStyleIndex] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    setPhotoIndex(0);
    setStyleIndex(0);
    setLeft(0);
    axios.get(`http://localhost:3002/products/${currentProduct}`)
      .then((data) => {
        setProductInfo(data.data);
      })
  }, [currentProduct])

  useEffect(() => {
    axios.get(`http://localhost:3002/products/${currentProduct}/styles`)
      .then((data) => {
        setProductData(data.data.results);
      })
  }, [currentProduct])

  function moveLeft(event) {
    event.preventDefault();
    setLeft(left - 85);
  }

  function moveRight(event) {
    event.preventDefault();
    setLeft(left + 85);
  }

  if (productInfo && productData) {
    return (
      <div>
        <div className="overview">
          <div>
          { productData[styleIndex].photos.length > 0 ? <img className="overview-image" src={productData[styleIndex].photos[photoIndex].url} alt="overview" /> : <img className="overview-image" src="https://media.istockphoto.com/id/894361286/photo/mr-cool-himself.jpg?b=1&s=170667a&w=0&k=20&c=NzT1YaWbG8Dnt4Gfh_hqRrYT9IEK0VIBvYzK20OMHiY=" alt="overview" />}
            <div className="thumbnail-carousel-container">
            <Thumbnails photos={productData[styleIndex].photos} left={left} setPhotoIndex={setPhotoIndex} />
            {
              left === 0 ? null :
                <span onClick={moveLeft} className="thumbnail-left-arrow">
                  <span class="fa-stack fa-2x">
                    <i class="fa-solid fa-circle fa-stack-2x"></i>
                    <i class="fa-solid fa-chevron-left fa-stack-1x fa-inverse"></i>
                  </span>
                </span>
              }
            {
              left < (productData[styleIndex].photos.length - 5) * 85 ?
                <span onClick={moveRight} className="thumbnail-right-arrow">
                  <span class="fa-stack fa-2x">
                    <i class="fa-solid fa-circle fa-stack-2x"></i>
                    <i class="fa-solid fa-chevron-right fa-stack-1x fa-inverse"></i>
                  </span>
                </span> : null}
            </div>
          </div>
          <div className="overview-right-side">
            <div className="product-category">{productInfo.category}</div>
            <div className="product-name">{productInfo.name}</div>
            <Price price={productData[styleIndex].original_price} salePrice={productData[styleIndex].sale_price} />
            <div className="product-style"><strong>Style: </strong>{productData[styleIndex].name}</div>
            <div className="product-styles">
              {
                productData.map((style, index) => {
                  return <Styles key={index} style={productData[index]} index={index} styleIndex={styleIndex} setStyleIndex={setStyleIndex} setLeft={setLeft} />
                })
              }
            </div>
            <SelectSku styleIndex={styleIndex} productInfo={productInfo} productData={productData} count={count} setCount={setCount} cart={cart} setCart={setCart} />
          </div>
        </div>

        <div className="product-lower-section">
          <div className="product-description">
            <div>
              <strong>Description: </strong>
            </div>
            {productInfo.description}
          </div>
          <div className="product-features">
            <strong>Features:</strong>
            {
              productInfo.features.map((feature, index) => {
                return (
                  <div key={index}>
                    <span>{feature.feature}: </span>
                    <span>{feature.value}</span>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  } else {
    return null;
  }
}

export default Overview