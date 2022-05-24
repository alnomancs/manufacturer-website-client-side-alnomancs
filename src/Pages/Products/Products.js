import React from "react";
import Product from "../Product/Product";

const Products = () => {
  return (
    <div className="mt-10">
      <h2 className="text-5xl">Our Tools</h2>
      <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Product></Product>
        <Product></Product>
        <Product></Product>
        <Product></Product>
        <Product></Product>
        <Product></Product>
      </div>
    </div>
  );
};

export default Products;
