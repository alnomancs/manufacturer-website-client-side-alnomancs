import React from "react";
import BusinessSummery from "../BusinessSummery/BusinessSummery";
import Products from "../Products/Products";
import Reviews from "./Reviews";
import Footer from "../Shared/Footer";
import Banner from "./Banner";
import StoreLocation from "./StoreLocation";
import WhyChoose from "./WhyChoose";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Products></Products>
      <StoreLocation></StoreLocation>
      <WhyChoose></WhyChoose>
      <BusinessSummery></BusinessSummery>
      <Reviews></Reviews>
      <Footer></Footer>
    </div>
  );
};

export default Home;
