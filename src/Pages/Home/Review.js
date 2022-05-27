import React from "react";
import { Link } from "react-router-dom";

const Review = ({ review }) => {
  const { clientName, description, ratings } = review;
  return (
    <div className="card w-96 shadow-xl border border-primary ">
      <div className="card-body">
        <p>
          {description.length < 100 ? description : description + "..."} by{" "}
          <Link className="text-indigo-500" to="">
            {clientName}
          </Link>
        </p>
        <p>Ratings {ratings}</p>
      </div>
    </div>
  );
};

export default Review;
