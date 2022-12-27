import React from 'react';
import RelatedProduct from './RelatedProduct';

function RelatedProducts({ relatedProducts, currentProduct, setCurrentProduct, left, setLeft }) {

  function moveLeft(event) {
    event.preventDefault();
    console.log(left);
    setLeft(left - 272);
  }

  function moveRight(event) {
    event.preventDefault();
    console.log(left);
    setLeft(left + 272);
  }

  return (
    <div className="related-products">
    <div className="related-carousel">
      {
        relatedProducts.map((product, index) => {
          return <RelatedProduct key={index} product={product} currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} left={left} />
        })
      }
    </div>
    { left === 0 ? null : <span onClick={moveLeft} className="related-left-arrow"><i class="fa-solid fa-chevron-left fa-2xl"></i></span>}
    { left < (relatedProducts.length - 4) * 272 ? <span onClick={moveRight} className="related-right-arrow"><i class="fa-solid fa-chevron-right fa-2xl"></i></span> : null}
  </div>
  )
}

export default RelatedProducts