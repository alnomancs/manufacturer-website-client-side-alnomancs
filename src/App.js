import { Route, Routes } from "react-router-dom";
import "./App.css";
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
          path="/purchase"
          element={
            <RequireAuth>
              <Purchase></Purchase>
            </RequireAuth>
          }
        ></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>

        <Route path="/*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </div>
  );
}

export default App;
