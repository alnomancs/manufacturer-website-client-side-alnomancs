import React from "react";
import divider from "../../images/Ozar_O2-1.png";
import store from "../../images/world-map.jpeg";

const StoreLocation = () => {
  return (
    <div className="mt-10 flex flex-col w-full border-opacity-50">
      <div>
        <h1 className="text-5xl">Our Global Customer Base</h1>
      </div>
      {/* <div className="divider">OR</div> */}
      <img src={divider} alt="" />
      <img src={store} alt="" />
    </div>
  );
};

export default StoreLocation;
