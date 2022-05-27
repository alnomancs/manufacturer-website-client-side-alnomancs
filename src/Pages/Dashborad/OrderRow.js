import React from "react";
import { useNavigate } from "react-router-dom";

const OrderRow = ({ order, index, setCancleOrder, refetch }) => {
  //   refetch();
  const navigate = useNavigate();

  const handlePayment = () => {
    navigate(`payment/${order._id}`);
    // console.log(order);
  };

  return (
    <tr key={order._id}>
      <th>{index + 1}</th>
      <td>{order.productName}</td>
      <td>{order.productPrice}</td>
      <td>{order.orderQty}</td>
      <td>{order.totalAmount}</td>
      <td>
        {order.paymentStatus === "unpaid" ? (
          <>
            <label
              className="btn btn-error btn-xs"
              htmlFor="cancle-modal"
              onClick={() => {
                console.log(order);
                setCancleOrder(order);
              }}
            >
              Cancle
            </label>
            <label
              className="btn btn-success btn-xs mx-2"
              onClick={() => handlePayment()}
            >
              Pay now
            </label>
          </>
        ) : (
          <label className="btn btn-outline btn-xs">
            {order.paymentStatus}
          </label>
        )}
      </td>
    </tr>
  );
};

export default OrderRow;
