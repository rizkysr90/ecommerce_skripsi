import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import rupiahFormat from "../utility/rupiahFormat";
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useSWR from "swr";

import Banner from "../components/Banner";
import CarouselCategories from "../components/CarouselCategories";
import CarouselNewArrival from "../components/CarouselNewArrival";
import headerImg from "../media/aman.png";
export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchNewProducts = async (url) =>
    await axios.get(url).then((res) => res.data.data);
  const urlNewProducts = `${process.env.REACT_APP_API_HOST}/products/new`;
  const { data: newProducts, error: errNewProducts } = useSWR(
    urlNewProducts,
    fetchNewProducts
  );
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${process.env.REACT_APP_API_HOST}/products`
        );
        setProducts(res.data.data.products);
        // console.log(res.data.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <>
      <div className="bg-base-200 pt-16">
        <div className="bg-secondary md:py-0 py-8 bg-gradient-to-l from-blue-400 to-[#0079c2]">
          <div className="flex text-base-100 mx-5 md:mx-20 items-center justify-between">
            <div className="w-full md:basis-2/5 md:mt-0">
              <h1 className="text-3xl text-center md:text-left md:text-5xl font-bold">
                Toko Rizki Plastik Dan Bahan Kue
              </h1>
              <p className="py-6 text-center md:text-left">
                Menjual berbagai macam kebutuhan kemasan plastik, snack box,
                mika plastik, dan bahan kue. Melayani pembelian offline ataupun
                pembelian online.
              </p>
              <div className="flex justify-center md:block">
                <Link
                  to={"/products"}
                  className="btn btn-primary normal-case text-center"
                >
                  Lihat Produk
                </Link>
              </div>
            </div>
            <div className=" hidden md:block basis-2/5">
              <img src={headerImg} className="w-full " alt="header img" />
            </div>
          </div>
        </div>
        <div className="mx-3 md:mx-14 ">
          <div className="mt-4  p-4 rounded-lg bg-base-100">
            <div className="ml-2 font-bold text-base md:text-xl">
              Kategori Produk
            </div>
            <div className="divider my-1"></div>
            <CarouselCategories />
          </div>
          <div className="mt-4  p-4 rounded-lg bg-base-100">
            <div className="ml-2 font-bold text-xl">New Arrival</div>
            <div className="divider my-1"></div>
            <CarouselNewArrival newProducts={newProducts} />
          </div>

          <div className="mt-4 bg-base-100 p-4 rounded">
            <div className="flex justify-between items-center">
              <div className="ml-2 font-bold text-xl">Semua Produk</div>
              <Link
                to={"/products"}
                className="btn btn-outline btn-secondary font-bold md:px-8 normal-case btn-sm rounded mr-2"
              >
                Lihat Semua
              </Link>
            </div>
            <div className="divider my-1 mb-4"></div>
            <div className="flex flex-wrap">
              {products ? (
                products.map((data) => {
                  return (
                    <Link
                      to={`/products/${data?.id}`}
                      className="card card-compact basis-5/12 lg:basis-[14%]  grow mx-2 mb-4 bg-base-100  rounded "
                      key={data.id}
                    >
                      <figure>
                        <img
                          src={data?.url_img}
                          alt="Shoes"
                          className="h-32 w-full object-cover rounded"
                        />
                      </figure>
                      <div className="flex text-sm flex-col p-2">
                        <p className="  mt-1 h-11 font-bold  overflow-hidden text-base uppercase leading-tight text-ellipsis">
                          {data?.name}
                        </p>
                        <div className="mt-auto">
                          <p className="font-bold opacity-90">
                            Rp{rupiahFormat(data?.sell_price)}
                          </p>
                          {data?.stock < 1 ? (
                            <div className="btn btn-disabled btn-sm text-base-100 normal-case rounded mt-2 w-full ">
                              Habis
                            </div>
                          ) : (
                            <div className="btn btn-success btn-sm text-base-100 normal-case rounded mt-2 w-full ">
                              Beli
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="flex justify-center">Belum ada produk</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
