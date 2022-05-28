import React from "react";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  const { _id, name, description, minimumQty, availableQty, price, img } =
    product;

  const navigate = useNavigate();

  const handlePurchase = () => {
    navigate(`/purchase/${_id}`);
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={img} alt="tools" className="rounded-xl w-28" />
      </figure>
      <div className="card-body text-left">
        <h2 className="card-title">{name}</h2>
        <p>
          {description.length < 200
            ? description
            : description.slice(0, 98) + "..."}
        </p>
        <p>Minimum Order: {minimumQty}ps</p>
        <p>Available Qty: {availableQty}</p>
        <p>Price: ${price}</p>
        <div className="card-actions">
          <button className="btn btn-primary" onClick={() => handlePurchase()}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
