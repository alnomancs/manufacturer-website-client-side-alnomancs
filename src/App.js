import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AddProduct from "./Pages/Dashborad/AddProduct";
import AddReview from "./Pages/Dashborad/AddReview";
import AllOrders from "./Pages/Dashborad/AllOrders";
import AllProducts from "./Pages/Dashborad/AllProducts";
import AllUser from "./Pages/Dashborad/AllUser";
import Dashboard from "./Pages/Dashborad/Dashboard";
import MyOrders from "./Pages/Dashborad/MyOrders";
import MyProfile from "./Pages/Dashborad/MyProfile";
import Payment from "./Pages/Dashborad/Payment";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Purchase from "./Pages/Purchase/Purchase";
import Navbar from "./Pages/Shared/Navbar";
import NotFound from "./Pages/Shared/NotFound";
import RequireAuth from "./Pages/Shared/RequireAuth";
import Signup from "./Pages/Signup/Signup";

function App() {
  return (
    <div className="App max-w-7xl mx-auto">
      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/purchase/:id"
          element={
            <RequireAuth>
              <Purchase></Purchase>
            </RequireAuth>
          }
        ></Route>

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard></Dashboard>
            </RequireAuth>
          }
        >
          <Route index element={<MyOrders></MyOrders>}></Route>
          <Route
            path="payment/:id"
            element={
              <RequireAuth>
                <Payment></Payment>
              </RequireAuth>
            }
          ></Route>
          <Route path="addReview" element={<AddReview></AddReview>}></Route>
          <Route path="myprofile" element={<MyProfile></MyProfile>}></Route>
          <Route path="users" element={<AllUser></AllUser>}></Route>
          <Route path="allOrders" element={<AllOrders></AllOrders>}></Route>
          <Route path="addproduct" element={<AddProduct></AddProduct>}></Route>
          <Route path="manageProduct" element={<AllProducts></AllProducts>}></Route>
        </Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>

        <Route path="/*" element={<NotFound></NotFound>}></Route>
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
