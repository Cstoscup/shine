import React from 'react'

function Styles({style, styleIndex, setStyleIndex, index, setLeft}) {
  function changeStyle(event) {
    event.preventDefault();
    setLeft(0);
    setStyleIndex(event.target.id);
  }

  if (Number(styleIndex) === index) {
    return (
      <div className="selected-style">
        <i className="fa-solid fa-check style-check"></i>
        <img className="style-thumbnail-main" src={style.photos[0].thumbnail_url} alt={style.name} id={index} onClick={changeStyle} />
      </div>
    )
  }
  return (
    <div className="style-overlay">
      <img className="style-thumbnail" src={style.photos[0].thumbnail_url} alt={style.name} id={index} onClick={changeStyle} />
    </div>

  )
}

export default Styles