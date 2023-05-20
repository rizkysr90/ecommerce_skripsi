import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import rupiahFormat from "../utility/rupiahFormat";
import productNotFoundImg from "../media/undraw_empty_re_opql(1).svg";
import Pagination from "../components/Pagination";

function SearchResult() {
  const [searchParam] = useSearchParams();
  const searchTerm = searchParam.get("keyword") || "";
  const [products, setProducts] = useState("");
  const [pagination, setPagination] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState("");
  let totalBtnPagination = Math.ceil(Number(pagination?.count) / 12);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await axios
          .get(
            `${process.env.REACT_APP_API_HOST}/products?search=${searchTerm}&active=true&page=${page}`
          )
          .then((res) => res.data.data);
        setPagination(res.meta);
        setProducts(res.products);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    getData();
  }, [searchTerm, page]);
  return (
    <>
      <div className="pt-20 bg-base-200">
        {isLoading && <div className="text-center">Loading...</div>}
        {!isLoading && (
          <div className="mx-3 md:mx-14">
            <div className="ml-2">
              Hasil pencarian untuk '
              <span className="text-secondary font-bold">
                {`${searchTerm}`}
              </span>
              '
            </div>
            <div className="divider my-1"></div>
            <div className="flex flex-wrap mt-4">
              {products.length !== 0 ? (
                products.map((data) => {
                  return (
                    <Link
                      to={`/products/${data?.id}`}
                      className="card card-compact basis-5/12 sm:basis-[22%] lg:basis-[14%]  mx-2 mb-4 bg-base-100  rounded"
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
                <div className="flex flex-col items-center w-full mt-8">
                  <img
                    className="h-32"
                    alt="img not found "
                    src={productNotFoundImg}
                  />

                  <div className="mt-2 text-sm">Produk tidak ditemukan</div>
                </div>
              )}
              <div className="flex justify-center w-full">
                <Pagination
                  totalBtnPagination={totalBtnPagination}
                  pagination={pagination}
                  setPage={setPage}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchResult;
