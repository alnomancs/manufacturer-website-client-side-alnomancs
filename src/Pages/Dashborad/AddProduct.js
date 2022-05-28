import React from "react";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddProduct = () => {
  const imgStorageKey = "21a231b01918bd6f0a07d5aad48271b4";

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    console.log(data);

    const formData = new FormData();
    const image = data.image[0];

    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const img = result.data.url;
          const product = {
            name: data.name,
            minimumQty: data.minimumQty,
            availableQty: data.availableQty,
            price: data.price,
            img: img,
            description: data.description,
          };
          fetch("http://localhost:5001/product", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((inserted) => {
              if (inserted.insertedId) {
                console.log(inserted);
                toast.success("Product Added successfully");
                reset();
              } else {
                toast.error("Failed to add the product. please try again");
              }
            });
        }
      });
  };
  return (
    <div className="hero ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-96 max-w-sm shadow-2xl bg-base-100">
          <h1 className="text-5xl">Add New Product</h1>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className="input input-bordered w-full max-w-xs mt-3"
                placeholder="Product Name"
                type="name"
                required
                {...register("name", { required: true })}
              />
              <input
                className="input input-bordered w-full max-w-xs mt-3"
                placeholder="Product Description"
                type="name"
                required
                {...register("description", { required: true })}
              />

              <input
                className="input input-bordered w-full max-w-xs mt-3"
                placeholder="Minimum order Quantity"
                type="number"
                required
                {...register("minimumQty", { required: true })}
              />
              <input
                className="input input-bordered w-full max-w-xs mt-3"
                placeholder="availableQty"
                type="number"
                required
                {...register("availableQty", { required: true })}
              />
              <input
                className="input input-bordered w-full max-w-xs mt-3"
                placeholder="Price per unit"
                type="number"
                required
                {...register("price", { required: true })}
              />

              <input
                type="file"
                className="input input-bordered w-full max-w-xs"
                {...register("image", {
                  required: { value: true, message: "Image is Required" },
                  
                })}
              />
              <input
                className="input input-bordered w-full max-w-xs mt-3"
                type="file"
                required
                {...register("image", { required: true })}
              />

              <input
                value="Update Info"
                className="btn btn-primary input input-bordered w-auto max-w-xs mt-3"
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
