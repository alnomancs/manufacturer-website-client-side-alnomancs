import React from "react";

const AllProductsRow = ({ product, index, refetch, setDeleteProduct }) => {
  const { name, description, minimumQty, availableQty, price, img } = product;
  return (
    <tr key={product._id}>
      <th>{index + 1}</th>
      <th>
        <div className="avatar">
          <div className="w-24 rounded-xl">
            <img src={img} alt="" />
          </div>
        </div>
      </th>
      <td>{name}</td>
      <td>
        {description?.length > 30
          ? description.slice(0, 10) + "..."
          : description}
      </td>

      <td>{minimumQty}</td>
      <td>{availableQty}</td>
      <td>{price}</td>
      <td>
        <label
          className="btn btn-error btn-xs"
          htmlFor="delete-product-modal"
          onClick={() => {
            setDeleteProduct(product);
          }}
        >
          Delete
        </label>
      </td>
    </tr>
  );
};

export default AllProductsRow;
