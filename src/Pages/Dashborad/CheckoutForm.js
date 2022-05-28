import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({ order }) => {
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [transaactionId, setTransaactionId] = useState("");
  const [setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { _id, totalAmount, clientEmail, clientName } = order;

  useEffect(() => {
    fetch("https://stark-fortress-97754.herokuapp.com/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ totalAmount }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      });
  }, [totalAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setCardError(error?.message || "");
    setSuccess("");
    setProcessing(true);

    //confirm payment
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: clientName,
            email: clientEmail,
          },
        },
      });
    if (intentError) {
      setCardError(intentError?.message);
      success("");
      setProcessing(false);
    } else {
      setCardError("");
      console.log(paymentIntent);
      setTransaactionId(paymentIntent.id);
      setSuccess("Congrates your payment is completed");

      const payment = {
        appointment: _id,
        transactionId: paymentIntent.id,
      };

      //update transactioi id in
      //   fetch(`https://stark-fortress-97754.herokuapp.com/order/:${_id}`, {
      //     method: "PATCH",
      //     headers: {
      //       authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      //     },
      //     body: JSON.stringify(payment),
      //   })
      //     .then((res) => res.json)
      //     .then((data) => {
      //       console.log(data);
      //       setProcessing(false);
      //     });

      fetch(`https://stark-fortress-97754.herokuapp.com/order/${_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          setProcessing(false);
          console.log(data);
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-xs btn-primary w-10"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-600">{cardError}</p>}
      {success && (
        <div className="text-green-600">
          <p>{success}</p>
          <p>Your TransactionId: {transaactionId}</p>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
