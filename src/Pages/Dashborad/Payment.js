import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51L3coEHN4mnREwvOayN48axWny3cJJFU5IbQqYKn7Ad9pUmxPqZEg0Kzn0oraR0mD6APMuOhiN09zvhh7rGeV7dh00W8tSTP8P"
);

const Payment = () => {
  const [loading] = useAuthState(auth);
  const [order, setOrder] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://stark-fortress-97754.herokuapp.com/order/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
      });
  }, [id]);

  if (loading) return <Loading></Loading>;
  return (
    <div className="hero ">
      <div className="hero-content flex-col lg:flex-row">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="card-body text-left">
              <h2 className="card-title">Payment</h2>
              <p>Product Name: {order.productName}</p>
              <p>Product Quantity: {order.orderQty}ps</p>
              <p>Product Price: ${order.productPrice}</p>
              <p>Total Amount: ${order.totalAmount}</p>
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <Elements stripe={stripePromise}>
              <CheckoutForm order={order}></CheckoutForm>
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
