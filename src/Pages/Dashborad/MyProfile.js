import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const MyProfile = () => {
  const [user, loading, error] = useAuthState(auth);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    fetch(`http://localhost:5001/myprofile/${user.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 403) return toast.error("Failed to make admin");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("Succesfully update your profile");
          reset();
        } else {
          toast.error("Somethis error, Please try again");
        }
      });
  };

  if (loading) return <Loading></Loading>;
  return (
    <div className="hero ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-96 max-w-sm shadow-2xl bg-base-100">
          <h1 className="text-5xl">Update Your Info</h1>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="user name"
                name="name"
                value={user.displayName}
                disabled
                className="input input-bordered w-full max-w-xs mt-3"
              />
              <input
                type="email"
                placeholder="email"
                value={user.email}
                disabled
                name="email"
                className="input input-bordered w-full max-w-xs mt-3"
              />

              <input
                className="input input-bordered w-full max-w-xs mt-3"
                placeholder="Education"
                {...register("education", { required: true })}
              />
              <input
                className="input input-bordered w-full max-w-xs mt-3"
                placeholder="Location"
                {...register("location", { required: true })}
              />
              <input
                className="input input-bordered w-full max-w-xs mt-3"
                placeholder="Phone"
                {...register("phone", { required: true })}
              />
              <input
                className="input input-bordered w-full max-w-xs mt-3"
                placeholder="Social Link"
                {...register("sociallink", { required: true })}
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

export default MyProfile;
