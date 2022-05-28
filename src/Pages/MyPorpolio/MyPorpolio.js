import React from "react";
import myPic from "../../images/IMG_0098.JPG";

const MyPorpolio = () => {
  return (
    <div class="hero min-h-screen text-left">
      <div class="hero-content flex-col lg:flex-row">
        <img src={myPic} alt="" class="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <p>Hello I'm </p>
          <h1 class="text-5xl font-bold">Al Noman</h1>
          <p>Diploma in CSC</p>
          <p class="py-3">Email: alnoman.cs@gmail.compact</p>
          <p class="py-3">
            Education: Diploma in Computer Science and Engineering
          </p>
          <p class="py-3">
            Education: Diploma in Computer Science and Engineering
          </p>
          <p class="py-3">
            Learn Technology: HTML5, CSS3, Bootstrap, Tailwind css, Javascript,
            ReactJS, ExpressJS, NodeJS, Mongodb
          </p>
          <p class="py-3">
            Project Link: <br />
            1. https://manufacturer-44940.web.app/
            <br />
            2. https://warehouse-management-2b449.web.app/
            <br />
            3. https://independent-service-prov-1ed2a.web.app/
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyPorpolio;
