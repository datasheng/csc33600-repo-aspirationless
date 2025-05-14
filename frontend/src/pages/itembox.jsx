import { Link } from 'react-router-dom';

function ItemBox({ image, title, price }) {
    return (
        <div className="item-box">
            <img src={image} alt={title} />
            <div className="item-details">
                <h3>{title}</h3>
                <p>{price}</p>
            </div>
        </div>
    );
}

export default ItemBox;
