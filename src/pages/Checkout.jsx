import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import rupiahFormat from '../utility/rupiahFormat';
import useSWR from 'swr'
import axios from 'axios';
import ModalSelectAddress from '../components/ModalSelectAddress';
import ShipAddress from './../components/ShipAddress';
import {getDistanceFromLatLonInKm} from './../utility/haversine';
import notFoundImg from '../media/undraw_page_not_found_re_e9o6.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export default function Checkout() {
    const location = useLocation();
    const getCustAddress = async (url) => await axios.get(url).then((res) => res.data.data);
    const {data : address} = useSWR(`${process.env.REACT_APP_API_HOST}/customers/address`, getCustAddress)
    const [products, setProducts] = useState(location.state?.products);
    const [shipMethod, setShipMethod] = useState('pickup');
    const [selectedAddress, setSelectedAddress] = useState('');
    const [validOrder, setValidOrder] = useState(true);
    const [deliveryOrder, setDeliveryOrder] = useState(false);
    console.log(selectedAddress);
    const orderSummary = {
        totalQty : 0,
        totalPrice : 0
    };
    const storeGeoLoc = {
        lat : -6.235508991967569,
        lng: 107.0679693511163
    }
    const handleSubmitOrder = async (e) => {
        try {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const formJSON = Object.fromEntries(formData.entries());

            formJSON.amount = orderSummary.totalPrice;
            formJSON.qty_product = orderSummary.totalQty;
            formJSON.products = products;
            console.log(formJSON)
            const res = await axios.post(`${process.env.REACT_APP_API_HOST}/onOrders`,formJSON);
            
        } catch (error) {
            
        }
    }
    return (
        <>
            <div className='pt-20 bg-base-200 mx-3 md:mx-20 '>
                {products ?  
                    <div className=''>
                        <div className=''>
                            <div className='font-bold text-lg mb-4'>Checkout</div>
                            <form className="flex flex-col md:flex-row"
                                onSubmit={handleSubmitOrder}
                            >
                                <div className='basis-8/12'>
                                    <div className="alert p-0">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            <span className='text-xs font-bold md:text-sm'>Ini halaman terakhir dari proses belanjamu. Pastikan semua sudah benar, ya. :)</span>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className='bg-base-100 rounded p-3 mt-3'>
                                        <div className=''>Opsi Pengiriman</div>
                                        <div className="divider my-1"></div>
                                        <select className="select select-bordered w-full md:max-w-xs"
                                            name='shipping_method'
                                            defaultValue={"pickup"}
                                        >
                                            <option value={"pickup"}
                                                onClick={() => {
                                                    setShipMethod('pickup')
                                                    setDeliveryOrder(false)
                                                    setValidOrder(true)
                                                }}
                                            >Ambil di toko</option>
                                            <option value={'delivery_order'}
                                                onClick={() => {
                                                    setShipMethod('delivery_order')
                                                    setDeliveryOrder(true)
                                                    if (!selectedAddress) {
                                                        setValidOrder(false);
                                                    } 
                                                }}
                                            >Pesan Antar</option>
                                            {/* {
                                                getDistanceFromLatLonInKm(storeGeoLoc.lat, 
                                                    storeGeoLoc.lng, selectedAddress.lat,
                                                    selectedAddress.lng).toFixed(1) < 5 ? 

                                                    : 
                                                    <option value={''} disabled>Pesan Antar (Jarak Pengiriman &lt; 5 KM)</option>
                                            } */}
                                        </select>
                                    </div>
                                    {
                                        deliveryOrder && 
                                        <div className='mt-3 '>
                                            <div 
                                            className='flex flex-col bg-base-100 border-primary border p-3 w-full rounded mb-3'>
                                                <div className='font-bold text-sm'>Rizki Plastik</div>
                                                <div className='text-xs opacity-70'>
                                                    Jl. Puri Cendana No.112, Sumberjaya, Kec. Tambun Sel., Kabupaten Bekasi, Jawa Barat 17510
                                                </div>
                                            </div>
                                            {
                                                address?.length < 1 ?
                                                <Link 
                                                to={'/customers/address/new'}
                                                className='border text-secondary border-dashed
                                                cursor-pointer
                                                border-primary py-4 flex justify-center items-center rounded'>
                                                    <div>
                                                        <FontAwesomeIcon icon={faPlusCircle} className='mr-2'/>
                                                        Tambah Alamat Pengiriman
                                                    </div>
                                                </Link> 
                                                :
                                                <>
                                                    <ModalSelectAddress
                                                            address = {address}
                                                            onSelected={setSelectedAddress}
                                                    />
                                                </>
                                            }
                                           
                                        
                                        </div>
                                    }
                                    <div className='bg-base-100 p-3 mt-3 rounded'>
                                        <div className=''>Produk yang dibeli</div>
                                        <div className="divider my-1"></div>

                                        {
                                            products?.map((data, idx) => {
                                                orderSummary.totalQty += data?.Cart_detail?.qty;
                                                orderSummary.totalPrice += (data?.sell_price * data?.Cart_detail?.qty)
                                                return (
                                                    <div key={idx}>
                                                        <div className='flex mb-3' >
                                                            <div className="avatar">
                                                                <div className="w-16 h-16 rounded-xl">
                                                                    <img src={data?.url_img} alt="foto produk"/>
                                                                </div>
                                                            </div>
                                                            <div className='ml-3 grow flex flex-col'>
                                                                <p className='text-ellipsis font-bold uppercase '>{data?.name}</p>
                                                                <div className='flex justify-between flex-wrap mt-1 items-center'>
                                                                    <div className='text-sm font-bold'>
                                                                    {data?.Cart_detail?.qty}
                                                                        x Rp{rupiahFormat(data?.sell_price)}
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div className='flex justify-between items-center'>
                                                                    <p className='mt-3 font-bold'>Rp{rupiahFormat(data?.sell_price * data?.Cart_detail?.qty)}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='bg-base-100 p-3 mt-3 rounded md:mb-8'>
                                        <div className=''>Pesan</div>
                                        <div className="divider my-1"></div>
                                        <textarea className="textarea w-full textarea-bordered mt-1" placeholder="Silahkan tinggalkan pesan"
                                        name='notes'
                                            
                                        ></textarea>
                                    </div>
                                </div>
                                <div className='flex grow h-72 flex-col md:ml-3 mt-3 md:mt-0'>
                                    <div className='bg-base-100 rounded  p-3'> 
                                        <div className='font-bold '>Ringkasan Belanja</div>
                                        <div className="divider my-1"></div>
                                        <div className=' '>
                                            <div className='opacity-70 flex justify-between'>
                                                <span>
                                                    Total Belanja : ({`${orderSummary?.totalQty} Barang`})
                                                </span>
                                                <span>
                                                    Rp{rupiahFormat(orderSummary?.totalPrice)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="divider my-1"></div>
                                        <div className='font-bold flex justify-between'>
                                            Total Tagihan
                                            <span>Rp{rupiahFormat(orderSummary?.totalPrice)}</span>
                                        </div>
                                        {
                                            validOrder ?   
                                            <button 
                                            type='submit'
                                            className='btn btn-secondary w-full text-base-100 normal-case my-8'>
                                                    Buat Pesanan
                                            </button>
                                            :

                                            <button 
                                            disabled
                                            type='submit'
                                            className='btn btn-disabled w-full text-base-100 normal-case my-8'>
                                                    Buat Pesanan
                                            </button>
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                     :
                     <div className='flex mt-10 justify-center flex-col items-center'>                
                         <img src={notFoundImg} 
                         className='h-28'
                         alt='not-found-img'/>
                         <div className='mt-2'>Halaman tidak ditemukan</div>
                     </div>
                }
            </div> 
         </>   
    )
}
