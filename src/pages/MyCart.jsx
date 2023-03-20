import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import rupiahFormat from '../utility/rupiahFormat';

export default function Register() {
    const navigate = useNavigate();
    const fetchCart = async (url) => await axios.get(url).then((res) => res.data.data.Products);
    const {data : cart, isLoading} = useSWR(`${process.env.REACT_APP_API_HOST}/carts`, fetchCart);
    const [product, setProduct] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const [limiterQty, setLimiterQty] = useState(false);
    const removeProduct = async (id) => {
        setProduct(
            product.filter(data =>  data.id !== id )
        )
        try {
            await axios.delete(`${process.env.REACT_APP_API_HOST}/carts/remove/products/${id}`);
        } catch (error) {
            
        }
    }
    const changeQty = async (id) => {
        const payload = {
            ProductId : id,
            qty : 0
        }
        product.forEach(elm => {
            if (elm.id === id) {
                payload.qty = elm.Cart_detail.qty
            }
        })
        try {
            await axios.put(`${process.env.REACT_APP_API_HOST}/carts/update/products`, payload );
        } catch (error) {
            
        }
    }
    useEffect(() => {
        if (!user) {
            navigate('/')
        }
        setProduct(cart)
    }, [cart, navigate, user]);
    return(
    <>
        
        <div className='pt-20'>
            {
                isLoading ?
                <div className='text-center w-full'>Loading...</div> 
                :
                <div className='mx-3 md:mx-20'>
                    <div className='ml-2 font-bold'>Keranjang Belanja</div>
                    <div className="divider my-1"></div>
                    <div className='mt-3 bg-base-100 p-3 rounded'>
                        {
                            product?.length > 0 && product.map((data,idx) => {
                                return (
                                    <div key={idx}>
                                        <div className='flex mb-3'>
                                            
                                            <div className="avatar">
                                                <div className="w-16 h-16 rounded-xl">
                                                    <img src={data?.url_img} alt="foto produk"/>
                                                </div>
                                            </div>
                                            <div className='ml-3 grow flex flex-col'>
                                                <p className='text-ellipsis font-bold uppercase '>{data?.name}</p>
                                                <div className='flex justify-between flex-wrap mt-1 items-center'>
                                                    <div className='text-sm font-bold'>
                                                        <input id={`qty-${data?.id}`} 
                                                            name={`qty-${data?.id}`} 
                                                            onBlur={() => changeQty(data?.id)}
                                                            onChange={(e) => {
                                                                const newArr =  product.map((curr) => {
                                                                    if (Number(e.target.value) <= 0) {
                                                                        setLimiterQty(true)
                                                                        e.target.value = 1
                                                                    }
                                                                    if (curr.id === data?.id) {
                                                                        return {...curr, Cart_detail : {
                                                                            ...curr.Cart_detail
                                                                            , qty : e.target.value
                                                                        }}
                                                                    } else {
                                                                    return curr;
                                                                    }
                                                                })
                                                                setProduct(newArr)
                                                            }}
                                                            className='input  rounded w-14 input-xs input-bordered'
                                                        type='text' value={data?.Cart_detail?.qty}/>
                                                        <label htmlFor={`qty-${data?.id}`} className='cursor-pointer mx-3' >
                                                            <FontAwesomeIcon icon={faEdit} className="text-lg" />
                                                        </label>
                                                        x Rp{rupiahFormat(data?.sell_price)}
                                                    </div>
                                                    
                                                </div>
                                                <div className='flex justify-between items-center'>
                                                    <input type="checkbox" id={`my-modal-${data?.id}`} className="modal-toggle"
                                                        checked={limiterQty} readOnly
                                                    />
                                                    <div className="modal modal-bottom sm:modal-middle">
                                                        <div className="modal-box">
                                                            <h3 className="font-bold text-lg">Konfirmasi {data?.name}</h3>
                                                            <p className="py-4">Yakin ingin menghapus produk ini dari keranjang?</p>
                                                            <div className="modal-action">
                                                                <label htmlFor={`my-modal-${data?.id}`} 
                                                                onClick={() => setLimiterQty((prev) => !prev)}
                                                                className="btn btn-outline normal-case rounded-lg btn-sm"
                                                                >Kembali</label>
                                                                <label htmlFor={`my-modal-${data?.id}`}  className="btn btn-warning normal-case rounded-lg btn-sm"
                                                                    onClick={() => {
                                                                        setLimiterQty((prev) => !prev)
                                                                        removeProduct(data?.id)
                                                                    }}
                                                                >Hapus</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className='mt-3 font-bold'>Rp{rupiahFormat(data?.sell_price * data?.Cart_detail?.qty)}</p>
                                                    <label className='btn btn-sm normal-case btn-error text-base-100'
                                                        //  onClick={() => removeProduct(data?.id)}
                                                        onClick={() => setLimiterQty((prev) => !prev)}
                                                        htmlFor={`my-modal-${data?.id}`}
                                                        >Hapus
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider my-1"></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='flex justify-end mt-4'>
                            <div className='btn btn-secondary w-full md:w-auto normal-case text-base-100'
                                onClick={() => {
                                    navigate("/cart/checkout", {
                                        state : {
                                            products : product
                                        }
                                    })
                                }}
                            >
                                Checkout
                            </div>
                    </div>
                </div>
            }
        </div>
    </>)
}