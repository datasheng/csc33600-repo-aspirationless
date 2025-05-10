import React from "react";
import "./home.css";

function ItemBox({ image, title}) {
  return (
    <div className="item-box">
      <img src={image || "placeholder.jpg"} alt={title} />
      <h3>{title}</h3>
      <button>View Deals</button>
    </div>
  );
}

export default ItemBox;