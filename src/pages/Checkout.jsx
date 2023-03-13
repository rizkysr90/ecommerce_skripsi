import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import rupiahFormat from '../utility/rupiahFormat';
import useSWR from 'swr'
import axios from 'axios';
import ModalSelectAddress from '../components/ModalSelectAddress';
import ShipAddress from './../components/ShipAddress';
import {getDistanceFromLatLonInKm} from './../utility/haversine';

export default function Checkout() {
    const location = useLocation();
    const getCustAddress = async (url) => await axios.get(url).then((res) => res.data.data);
    const {data : address} = useSWR(`${process.env.REACT_APP_API_HOST}/customers/address`, getCustAddress)
    const [products, setProducts] = useState(location.state?.products);
    const [selectedAddress, setSelectedAddress] = useState('');
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
            
            {location.state?.products &&  
                <div className='my-10'>
                    <div className='mx-24 mt-8'>
                        <div className='font-bold text-lg mb-4'>Checkout</div>
                        <form className="flex"
                            onSubmit={handleSubmitOrder}
                        >
                            <div className='basis-8/12'>
                                <div className="alert shadow">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <span>Ini halaman terakhir dari proses belanjamu. Pastikan semua sudah benar, ya. :)</span>
                                    </div>
                                </div>
                                <div className="divider"></div>
                                <div className='mb-8 font-bold text-lg'>Barang yang dibeli</div>
                            {
                                    products?.map((data) => {
                                        orderSummary.totalQty += data?.Cart_detail?.qty;
                                        orderSummary.totalPrice += (data?.sell_price * data?.Cart_detail?.qty)
                                        return (
                                            <div className="card card-side bg-base-100 h-32 shadow rounded-none" key={data?.id}>
                                                <figure className='w-32 bg-primary h-32 rounded-none'>
                                                    <img src={data?.url_img} alt="gambar produk yang dibeli"/>
                                                </figure>
                                                <div className="card-body p-2">
                                                    <h2 className="card-title text-sm">{data?.name}</h2>
                                                    <p className='font-bold text-xs opacity-70'>Harga satuan : {data?.sell_price}</p>
                                                    <p className='font-bold text-xs -mt-3 opacity-70'>Jumlah Pembelian : {data?.Cart_detail?.qty}</p>
                                                    <p className='font-bold text-lg'>Rp{rupiahFormat(data?.sell_price * data?.Cart_detail?.qty)}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className='my-4 text-sm'>Tulis Catatan Pesanan : (Tidak wajib)</div>
                                <textarea className="textarea w-full textarea-bordered" placeholder="Bio" name='notes'
                                    
                                ></textarea>
                                <div className="divider"></div>
                                <div className=''>
                                    <div className='mb-4 font-bold text-lg'>Pengiriman</div>
                                    <div className="alert p-2 mb-3">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <span>Pemesanan dengan delivery order wajib mengatur alamat pengiriman</span>
                                        </div>
                                    </div>
                                    {
                                        address?.length < 1 && 
                                        <div className='flex flex-col items-center'>
                                            <div>Belum ada alamat pengiriman</div>
                                            <Link to="/customers/address/new" 
                                            className='text-sm underline'>
                                                Tambah alamat pengiriman disini!
                                            </Link>
                                        </div> 
                                    }
                                    {
                                        address?.length &&
                                        <>
                                           <ModalSelectAddress
                                                address = {address}
                                                onSelected={setSelectedAddress}
                                           />
                                        </>
                                    }
                                      <div className='flex justify-between'>
                                        <div className='basis-2/5'>
                                            <div className='mt-4 font-bold text-sm'>Alamat Toko</div>
                                            <div className="divider"></div>
                                            <ShipAddress address={{
                                                id : 999,
                                                recipient_name : 'Rizki Plastik',
                                                recipient_phone_number : '081283007959',
                                                street : 'Jalan Puri Cendana RPC 112',
                                                village : 'Sumberjaya',
                                                district : 'Tambun Selatan',
                                                state : 'KAB BEKASI',
                                                province : 'JAWA BARAT',
                                                postal_code : '17510'
                                            }}
                                                isNoAction={true}
                                            />
                                        </div>
                                        <div className='basis-2/5'>
                                            {
                                                selectedAddress ? 
                                                <>
                                                    <div className='mt-4 font-bold text-sm'>
                                                        Tujuan Pengiriman (
                                                        <span>
                                                        {getDistanceFromLatLonInKm(storeGeoLoc.lat, 
                                                            storeGeoLoc.lng, 
                                                            selectedAddress.lat,
                                                            selectedAddress.lng).toFixed(1)
                                                        }
                                                        {' '}Km)
                                                        </span>
                                                    </div>
                                                    <div className="divider"></div>
                                                    <ShipAddress address={selectedAddress}
                                                        isNoAction={true}
                                                    />
                                                </>
                                                : null
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <div className='font-bold text-sm'>Jenis Pengiriman</div>
                                        <select className="select select-bordered w-full max-w-xs mt-4"
                                            name='shipping_method'
                                        >
                                            <option disabled >Pilih Jenis Pengiriman</option>
                                            <option value={"pickup"}>Ambil di toko</option>
                                            {
                                                getDistanceFromLatLonInKm(storeGeoLoc.lat, 
                                                    storeGeoLoc.lng, selectedAddress.lat,
                                                     selectedAddress.lng).toFixed(1) < 5 ? 

                                                     <option value={'delivery order'}>Pesan Antar</option>
                                                     : 
                                                     <option value={''} disabled>Pesan Antar (Jarak Pengiriman &lt; 5 KM)</option>
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='flex grow mx-8 h-72 rounded p-4 flex-col shadow'>
                                <div>
                                    <div className='font-bold text-lg'>Ringkasan Belanja</div>
                                    <div className='text-sm'>
                                        <div className='font-bold mt-4'>Total Belanja</div>
                                        <div className='opacity-70 flex justify-between'>
                                            <span>
                                                Total Harga : ({`${orderSummary?.totalQty} Barang`})
                                            </span>
                                            <span>
                                                Rp{rupiahFormat(orderSummary?.totalPrice)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className='font-bold flex justify-between'>
                                        Total Tagihan
                                        <span>Rp{rupiahFormat(orderSummary?.totalPrice)}</span>
                                    </div>
                                    <button 
                                    type='submit'
                                    className='btn btn-secondary w-full text-base-100 normal-case my-8'>
                                            Bayar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }
            
         </>   
    )
}
