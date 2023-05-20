import {
  faClose,
  faMapMarkerAlt,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ShipAddress from "../components/ShipAddress";
import { getDistanceFromLatLonInKm } from "../utility/haversine";
import rupiahFormat from "../utility/rupiahFormat";
import notFoundImg from "../media/undraw_page_not_found_re_e9o6.svg";

function DirectCheckout() {
  const navigate = useNavigate();
  const storeGeoLoc = {
    lat: -6.235508991967569,
    lng: 107.0679693511163,
  };
  const orderSummary = {
    totalQty: 0,
    totalPrice: 0,
  };
  const location = useLocation();
  const productInCart = location.state?.products;
  const [product] = useState(location.state?.products);
  const [address, setAddress] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [selectedAddress, setSelectedAddress] = useState("");
  const handleSubmitOrder = async (e) => {
    try {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const formJSON = Object.fromEntries(formData.entries());

      formJSON.amount = orderSummary.totalPrice;
      formJSON.qty_product = orderSummary.totalQty;
      formJSON.products = product;
      await axios.post(`${process.env.REACT_APP_API_HOST}/onOrders`, formJSON);
    } catch (error) {}
  };
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_HOST}/customers/address`
      );
      setAddress(res.data.data);
    };
    if (!user) {
      navigate("/");
    }
    getData();
  }, [productInCart, navigate, user]);
  return (
    <>
      <div className="pt-20 bg-base-200 mx-3 md:mx-20 ">
        {product ? (
          <div className="">
            <div className="">
              <form
                onSubmit={handleSubmitOrder}
                className="flex flex-col md:flex-row"
              >
                <div className="basis-8/12">
                  <div className="alert p-0">
                    <div className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="stroke-info flex-shrink-0 w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <span className="text-xs font-bold">
                        Ini halaman terakhir dari proses belanjamu. Pastikan
                        semua sudah benar, ya. :)
                      </span>
                    </div>
                  </div>
                  <div className="divider mb-1"></div>
                  <div>
                    {address.length < 1 ? (
                      <div
                        className="border text-secondary border-dashed
                                            cursor-pointer
                                            border-primary py-4 flex justify-center items-center rounded"
                      >
                        <div>
                          <FontAwesomeIcon
                            icon={faPlusCircle}
                            className="mr-2"
                          />
                          Tambah Alamat Pengiriman
                        </div>
                      </div>
                    ) : (
                      // {/* The button to open modal */}
                      <>
                        <label
                          htmlFor="my-modal-6"
                          className="btn  btn-outline w-full btn-primary normal-case"
                        >
                          <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className="mr-2"
                          />
                          Pilih Alamat Pengiriman
                        </label>
                        <input
                          type="checkbox"
                          id="my-modal-6"
                          className="modal-toggle"
                        />
                        <div className="modal modal-bottom sm:modal-middle">
                          <div className="modal-box">
                            <div className="flex justify-end">
                              <label
                                htmlFor="my-modal-6"
                                className="btn btn-ghost px-4 py-2 text-lg"
                              >
                                <FontAwesomeIcon
                                  icon={faClose}
                                ></FontAwesomeIcon>
                              </label>
                            </div>
                            <h3 className="font-bold text-lg text-center">
                              Pilih Alamat Pengiriman
                            </h3>

                            {address.map((data) => {
                              return (
                                <ShipAddress
                                  key={data.id}
                                  address={data}
                                  onSelected={setSelectedAddress}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </>
                    )}
                    <div className="bg-base-100 rounded p-3 mt-3">
                      <div className="">Opsi Pengiriman</div>
                      <div className="divider my-1"></div>
                      <select
                        className="select select-bordered w-full md:max-w-xs"
                        name="shipping_method"
                      >
                        <option disabled>Pilih opsi pengiriman</option>
                        <option value={"pickup"}>Ambil di toko</option>
                        {
                          // Jarak pengiriman kurang dari 5m
                          getDistanceFromLatLonInKm(
                            storeGeoLoc.lat,
                            storeGeoLoc.lng,
                            selectedAddress.lat,
                            selectedAddress.lng
                          ).toFixed(1) < 5 ? (
                            <option value={"delivery_order"}>
                              Pesan antar
                            </option>
                          ) : (
                            <option value={""} disabled>
                              Pesan antar
                            </option>
                          )
                        }
                      </select>
                    </div>
                  </div>
                  <div className="bg-base-100 p-3 mt-3 rounded">
                    <div className="">Produk yang dibeli</div>
                    <div className="divider my-1"></div>
                    {product?.map((data, idx) => {
                      orderSummary.totalQty += data?.qty;
                      orderSummary.totalPrice += data?.price * data?.qty;
                      return (
                        <div key={idx}>
                          <div className="flex mb-3">
                            <div className="avatar">
                              <div className="w-16 h-16 rounded-xl">
                                <img src={data?.url_img} alt="foto produk" />
                              </div>
                            </div>
                            <div className="ml-3 grow flex flex-col">
                              <p className="text-ellipsis font-bold uppercase ">
                                {data?.name}
                              </p>
                              <div className="flex justify-between flex-wrap mt-1 items-center">
                                <div className="text-sm font-bold">
                                  {data?.qty}x Rp{rupiahFormat(data?.price)}
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <p className="mt-3 font-bold">
                                  Rp{rupiahFormat(data?.price * data?.qty)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="bg-base-100 p-3 mt-3 rounded">
                    <div className="">Pesan</div>
                    <div className="divider my-1"></div>
                    <textarea
                      className="textarea w-full textarea-bordered mt-1"
                      placeholder="Silahkan tinggalkan pesan"
                      name="notes"
                    ></textarea>
                  </div>
                </div>
                <div className="flex grow h-72 flex-col md:ml-3 mt-3 md:mt-0">
                  <div className="bg-base-100 rounded  p-3">
                    <div className="font-bold">Ringkasan Belanja</div>
                    <div className="divider my-1"></div>
                    <div className="">
                      <div className="opacity-70 flex justify-between">
                        <span>
                          Total Belanja : ({`${orderSummary?.totalQty} Barang`})
                        </span>
                        <span>
                          Rp
                          {new Intl.NumberFormat(["ban", "id"]).format(
                            orderSummary?.totalPrice
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="divider my-1"></div>
                    <div className="font-bold flex justify-between">
                      Total Tagihan
                      <span>
                        Rp
                        {new Intl.NumberFormat(["ban", "id"]).format(
                          orderSummary?.totalPrice
                        )}
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-secondary w-full text-base-100 normal-case my-8"
                    >
                      Buat Pesanan
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex mt-10 justify-center flex-col items-center">
            <img src={notFoundImg} className="h-28" alt="not-found-img" />
            <div className="mt-2">Halaman tidak ditemukan</div>
          </div>
        )}
      </div>
    </>
  );
}

export default DirectCheckout;
