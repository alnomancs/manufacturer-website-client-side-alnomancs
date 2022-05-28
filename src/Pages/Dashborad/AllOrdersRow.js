import React from "react";

const AllOrdersRow = ({ order, index }) => {
  return (
    <tr key={order._id}>
      <th>{index + 1}</th>
      <td>{order.productName}</td>
      <td>{order.productPrice}</td>
      <td>{order.orderQty}</td>
      <td>{order.totalAmount}</td>
      
    </tr>
  );
};

export default AllOrdersRow;
