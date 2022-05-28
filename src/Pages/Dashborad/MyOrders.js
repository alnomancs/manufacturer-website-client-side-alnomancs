import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";
import OrderDeleteModal from "./OrderDeleteModal";
import OrderRow from "./OrderRow";

const MyOrders = () => {
  const [cancleOrder, setCancleOrder] = useState(null);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useQuery("users", () =>
    fetch(
      `https://stark-fortress-97754.herokuapp.com/orders?clientEmail=${user.email}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    ).then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        localStorage.removeItem("accessToken");
        return navigate("/");
      }
      return res.json();
    })
  );
  if (loading || isLoading) return <Loading></Loading>;
  if (error || isError) return console.log(error);

  return (
    <div className="overflow-auto">
      <h2 className="text-5xl ">My orders {orders?.length}</h2>

      <div className="overflow-x-auto">
        <table className="table relative w-full">
          <thead>
            <tr>
              <th className="sticky top-0"></th>
              <th className="sticky top-0">Product Name</th>
              <th className="sticky top-0">Quantity</th>
              <th className="sticky top-0">Price</th>
              <th className="sticky top-0">Total</th>
              <th className="sticky top-0">Status</th>
              <th className="sticky top-0">Tr. id</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => (
              <OrderRow
                key={order?._id}
                order={order}
                index={index}
                refetch={refetch}
                setCancleOrder={setCancleOrder}
              ></OrderRow>
            ))}
          </tbody>
        </table>
      </div>
      {cancleOrder && (
        <OrderDeleteModal
          key={cancleOrder?._id}
          cancleOrder={cancleOrder}
          setCancleOrder={setCancleOrder}
          refetch={refetch}
        ></OrderDeleteModal>
      )}
    </div>
  );
};

export default MyOrders;
