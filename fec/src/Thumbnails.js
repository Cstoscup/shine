import React from 'react'

function Thumbnails({photos, left, setPhotoIndex}) {
  const carouselStyle = {
    transform: `translate(-${left}px, 0)`,
    transition: 'transform 900ms ease-in-out',
  };

  function changePhoto(event) {
    event.preventDefault();
    setPhotoIndex(event.target.id);
  }

  return (
    <div className="thumbnail-carousel">
      {
        photos.map((photo, index) => {
          return (
            <div className="thumbnail" style={carouselStyle} key={index}>
              <img className="thumbnail-carousel-photo" src={photo.thumbnail_url} alt="thumbnail" id={index} onClick={changePhoto} />
            </div>
          )
        })
      }
    </div>

  )
}

export default Thumbnails