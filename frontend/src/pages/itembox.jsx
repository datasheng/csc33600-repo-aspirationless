import { Link } from 'react-router-dom';

function ItemBox({ image, title, price, productId }) {
  return (
    <div className="item-box">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{price}</p>

      <Link to={`/product/${productId}`}>
        <button>View Deals</button>
      </Link>
    </div>
  );
}

export default ItemBox;
