import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { reset } from "../features/authSlice";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import imageContent from "../media/undraw_shopping_app_flsj.svg";
import override from "../styles/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeLowVision } from "@fortawesome/free-solid-svg-icons";

export default function Register() {
  const [currentPw, setCurrentPw] = useState("");
  const [comparePw, setComparePw] = useState("");
  const [statusPw, setStatusPw] = useState(false);
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const handleFormSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJSON = Object.fromEntries(formData.entries());

    try {
      const res = await axios
        .post(
          `${process.env.REACT_APP_API_HOST}/auth/register/customers`,
          formJSON
        )
        .then((res) => res.data);
      setIsLoading(false);
      let user = res?.data;
      user.password = currentPw;
      navigate("/auth/validation/register", {
        state: {
          user,
        },
      });
      // dispatch(loginUser({email:formJSON.email, password: formJSON.password}));
    } catch (error) {
      setIsLoading(false);
      let errMsg = "Internal Server Error";
      if (error.response?.status !== 500) {
        errMsg = error.response?.data?.metadata?.msg;
      }

      toast.error(`Error ${error?.response?.status} - ${errMsg}`);
    }
  };
  useEffect(() => {
    if (user || isSuccess) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);
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
      <div className="min-h-screen flex bg-base-200 justify-center items-center">
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
        <div className="flex flex-col lg:flex-row items-center  w-full justify-center">
          <div className="text-center mr-14 hidden lg:flex flex-col items-center justify-center ">
            <div className="">
              <img
                src={imageContent}
                className="w-96"
                alt="banner logo pendaftaran"
              />
            </div>
            <p className="font-bold text-lg mt-8">
              Belanja lebih mudah, hanya di Rizki Plastik
            </p>
          </div>
          <form
            className=" basis-6/12 shadow-lg w-full max-w-sm shadow-lg rounded-lg bg-base-100"
            onSubmit={handleFormSubmit}
          >
            <div className="flex flex-col px-10 py-4">
              <div className="font-bold text-2xl text-center">
                Daftar Sekarang
              </div>
              <div className="text-center text-sm">
                Sudah punya akun?{" "}
                <Link to="/auth/login" className="text-primary underline">
                  Masuk
                </Link>
              </div>
              <div className="form-control">
                <label className="label" htmlFor="email">
                  <span className="label-text">Email</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="email@gmail.com"
                  id="email"
                  name="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="password">
                  <span className="label-text">Password</span>
                </label>
                <div className="flex items-center">
                  <input
                    type={showPass1 ? "text" : "password"}
                    id="password"
                    name="password"
                    onChange={(e) => {
                      setCurrentPw(e.target.value);
                      if (e.target.value !== comparePw && comparePw) {
                        setStatusPw(false);
                      } else {
                        setStatusPw(true);
                      }
                    }}
                    className="input input-bordered w-full"
                  />
                  {showPass1 ? (
                    <FontAwesomeIcon
                      icon={faEyeLowVision}
                      className="h-4 -ml-8 cursor-pointer"
                      onClick={() => setShowPass1(false)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEye}
                      className="h-4 -ml-8 cursor-pointer"
                      onClick={() => setShowPass1(true)}
                    />
                  )}
                </div>
              </div>
              <div className="form-control">
                <label className="label" htmlFor="confirm_password">
                  <span className="label-text">Konfirmasi Password</span>
                </label>
                <div className="flex items-center">
                  <input
                    required
                    type={showPass2 ? "text" : "password"}
                    id="confirm_password"
                    onChange={(e) => {
                      setComparePw(e.target.value);
                      if (e.target.value === currentPw) {
                        setStatusPw(true);
                      } else {
                        setStatusPw(false);
                      }
                    }}
                    name="confirm_password"
                    className="input input-bordered w-full"
                  />
                  {showPass2 ? (
                    <FontAwesomeIcon
                      icon={faEyeLowVision}
                      className="h-4 -ml-8 cursor-pointer"
                      onClick={() => setShowPass2(false)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEye}
                      className="h-4 -ml-8 cursor-pointer"
                      onClick={() => setShowPass2(true)}
                    />
                  )}
                </div>
                {comparePw && currentPw && !statusPw && (
                  <label className="label">
                    <div className="alert p-0 bg-transparent text-sm">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="stroke-error flex-shrink-0 w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <span>Password tidak sesuai</span>
                      </div>
                    </div>
                  </label>
                )}
              </div>
              <div className="form-control mt-4">
                {currentPw && comparePw && statusPw ? (
                  <button
                    type="submit"
                    className="btn btn-secondary normal-case font-bold"
                  >
                    Daftar
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-disabled normal-case font-bold"
                  >
                    Daftar
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
