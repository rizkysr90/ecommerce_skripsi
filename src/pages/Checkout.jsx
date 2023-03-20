import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import rupiahFormat from '../utility/rupiahFormat';
import useSWR from 'swr'
import axios from 'axios';
import ModalSelectAddress from '../components/ModalSelectAddress';
import ShipAddress from './../components/ShipAddress';
import {getDistanceFromLatLonInKm} from './../utility/haversine';
import notFoundImg from '../media/undraw_page_not_found_re_e9o6.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import override from '../styles/spinner';
import { ClipLoader } from 'react-spinners';

export default function Checkout() {
    const location = useLocation();
    const getCustAddress = async (url) => await axios.get(url).then((res) => res.data.data);
    const {data : address} = useSWR(`${process.env.REACT_APP_API_HOST}/customers/address`, getCustAddress);
    const [isLoading, setIsLoading] = useState(false);
    const [products] = useState(location.state?.products);
    const [paymentMethod, setPayment] =  useState('cod');
    const [selectedAddress, setSelectedAddress] = useState('');
    const [validOrder, setValidOrder] = useState(true);
    const navigate = useNavigate();
    const [deliveryOrder, setDeliveryOrder] = useState(false);
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
            if (formJSON.shipping_method === 'delivery_order' && deliveryOrder ){
                formJSON.lat = selectedAddress.lat;
                formJSON.lng = selectedAddress.lng;
                formJSON.shipping_distance = getDistanceFromLatLonInKm(storeGeoLoc.lat, 
                                            storeGeoLoc.lng, selectedAddress.lat,
                                            selectedAddress.lng).toFixed(1);
                formJSON.shipping_address 
= `${selectedAddress?.recipient_name}^${selectedAddress?.recipient_phone_number}^${selectedAddress.street}^${selectedAddress.village}^${selectedAddress.district}^${selectedAddress.state}^${selectedAddress.province}^${selectedAddress.postal_code}`;
            }
            formJSON.pay_method = paymentMethod;
            formJSON.amount = orderSummary.totalPrice;
            formJSON.qty_product = orderSummary.totalQty;
            formJSON.products = products;
            setIsLoading(true);
            const res = await axios.post(`${process.env.REACT_APP_API_HOST}/onOrders`,formJSON).then(res => res.data);
            setIsLoading(false)
            toast.success(`${res?.metadata?.msg}`);
            setTimeout(() => {
               if (paymentMethod === 'transfer') {
                    navigate('/payment', {
                        state : {
                            orderId : res.data.orderId,
                            amount : orderSummary.totalPrice
                        }
                    })
               } else {
                    navigate(`/customers/myorders/${res?.data?.orderId}`)
               }
            }, 3000);
        } catch (error) {
            let errFromServer = error?.response?.data?.metadata;
            let errMsg = error.message;
            if (error.response?.status !== 500) {
                if (errFromServer?.msg) {
                  errMsg = errFromServer?.msg;
                } 
            }
            toast.error(`Error ${error?.response?.status} - ${errMsg}`);
            setIsLoading(false);
        }
    }
    return (
        <>
            {
                isLoading &&
                <div className='bg-base-100 fixed z-50 w-full left-0 top-0 right-0 min-h-screen'>
                    <ClipLoader
                    color={"#1eb854"}
                    loading={isLoading}
                    size={35}
                    cssOverride={override}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    />
                </div>
            }
            <ToastContainer
            autoClose={3000}
            limit={1}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover
            theme="dark"
            />
            <div className='pt-20 bg-base-200 mx-3 md:mx-20 '>
                {products ?  
                    <div className=''>
                        <div className=''>
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
                                                    setDeliveryOrder(false)
                                                    setValidOrder(true)
                                                }}
                                            >Ambil di toko</option>
                                            <option value={'delivery_order'}
                                                onClick={() => {
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
                                                <div className='text-sm font-bold'>Dikirim dari :</div>
                                                <div className="divider my-0"></div>
                                                <div className='text-sm'>Rizki Plastik</div>
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
                                                            selectedAddress = {selectedAddress}
                                                            validOrder = {setValidOrder}
                                                    />
                                                </>
                                            }
                                           
                                        
                                        </div>
                                    }
                                    <div className='bg-base-100 rounded p-3 mt-3'>
                                        <div className=''>Opsi Pembayaran</div>
                                        <div className="divider my-1"></div>
                                        <div className="form-control">
                                            <label className="label cursor-pointer"
                                                htmlFor='cod'
                                            >
                                                <span className="label-text">Cash On Delivery (COD)</span> 
                                                <input type="radio" name="status" 
                                                id='cod'
                                                checked={paymentMethod === 'cod'}
                                                onSelect={() => setPayment('cod')}
                                                value={'cod'} className="radio checked:bg-secondary" 
                                                    onChange={() => setPayment('cod')}
                                                />
                                            </label>
                                            </div>
                                            <div className="form-control">
                                            <label className="label cursor-pointer"
                                                htmlFor='transfer'
                                            >
                                                <span className="label-text">Transfer</span> 
                                                <input type="radio" name="status"
                                                id='transfer'
                                                onSelect={() => setPayment('transfer')}
                                                 value={'belum dibayar'}
                                                checked={paymentMethod === 'transfer'}
                                                onChange={() => setPayment('transfer')} 
                                                className="radio checked:bg-secondary" />
                                            </label>
                                        </div>
                                    </div>
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
