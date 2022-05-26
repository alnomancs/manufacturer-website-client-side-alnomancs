import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../Shared/Loading";

const Purchase = () => {
  const [qty, setQty] = useState(false);

  const { id } = useParams();
  const url = `http://localhost:5001/purchase/${id}`;

  const { data: product, isLoading } = useQuery(["purchase", id], () =>
    fetch(url).then((res) => res.json())
  );

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data.qty);
    console.log(product.minimumQty);
    console.log(product.availableQty);

    if (data.qty >= product.minimumQty || data.qty <= product.availableQty) {
      toast.success("done");
    } else {
      toast.error("Please update your quantity");
    }
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
                      console.log(product.minimumQty);
                      const qty = e.target.value;
                      console.log(qty);
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
                  value="Pay now"
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
