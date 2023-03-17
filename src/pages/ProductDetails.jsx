
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import BreadCrumb from '../components/BreadCrumb';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';

export default function ProductDetails() {
    const { user } = useSelector((state) => state.auth);
    const {productId} = useParams();
    const [product, setProduct] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingToCart, setIsLoadingToCart] = useState(false);
    const [trackQty, setTrackQty] = useState(1);
    const navigate = useNavigate();
    const addToCart = async () => {
        try {
            const payload = {
                ProductId : product?.id,
                qty : trackQty
            }
            setIsLoadingToCart(true);
            await axios.post(`${process.env.REACT_APP_API_HOST}/carts/add`, payload);
            toast.success(`Berhasil menambahkan produk ke keranjang`);
            setIsLoadingToCart(false);
        } catch (error) {
            setIsLoadingToCart(false);
            if (error.response.status === 401) {
                navigate('/auth/login')
            }
        }
    }
    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true)
                const res = await axios.get(`${process.env.REACT_APP_API_HOST}/products/${productId}`)
                setProduct(res.data.data)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
            }
        }
        getData();
    }, [productId])
    return (
    <>
        <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        <div className='pt-20   '>
            {
                isLoading ? 
                <div className='text-center w-full'>Loading...</div>
                :
                <div className='mx-3 md:mx-20'>
                    <BreadCrumb
                        name={product?.name}
                    />
                    <div className='bg-base-100 md:bg-transparent p-3 md:p-0 flex flex-col md:flex-row mt-2'>
                        <img src={product?.url_img} 
                        className='object-cover h-80 w-full md:w-[24rem] bg-primary md:mr-8 '
                        alt='produk foto'/>
                        <div className='grow flex flex-col mt-3 md:mt-0 md:mr-8'>
                            <div className='text-xl font-bold'>{product?.name}</div>
                            <div className='text-lg mt-2 font-bold text-secondary'>Rp{new Intl.NumberFormat(['ban', 'id']).format(product?.sell_price)}</div>
                            <div className="divider"></div>
                            <div className='flex justify-between '>
                                <div className='flex flex-col text-sm'>
                                        <div className=' font-bold'>Informasi</div>
                                        <div className='opacity-70 mt-2'>No.SKU : {product?.sku ? product?.sku : '-'}</div>
                                </div>
                                <div>
                                    <div className='flex'>
                                        <div className='flex flex-col text-sm mr-3'>
                                            <span className='opacity-70'>Berat Pengiriman</span>
                                            <span className='font-bold mt-2'>{product?.shipping_weight / 1000} Kg</span>
                                        </div>
                                        <div className='flex flex-col text-sm mr-3'>
                                            <span className='opacity-70'>Berat Produk</span>
                                            <span className='font-bold mt-2'>{product?.product_weight / 1000} Kg</span>
                                        </div>
                                        <div className='flex flex-col text-sm'>
                                            <span className='opacity-70'>Stok</span>
                                            <span className='font-bold mt-2'>{product?.stock}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-4 text-sm'>
                                <div className='font-bold'>Deskripsi</div>
                                <div className='mt-2 opacity-70'>
                                        {product?.description}
                                </div>
                            </div>
                        </div>
                        <div className="divider md:hidden"></div>
                        <div className='w-full  md:basis-3/12 flex flex-col h-min rounded-lg'>
                            <div className='font-bold'>Ringkasan Belanja</div>
                            <div className='flex justify-between mt-3 text-sm items-center'>
                                <div className=' opacity-70 '>Jumlah :</div>
                                <div className=" flex items-center">
                                        <span className='text-lg cursor-pointer'
                                            onClick={() => {
                                                if (trackQty - 1 < 1) {
                                                    setTrackQty(trackQty);
                                                } else {
                                                    setTrackQty(prev => Number(prev) - 1)
                                                }
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faMinusCircle}/>
                                        </span>
                                        <input type="text" 
                                        min={'1'}
                                        max={product?.stock}
                                        placeholder="1" 
                                        value={trackQty}
                                        onChange={(e) => {
                                            if (e.target.value > product?.stock) {
                                                setTrackQty(trackQty)
                                            } else {
                                                setTrackQty(e.target.value)
                                            }
                                        }}
                                        className="input input-bordered w-10 mx-2  input-sm" />
                                        <span className='text-lg cursor-pointer'
                                            onClick={() => {
                                                if (trackQty + 1 > product?.stock) {
                                                    setTrackQty(trackQty);
                                                } else {
                                                    setTrackQty(prev => Number(prev) + 1)
                                                }
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faPlusCircle}/>
                                        </span>
                                </div>
                            </div>
                            <div className='flex text-sm justify-between mt-2'>
                                <div className='opacity-70'>Subtotal</div>
                                <div className='font-bold'>Rp{new Intl.NumberFormat(['ban', 'id']).format(product?.sell_price * trackQty)}</div>
                            </div>
                            <div className={`btn btn-secondary normal-case mt-4 text-base-100 ${isLoadingToCart? "btn-disabled" : ''}`}
                                onClick={addToCart}
                                
                            >{isLoadingToCart ? "Loading..." : "Tambah Ke Keranjang"}
                            </div>
                            {
                                user ? 
                                <div className='btn btn-secondary btn-outline text-black normal-case mt-2'
                                    onClick={() => {
                                        navigate("/shopping-cart/direct-checkout", {
                                            state : {
                                                products : [{
                                                    id : product?.id,
                                                    qty : trackQty,
                                                    name : product?.name,
                                                    stock : product?.stock,
                                                    price : product?.sell_price,
                                                    product_weight : product?.product_weight,
                                                    shipping_weight : product?.shipping_weight,
                                                    url_img : product?.url_img
                                                }
                                                ]
                                            }
                                        })
                                    }}
                                >Beli Langsung</div>
                                :
                                <Link className='btn btn-secondary btn-outline text-black normal-case mt-2'
                                    to={'/auth/login'}
                                >Beli Langsung</Link>
                            }
                            
                        </div>
                    </div>
                </div>

            }
        </div>
    </>
  )
}
