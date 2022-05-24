import React from "react";
import icon1 from "../../images/idea1.png";
import icon2 from "../../images/quality.png";
import icon3 from "../../images/support.png";

import divider from "../../images/Ozar_O2-1.png";

const WhyChoose = () => {
  return (
    <div className="mt-10 flex flex-col w-full border-opacity-50">
      <div>
        <h1 className="text-5xl">Why Choose Us?</h1>
      </div>
      <img src={divider} alt="" />
      <h1 className="text-2xl">
        Ever since, we have dedicated ourselves to making industrial Hand tools
        with the goal to become the best manufacturers of Hand Tools in India.
        Here’s some reasons why we’re unique
      </h1>
      <div className=" mt-10 grid justify-items-center lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        <div className="grid justify-items-center gap-5">
          <img src={icon1} alt="" />
          <h2 className="font-bold">Expertise & Innovation</h2>
          <p>
            Since 1978 we’ve been supplying the highest quality tools to a
            variety of specialist markets.
          </p>
        </div>
        <div className="grid justify-items-center gap-5">
          <img src={icon2} alt="" />
          <h2 className="font-bold">Quality</h2>
          <p>
            We have developed a culture of continuous improvement. We give
            guarantee against any manufacturing defect.
          </p>
        </div>
        <div className="grid justify-items-center gap-5">
          <img src={icon3} alt="" />
          <h2 className="font-bold">Service & Support</h2>
          <p>
            We have invested heavily to ensure that our products, processes and
            customer service are second to none.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
