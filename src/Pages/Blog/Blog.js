import React from "react";

const Blog = () => {
  return (
    <div className="hero text-left">
      <div className="hero-content flex-col ">
        {/* 1 */}
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              How Will you imporve the performance of a react application
            </h2>
            <p>1. Keeping component state local where necessary</p>
            <p>
              2. Memoizing React components to prevent unnecessary re-renders
            </p>
            <p>3. Code-splitting in React using dynamic import()</p>
            <p>4. Windowing or list virtualization in React applications</p>
            <p>5. Lazy loading images in React</p>
            <p>
              6. Use React.Fragments to Avoid Additional HTML Element Wrappers
            </p>
            <p>9. Avoid using Index as Key for map</p>
          </div>
        </div>
        {/* 2 */}
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              What are the different way to manage a state in a react
              application
            </h2>
            <p>
              There are four main types of state you need to properly manage in
              our React apps: <br />
              1. Local state {"=>"} Local state is data we manage in one or another
              component. Local state is most often managed in React using the
              useState hook.
              <br />
              2. Global state {"=>"} Global state is data we manage across multiple
              components. Global state is necessary when we want to get and
              update data anywhere in our app, or in multiple components at
              least. A common example of global state is authenticated user
              state.
              <br />
              3. Server state {"=>"} Data that comes from an external server that
              must be integrated with our UI state. Server state is a simple
              concept, but can be hard to manage alongside all of our local and
              global UI state.
              <br />
              4. URL state {"=>"} Data that exists on our URLs, including the
              pathname and query parameters. URL state is often missing as a
              category of state, but it is an important one. In many cases, a
              lot of major parts of our application rely upon accessing URL
              state. Try to imagine building a blog without being able to fetch
              a post based off of its slug or id that is located in the URL!
            </p>
          </div>
        </div>
        {/* 3 */}
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              How does prototypical inheritance work
            </h2>
            <p>
              The Prototypal Inheritance is a feature in javascript used to add
              methods and properties in objects. It is a method by which an
              object can inherit the properties and methods of another object.
            </p>
          </div>
        </div>
        {/* 4 */}
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              Why you do not set the state directly in React. For example, if
              you have const [products, setProducts] = useState([]). Why you do
              not set products = [...] instead, you use the setProducts
            </h2>
            <p>
              If you update it directly, calling the setState() afterward may
              just replace the update you made. When you directly update the
              state, it does not change this.state immediately. Instead, it
              creates a pending state transition, and accessing it after calling
              this method will only return the present value. You will lose
              control of the state across all components.
            </p>
          </div>
        </div>
        {/* 5 */}
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              You have an array of products. Each product has a name, price,
              description, etc. How will you implement a search to find products
              by name?
            </h2>
            <p>
              Four Methods to Search Through Arrays in JavaScript
              <br />
              1. Array.includes()
              <br />
              2. Array.indexOf
              <br />
              3. Array.find()
              <br />
              Array.filter
            </p>
          </div>
        </div>
        {/* 6 */}
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              What is a unit test? Why should write unit tests?
            </h2>
            <p>
              Unit testing, a testing technique using which individual modules
              are tested to determine if there are any issues by the developer
              himself. It is concerned with functional correctness of the
              standalone modules. The main aim is to isolate each unit of the
              system to identify, analyze and fix the defects.
              <br />
              Unit testing, a testing technique using which individual modules
              are tested to determine if there are any issues by the developer
              himself. It is concerned with functional correctness of the
              standalone modules. The main aim is to isolate each unit of the
              system to identify, analyze and fix the defects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
