import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const Purchase = () => {
  const [user, loading, error] = useAuthState(auth);
  const [qty, setQty] = useState(false);

  const { id } = useParams();
  const url = `http://localhost:5001/purchase/${id}`;

  const { data: product, isLoading } = useQuery(["purchase", id], () =>
    fetch(url).then((res) => res.json())
  );

  const { register, handleSubmit } = useForm();

  if (loading) return <Loading></Loading>;
  if (error) return console.log(error);

  const onSubmit = (data) => {
    const order = {
      productId: product._id,
      productName: product.name,
      productPrice: product.price,
      orderQty: data.qty,
      clientEmail: user.email,
      paymentStatus: "unpaid",
    };
    console.log(order);

    //send order to database
    fetch("http://localhost:5001/order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((inserted) => {
        toast("Your order placed");
        console.log(inserted);
      });
  };

  if (isLoading) return <Loading></Loading>;
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src={product.img}
          alt=""
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="card-body text-left">
              <h2 className="card-title">{product.name}</h2>
              <p>Minimum Order: {product.minimumQty}ps</p>
              <p>Available Qty: {product.availableQty}</p>
              <p>Price: ${product.price}</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  className="input input-bordered w-full max-w-xs"
                  placeholder="Quantity"
                  required
                  type="number"
                  {...register("qty", {
                    onChange: (e) => {
                      const qty = e.target.value;

                      if (
                        parseInt(qty) >= parseInt(product.minimumQty) &&
                        parseInt(qty) <= parseInt(product.availableQty)
                      ) {
                        setQty(true);
                      } else {
                        toast.error(
                          `You have to ordar minimum ${product.minimumQty}ps and Below ${product.availableQty}ps`
                        );
                        setQty(false);
                      }
                    },
                  })}
                />

                <input
                  value="Order now"
                  type="submit"
                  className="mt-5 btn btn-primary"
                  disabled={qty ? false : true}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
