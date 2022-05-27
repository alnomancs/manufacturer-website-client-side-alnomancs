import React, { useEffect, useState } from "react";
import Review from "./Review";
import divider from "../../images/Ozar_O2-1.png";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/reviews")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReviews(data);
      });
  }, []);

  return (
    <div className="mt-10 flex flex-col w-full border-opacity-50">
      <div>
        <h1 className="text-5xl">Client Testimonials</h1>
      </div>
      <img src={divider} alt="" />
      <h1 className="text-2xl">
        We have worked with hundreds of different clients around the globe.
        Check what a selection of them have to say about us.
      </h1>
      <div className=" mt-10 grid justify-items-center lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {reviews.map((review) => (
          <Review key={review._id} review={review}></Review>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
