import React from "react";

const AllOrdersRow = ({ order, index }) => {
  return (
    <tr key={order._id}>
      <th>{index + 1}</th>
      <td>{order.productName}</td>
      <td>{order.productPrice}</td>
      <td>{order.orderQty}</td>
      <td>{order.totalAmount}</td>
      <td>
        {order.paymentStatus === false ? (
          <label className="btn btn-error btn-xs mx-2">Unpaid</label>
        ) : (
          <label className="btn btn-success btn-xs">
            {order.paymentStatus && "Paid"}
          </label>
        )}
      </td>
    </tr>
  );
};

export default AllOrdersRow;
