import { toast } from "react-toastify";

const ProductDeleteModal = ({ deleteProduct, setDeleteProduct, refetch }) => {
  const handleDelete = () => {
    const url = `https://stark-fortress-97754.herokuapp.com/product/${deleteProduct._id}`;
    console.log(url);
    fetch(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          toast.success("your Product has been deleted successfully");
          setDeleteProduct(null);
          refetch();
        }
      });
  };
  return (
    <div>
      {/* cancle modal */}
      <input
        type="checkbox"
        id="delete-product-modal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <h3 className="font-bold text-lg">{deleteProduct.name} </h3>
          <p className="py-4">Do You want to delete this product</p>
          <div className="modal-action">
            <label
              htmlFor="delete-product-modal"
              className="btn btn-xs btn-success"
              onClick={() => handleDelete()}
            >
              Yes
            </label>
            <label
              htmlFor="delete-product-modal"
              className="btn btn-xs btn-error"
            >
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDeleteModal;
