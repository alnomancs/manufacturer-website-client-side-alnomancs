import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const AddReview = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const handleReview = (event) => {
    event.preventDefault();
    const review = {
      ratings: event.target.ratings.value,
      description: event.target.description.value,
      clientEmail: user.email,
      clientName: user.displayName,
    };
    console.log(review);
    // send to your database
    fetch(`https://stark-fortress-97754.herokuapp.com/review`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(review),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          signOut(auth);
          localStorage.removeItem("accessToken");
          return navigate("/");
        }
        return res.json();
      })
      .then((inserted) => {
        if (inserted.insertedId) {
          toast.success("We receive your review");
        } else {
          toast.error("Failed to add the review");
        }
      });
  };

  if (loading) return <Loading></Loading>;

  return (
    <div className="hero ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-96 max-w-sm shadow-2xl bg-base-100">
          <h1 className="text-5xl">Add a review</h1>
          <div className="card-body">
            <form
              onSubmit={handleReview}
              className="grid grid-cols-1 gap-3 justify-items-center"
            >
              <select
                className="select select-bordered w-96 max-w-xs"
                name="ratings"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>

              <textarea
                className="textarea textarea-bordered w-96 max-w-xs"
                placeholder="description"
                name="description"
                required
              ></textarea>

              <input
                type="submit"
                value="Add Review"
                placeholder="Submit"
                className="btn btn-primary input input-bordered w-auto max-w-xs"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
