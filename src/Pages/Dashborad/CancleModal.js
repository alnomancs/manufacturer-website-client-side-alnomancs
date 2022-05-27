import React from "react";
import { toast } from "react-toastify";

const CancleModal = ({ cancleOrder, setCancleOrder, refetch }) => {
  const handleCancle = () => {
    const url = `http://localhost:5001/order/${cancleOrder._id}`;
    console.log(url);
    fetch(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        // authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    toast.success("your order has been cancled");

    setCancleOrder(null);
    refetch();
  };
  return (
    <div>
      {/* cancle modal */}
      <input type="checkbox" id="cancle-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <h3 className="font-bold text-lg">{cancleOrder.productName}</h3>
          <p className="py-4">Do You want to cancle the order</p>
          <div className="modal-action">
            <label
              htmlFor="cancle-modal"
              className="btn btn-xs btn-success"
              onClick={() => handleCancle()}
            >
              Yes
            </label>
            <label htmlFor="cancle-modal" className="btn btn-xs btn-error">
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancleModal;
