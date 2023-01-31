
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import BreadCrumb from '../components/BreadCrumb'
import LoadSpinner from '../components/LoadSpinner';

export default function ProductDetails() {
    const {categoryName, productId} = useParams();
    const [product, setProduct] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [trackQty, setTrackQty] = useState(1);
    const navigate = useNavigate();
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
        <LoadSpinner isLoading={isLoading} />
        <div className='mt-8'>
            <div className='mx-24 '>
                <BreadCrumb
                    category={categoryName}
                    name={product?.name}
                />
                <div className='flex mt-8'>
                    <div className='basis-2/6 mr-8'>
                        <img src={product?.url_img} alt='produk foto'/>
                    </div>
                    <div className='grow flex flex-col mr-8'>
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
                                        <span className='opacity-70'>Pengiriman</span>
                                        <span className='font-bold mt-2'>{product?.shipping_weight / 1000} Kg</span>
                                    </div>
                                    <div className='flex flex-col text-sm mr-3'>
                                        <span className='opacity-70'>Berat</span>
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
                    <div className='basis-3/12 flex flex-col p-4 p-2 shadow-xl h-min rounded-lg'>
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
                        <div className='btn btn-secondary normal-case mt-4 text-base-100'>Tambah Ke Keranjang</div>
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
                        
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
