import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import override from "../styles/spinner";
import rupiahFormat from "../utility/rupiahFormat";
import { useSelector } from "react-redux";

function Payment() {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState("");
  const navigate = useNavigate();
  const handlePayment = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJSON = Object.fromEntries(formData.entries());
    formJSON.orderId = location.state.orderId;
    try {
      setIsLoading(true);
      const res = await axios
        .put(`${process.env.REACT_APP_API_HOST}/onOrders/payment`, formJSON, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
      setIsLoading(false);
      toast.success(`${res?.metadata?.msg}`);
      setTimeout(() => {
        navigate("/payment/success", {
          state: {
            orderId: location.state?.orderId,
          },
        });
      }, 3000);
    } catch (error) {
      let errFromServer = error?.response?.data?.metadata;
      let errMsg = error.message;
      if (error.response?.status !== 500) {
        if (errFromServer?.msg) {
          errMsg = errFromServer?.msg;
        }
      }
      toast.error(`Error ${error?.response?.status} - ${errMsg}`);
      setIsLoading(false);
    }
  };
  const handlePreviewImg = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setPreviewImg(e.target.files[0]);
    }
  };
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);
  return (
    <>
      {isLoading && (
        <div className="bg-base-100 fixed z-50 w-full left-0 top-0 right-0 min-h-screen">
          <ClipLoader
            color={"#1eb854"}
            loading={isLoading}
            size={35}
            cssOverride={override}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <ToastContainer
        autoClose={3000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="dark"
      />
      <div className="mt-16 flex bg-info items-center w-full p-1 text-xs text-base-100 mt-4 text-left">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span className="ml-2">
          Pastikan nominal transfer sesuai dengan jumlah pembelian.
        </span>
      </div>
      <div className="bg-base-200 mx-3 md:mx-20 mt-4 ">
        <div className="flex flex-col bg-base-100 rounded-lg p-3 items-center">
          <div>Transaksi ID : {location.state?.orderId} </div>
          <div className="font-bold text-lg">Menunggu pembayaran</div>
          <div className="text-4xl font-bold mt-3">
            Rp{rupiahFormat(location.state?.amount)}
          </div>
          <div className="mt-4">Transfer ke alamat berikut :</div>
          <div className="flex">BNI : 0909119629 a.n Rizki Susilo Ramadhan</div>
          <div className="flex">Shopeepay : 081380816190 a.n Rizki Plastik</div>
          {previewImg && (
            <div className="indicator mt-8">
              <span
                className="indicator-item cursor-pointer badge badge-error"
                onClick={() => setPreviewImg("")}
              >
                <FontAwesomeIcon icon={faTrash} className="text-neutral" />
              </span>
              <div className="avatar">
                <div className="w-24 rounded">
                  <img
                    src={URL.createObjectURL(previewImg)}
                    alt="foto produk"
                  />
                </div>
              </div>
            </div>
          )}
          <form
            encType="multipart/form-data"
            className="mb-10"
            onSubmit={handlePayment}
          >
            <div className="w-full">
              <label
                className="flex flex-col my-4"
                htmlFor="evidence_of_tf w-full"
              >
                <span className="mb-2 text-success text-sm underline cursor-button">
                  Upload bukti transfer kamu disini
                </span>
                <input
                  type="file"
                  name="evidence_of_tf"
                  id="evidence_of_tf"
                  onChange={handlePreviewImg}
                  accept="image/*"
                  className="file-input file-input-bordered file-input-success w-full "
                />
              </label>
            </div>
            {previewImg ? (
              <button
                type="submit"
                className="btn btn-success normal-case text-base-100 w-full mb-3"
              >
                Kirim Bukti Transfer
              </button>
            ) : (
              <button
                type="submit"
                disabled
                className="btn btn-disabled normal-case text-base-100 w-full mb-3"
              >
                Kirim Bukti Transfer
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Payment;
