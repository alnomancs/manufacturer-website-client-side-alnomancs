import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const MyOrders = () => {
  const [oders, setOrders] = useState();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <div className="overflow-auto">
      <h2 className="text-2xl ">my appointment {oders?.length}</h2>

      <div className="overflow-x-auto">
        <table className="table relative w-full">
          <thead>
            <tr>
              <th className="sticky top-0"></th>
              <th className="sticky top-0">Name</th>
              <th className="sticky top-0">Date</th>
              <th className="sticky top-0">Time</th>
              <th className="sticky top-0">Treatment</th>
            </tr>
          </thead>
          <tbody>
            {oders?.map((appointment, index) => (
              <tr key={appointment._id}>
                <th>{index + 1}</th>
                <td>{appointment.patientName}</td>
                <td>{appointment.date}</td>
                <td>{appointment.slot}</td>
                <td>{appointment.treatment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
