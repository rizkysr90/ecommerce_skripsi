import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import rupiahFormat from '../utility/rupiahFormat';

export default function Register() {
    const navigate = useNavigate();
    const fetchCart = async (url) => await axios.get(url).then((res) => res.data.data.Products);
    const {data : cart} = useSWR(`${process.env.REACT_APP_API_HOST}/carts`, fetchCart);
    const [product, setProduct] = useState([]);

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
        setProduct(cart)
    }, [cart]);
    return(
    <>
        <div className='mt-8'>
            <div className='mx-24'>
                <div>Keranjang Belanja Saya</div>
                <div className="overflow-x-auto w-full mt-4">
                    <table className="table w-full">
                        <thead>
                        <tr>
                            <th>Produk</th>
                            <th>Harga Satuan</th>
                            <th>Kuantitas</th>
                            <th>Total Harga</th>
                            <th>Aksi</th>
                        </tr>
                        </thead>
                        <tbody>
                            {product && product?.map((data) => {
                                return (
                                <tr key={data?.id}>
                                    <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={data?.url_img} alt="Foto produk" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{data?.name}</div>
                                        </div>
                                    </div>
                                    </td>
                                    <td>
                                        Rp{rupiahFormat(data?.sell_price)}
                                    </td>
                                    <td>
                                        <input id={`qty-${data?.id}`} 
                                        name={`qty-${data?.id}`} 
                                        onBlur={() => changeQty(data?.id)}
                                        onChange={(e) => {
                                            const newArr =  product.map((curr) => {
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
                                        className='input w-1/4 mr-4'
                                        type='text' value={data?.Cart_detail?.qty}/>
                                        <label htmlFor={`qty-${data?.id}`} >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </label>
                                    </td>
                                    <td>
                                        <div className="">Rp{rupiahFormat(data?.sell_price * data?.Cart_detail?.qty)}</div>
                                    </td>
                                    <td>
                                        <div 
                                        onClick={() => removeProduct(data?.id)}
                                        className='btn btn-error btn-sm normal-case text-base-100'>
                                                Hapus
                                        </div>
                                    </td>
                                </tr>
                                )
                            })}
                        </tbody>
                        {/* <!-- foot --> */}
                    </table>
                </div>
                <div className='flex justify-end mt-4'>
                        <div className='btn btn-primary normal-case text-base-100'
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
        </div>
    </>)
}