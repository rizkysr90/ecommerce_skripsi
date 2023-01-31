import { faClose,faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ShipAddress from '../components/ShipAddress';
import {getDistanceFromLatLonInKm} from '../utility/haversine';

function DirectCheckout() {
    const storeGeoLoc = {
        lat : -6.235508991967569,
        lng: 107.0679693511163
    }
    // const storeGeoLoc = {
    //     lat : -6.261193490706907,
    //     lng: 106.90998506237997
    // }
    const orderSummary = {
        totalQty : 0,
        totalPrice : 0
    };
    const location = useLocation();
    const productInCart =  location.state?.products;
    const [product,setProduct] = useState(location.state?.products);
    const [address, setAddress] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const [selectedAddress, setSelectedAddress] = useState("");
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API_HOST}/customers/address`);
            setAddress(res.data.data);
        }
        getData();
    }, [productInCart])
    return (
        <>
            {
                location.state?.products ?  
                <div className='my-10'>
                    <div className='mx-24 mt-8'>
                        <div className='font-bold text-lg mb-4'>Direct Checkout</div>
                       
                        <div className='flex'>
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
                                    product?.map((data) => {
                                        orderSummary.totalQty += data?.qty;
                                        orderSummary.totalPrice += (data?.price * data?.qty)
                                        return (
                                            <div className="card card-side bg-base-100 h-32 shadow rounded-none" key={data?.id}>
                                                <figure className='w-32 bg-primary h-32 rounded-none'>
                                                    <img src={data?.url_img} alt="gambar produk yang dibeli"/>
                                                </figure>
                                                <div className="card-body p-2">
                                                    <h2 className="card-title text-sm">{data?.name}</h2>
                                                    <p className='font-bold text-xs'>Jumlah Pembelian : {data?.qty}</p>
                                                    <p className='font-bold text-lg'>Rp{new Intl.NumberFormat(['ban', 'id']).format(data?.price * data?.qty)}</p>
                                                   
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className='my-4 text-sm'>Tulis Catatan Pesanan : (Tidak wajib)</div>
                                <textarea className="textarea w-full textarea-bordered" placeholder="Bio"></textarea>
                                <div className="divider"></div>
                                <div>
                                    <div className='mb-4 font-bold text-lg'>Pengiriman</div>
                                   
                                    {
                                        address.length < 1  ? 
                                        <div className='btn btn-primary'>Tambah Alamat Pengiriman</div> 
                                        : 
                                        // {/* The button to open modal */}
                                        <>
                                            <label htmlFor="my-modal-6" 
                                            className="btn  btn-outline w-full btn-primary normal-case">
                                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2"/>
                                                Pilih Alamat Pengiriman
                                            </label>
                                            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
                                            <div className="modal modal-bottom sm:modal-middle">
                                            <div className="modal-box">
                                                <div className='flex justify-end'>
                                                    <label htmlFor="my-modal-6" className="btn btn-ghost px-4 py-2 text-lg">
                                                        <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                                                    </label>
                                                </div>
                                                <h3 className="font-bold text-lg text-center">Pilih Alamat Pengiriman</h3>
                                               
                                                {
                                                    address.map((data) => {
                                                        return (
                                                            <ShipAddress 
                                                            key={data.id}
                                                            address={data}
                                                            onSelected={setSelectedAddress}
                                                            />
                                                        )
                                                    })
                                                }
                                            </div>
                                            </div>
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
                                        <select className="select select-bordered w-full max-w-xs mt-4">
                                            <option disabled >Pilih Jenis Pengiriman</option>
                                            <option>Ambil di toko</option>
                                            {
                                                getDistanceFromLatLonInKm(storeGeoLoc.lat, 
                                                    storeGeoLoc.lng, selectedAddress.lat,
                                                     selectedAddress.lng).toFixed(1) < 5 ? 

                                                     <option>Pesan Antar</option>
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
                                                Rp{new Intl.NumberFormat(['ban', 'id']).format(orderSummary?.totalPrice)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className='font-bold flex justify-between'>
                                        Total Tagihan
                                        <span>Rp{new Intl.NumberFormat(['ban', 'id']).format(orderSummary?.totalPrice)}</span>
                                    </div>
                                    <div className='btn btn-secondary w-full text-base-100 normal-case my-8'>
                                            Bayar
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div> : <div>Halaman Tidak Ditemukan</div>
            }
        </>
    )
}

export default DirectCheckout