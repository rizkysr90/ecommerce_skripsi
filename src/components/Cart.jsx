import React, { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { logoutUser, forceLogout } from "../features/authSlice";

import { useDispatch } from "react-redux";
function Cart() {
  const dispatch = useDispatch();
  const fetchCart = async (url) =>
    await axios.get(url).then((res) => res.data.data);
  const { data: cart, error } = useSWR(
    `${process.env.REACT_APP_API_HOST}/carts/count`,
    fetchCart
  );
  useEffect(() => {
    if (error) {
      dispatch(logoutUser());
      dispatch(forceLogout());
    }
  }, [error, dispatch]);
  return (
    <>
      <div className="btn mr-2 btn-ghost">
        <div className="indicator">
          <span className="indicator-item badge-sm badge badge-success ">
            {cart?.totalProductInCart}
          </span>
          <Link to="/cart" className=" text-neutral">
            <FontAwesomeIcon icon={faCartShopping} size="2xl" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Cart;
