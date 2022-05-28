import React from "react";
import { toast } from "react-toastify";

const AllOrdersRow = ({ order, index }) => {
  const handleDelete = () => {
    const answer = window.confirm("Delete data?");
    if (answer) {
      console.log("delete");

      const url = `https://manufacturer-44940.web.app/order/${order._id}`;
      fetch(url, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            toast.success("your order has been cancled");
          }
        });
    } else {
      console.log("not delete");
    }
  };
  return (
    <tr key={order._id}>
      <th>{index + 1}</th>
      <td>{order.productName}</td>
      <td>{order.productPrice}</td>
      <td>{order.orderQty}</td>
      <td>{order.totalAmount}</td>
      <td>
        {order.paymentStatus === false ? (
          <label className="btn btn-error btn-xs mx-2" onClick={handleDelete}>
            Unpaid
          </label>
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
