import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";
import Loading from "../Shared/Loading";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);

  if (loading || adminLoading) return <Loading></Loading>;
  if (error) return console.log(error);

  return (
    <div className="drawer drawer-mobile">
      <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content ">
        <h2 className="text-5xl text-purple-600">Dashboard</h2>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          {!admin && (
            <>
              <li>
                <Link to="/dashboard">My Order</Link>
              </li>
              <li>
                <Link to="/dashboard/addReview">Add Review</Link>
              </li>
            </>
          )}
          {admin && (
            <>
              <li>
                <Link to="/dashboard/myprofile">My Profile</Link>
              </li>
              <li>
                <Link to="/dashboard/users">All User</Link>
              </li>

              <li>
                <Link to="/dashboard/allOrders">Manage all Orders</Link>
              </li>
              <li>
                <Link to="/dashboard/addproduct">Add Product</Link>
              </li>
              <li>
                <Link to="/dashboard/manageDoctor">Manage Doctor</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
