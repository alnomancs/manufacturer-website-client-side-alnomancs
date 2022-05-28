import { signOut } from "firebase/auth";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";
import AllOrdersRow from "./AllOrdersRow";

const AllOrders = () => {
  const navigate = useNavigate();
  const { data: orders, isLoading } = useQuery("users", () =>
    fetch(`https://stark-fortress-97754.herokuapp.com/orders`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        localStorage.removeItem("accessToken");
        return navigate("/");
      }
      return res.json();
    })
  );

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="overflow-auto">
      <h2 className="text-5xl ">My orders {orders?.length}</h2>

      <div className="overflow-x-auto">
        <table className="table relative w-full">
          <thead>
            <tr>
              <th className="sticky top-0">Sl</th>
              <th className="sticky top-0">Product Name</th>
              <th className="sticky top-0">Quantity</th>
              <th className="sticky top-0">Price</th>
              <th className="sticky top-0">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => (
              <AllOrdersRow
                key={order?._id}
                order={order}
                index={index}
              ></AllOrdersRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
