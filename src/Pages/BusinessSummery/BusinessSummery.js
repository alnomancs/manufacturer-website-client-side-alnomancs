import React from "react";

const BusinessSummery = () => {
  return (
    <div className="mt-10">
      <h1 className="text-3xl rounded-lg">
        What Makes Us Different from other tool Manufacturers?
      </h1>
      <div className=" m-10 grid lg:grid-cols-4 grid-cols-1 gap-5">
        <div>
          <h1 className="text-5xl text-red-500">3000+</h1>
          <p className="text-2xl">SKUs</p>
        </div>
        <div>
          <h1 className="text-5xl text-red-500">40+</h1>
          <p className="text-2xl">Years of operation</p>
        </div>
        <div>
          <h1 className="text-5xl text-red-500">99%</h1>
          <p className="text-2xl">On time delivery</p>
        </div>
        <div>
          <h1 className="text-5xl text-red-500">500+</h1>
          <p className="text-2xl">Customer Glovally</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessSummery;
