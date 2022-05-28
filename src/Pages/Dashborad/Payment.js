import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
  const navigate = useNavigate();

  const [stripePromise] = useState(() =>
    loadStripe(
      "pk_test_51L3coEHN4mnREwvOayN48axWny3cJJFU5IbQqYKn7Ad9pUmxPqZEg0Kzn0oraR0mD6APMuOhiN09zvhh7rGeV7dh00W8tSTP8P"
    )
  );

  const { id } = useParams();
  const url = `https://stark-fortress-97754.herokuapp.com/payment/${id}`;

  const { data: order, isLoading } = useQuery(["payment", id], () =>
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        localStorage.removeItem("accessToken");
        navigate("/");
      }
      return res.json();
    })
  );
  if (isLoading) return <Loading></Loading>;

  return (
    <div className="hero ">
      <div className="hero-content flex-col lg:flex-row">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="card-body text-left">
              <h1 className="text-2xl font-bold">Hello, {order.clientName}</h1>
              <h2 className="card-title">
                Payment For <br /> {order.productName}
              </h2>
              <p>Order Quantity: {order.orderQty}ps</p>
              <p>Product Price: ${order.productPrice}</p>
              <p>Payment status: {order.paymentStatus}</p>

              <h2 className="text-2xl">
                You have to pay : ${order.totalAmount}
              </h2>
            </div>
          </div>
        </div>

        {!isLoading && (
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="card-body text-left">
                <Elements stripe={stripePromise}>
                  <CheckoutForm order={order} />
                </Elements>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
