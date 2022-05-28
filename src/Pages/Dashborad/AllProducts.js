import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";
import AllProductsRow from "./AllProductsRow";
import ProductDeleteModal from "./ProductDeleteModal";

const AllProducts = () => {
  const [user, loading, error] = useAuthState(auth);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const navigate = useNavigate();
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery("users", () =>
    fetch(`http://localhost:5001/products`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        localStorage.removeItem("accessToken");
        return navigate("/");
      }
      return res.json();
    })
  );
  if (loading || isLoading) return <Loading></Loading>;
  return (
    <div className="overflow-auto">
      <h2 className="text-5xl ">All Product List {products?.length}</h2>

      <div className="overflow-x-auto">
        <table className="table relative w-full">
          <thead>
            <tr>
              <th className="sticky top-0">Sl</th>
              <th className="sticky top-0">img</th>
              <th className="sticky top-0">Product Name</th>
              <th className="sticky top-0">Description</th>
              <th className="sticky top-0">Minimum Qty</th>
              <th className="sticky top-0">Available Quantity</th>
              <th className="sticky top-0">Price</th>
              <th className="sticky top-0"></th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <AllProductsRow
                key={product?._id}
                product={product}
                index={index}
                refetch={refetch}
                setDeleteProduct={setDeleteProduct}
              ></AllProductsRow>
            ))}
          </tbody>
        </table>
      </div>
      {deleteProduct && (
        <ProductDeleteModal
          key={deleteProduct?._id}
          deleteProduct={deleteProduct}
          setDeleteProduct={setDeleteProduct}
          refetch={refetch}
        ></ProductDeleteModal>
      )}
    </div>
  );
};

export default AllProducts;
