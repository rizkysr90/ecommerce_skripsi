import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import LoadSpinner from '../components/LoadSpinner';
export default function LandingPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true)
                const res = await axios.get(`${process.env.REACT_APP_API_HOST}/products`);
                setProducts(res.data.data.products);
                // console.log(res.data.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        }
        getData();
    }, [])
  return (
    <>
        <LoadSpinner isLoading = {isLoading}/>
        <div>
            <div className='mx-14'>
                <div className='flex bg-base-100'>
                    {
                        products ? products.map((data) => {
                            return (
                                <Link to={`/products/${data?.product_category?.name}/${data?.id}`}
                                    className="card card-compact basis-2/12 bg-base-100 shadow-md mx-2 rounded" key={data.id}>
                                    <figure>
                                        <img src={data?.url_img} alt="Shoes" />
                                    </figure>
                                    <div className="card-body text-sm ">
                                        {
                                            data.stock < 1 ? 
                                            <div className="badge badge-sm badge-error gap-1 text-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                                Stok Habis
                                            </div>
                                            : null
                                        }
                                        <h2 className="card-title text-sm font-normal">{data?.name}</h2>
                                        <p className='font-bold '>Rp{new Intl.NumberFormat(['ban', 'id']).format(data.sell_price)}</p>
                                    </div>
                                </Link>
                            )
                        }) : <div className='flex justify-center'> 
                                Belum ada produk
                        </div>
                    }
                </div>
            </div>
        </div>
    </>
  )
}
