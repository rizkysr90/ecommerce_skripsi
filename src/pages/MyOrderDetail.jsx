import axios from 'axios';
import React from 'react';
import useSWR from 'swr';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import rupiahFormat from '../utility/rupiahFormat';
moment.locale('id');


export default function MyOrderDetail() {
    const { id } = useParams();  
    const navigate = useNavigate();
    const fetchOrder = async (url) => await axios.get(url).then((res) => res.data.data);
    const {error, data : order, isLoading} = useSWR(`${process.env.REACT_APP_API_HOST}/onOrders/${id}`, fetchOrder);
    const address = order?.shipping_address ? order?.shipping_address?.split('^') : null
    const stepOrder = {
        current : 0
    }
    const stepOrderInfo = {
        '1' : 'Belum dibayar',
        '2' : 'Menunggu verifikasi',
        '3' : 'Diproses',
        '4' : 'Selesai',
    }
    if (order?.status === 'belum dibayar' || order?.status === 'cod') {
        stepOrder.current = 1
    } else if (order?.status === 'dibayar') {
        stepOrder.current =  2
    } else if (order?.status === 'diproses') {
        stepOrder.current = 3
    } else if (order?.status === 'selesai') {
        stepOrder.current = 4
    }
    
    return (
        <>
            <div className='pt-20 bg-base-200 mx-3 md:mx-20 '>
                {
                  isLoading && <div className='text-center'>Loading...</div>  
                }
                    {
                        order && 
                        <div>
                            <div className='p-3 shadow'>
                                <ul className="steps text-sm w-full">
                                    {

                                        Array.from({length: 4}, (_, i) => i + 1).map((elm, idx) => {
                                           
                                            let iteration = idx + 1;
                                            console.log(stepOrder.c);
                                            if (iteration <= stepOrder.current) {
                                                return (
                                                    <li className="step step-primary" key={idx}>{stepOrderInfo[String(iteration)]}</li>
                                                )
                                            } else {
                                                return (
                                                    <li className="step" key={idx}>{stepOrderInfo[String(iteration)]}</li>
                                                )
                                            }
                                        })
                                    }
                                </ul>
                                <div className='font-bold text-base mt-3'>Detail Transaksi</div>
                                <div className="divider my-1"></div>
                                <div className='flex text-sm justify-between w-full '>
                                    <div>No Pesanan : </div>
                                    <span className='font-bold'>{order?.id}</span>
                                </div>
                                <div className='flex text-sm justify-between w-full mt-3'>
                                    <div>Status : </div>
                                    {
                                        order?.status === 'belum dibayar' &&
                                        <div className="badge badge-success badge-outline badge-sm">Belum Dibayar</div>
                                    }
                                    {
                                        order?.status === 'dibayar' &&
                                        <div className='badge badge-success badge-outline badge-sm'>Menunggu verifikasi</div>
                                    }
                                    {
                                        order?.status === 'diproses' &&
                                        <div className='badge badge-success badge-outline badge-sm'>Diproses</div>
                                    }
                                    {
                                        order?.status === 'selesai' &&
                                        <div className='badge badge-success badge-outline badge-sm'>Selesai</div>
                                    }
                                    {
                                        order?.status === 'cod' &&
                                        <div className='badge badge-success badge-outline badge-sm'>Belum dibayar</div>
                                    }
                                </div>
                                <div className='flex text-sm justify-between w-full mt-3'>
                                    <div>Pengiriman :</div>
                                    {
                                        order?.shipping_method === 'pickup' &&
                                        <div className='badge badge-success badge-outline badge-sm'>Pickup di toko</div>
                                    }
                                    {
                                        order?.shipping_method === 'delivery_order' &&
                                        <div className='badge badge-success badge-outline badge-sm'>Delivery Order</div>
                                    }
                                </div>
                                <div className='flex text-sm justify-between w-full mt-3'>
                                    <div>Metode Pembayaran : </div>
                                    {
                                        order?.pay_method === 'cod'&&
                                        <div className='badge badge-success badge-outline badge-sm'>Cash On Delivery</div>
                                    }
                                    {
                                        order?.pay_method === 'transfer' &&
                                        <div className='badge badge-success badge-outline badge-sm'>Transfer</div>
                                    }
                                </div>
                                <div className='flex text-sm justify-between w-full mt-3'>
                                    <div>Total : </div>
                                    {
                                        <div>Rp{rupiahFormat(order?.amount)}</div>
                                    }
                                </div>
                                {
                                    (order?.evidence_of_tf && order?.pay_method === 'transfer' ) &&
                                    <div className='flex text-sm justify-between w-full mt-3'>
                                        <div>Resi Pengiriman : </div>
                                        <a className='text-success underline' href={`${order?.evidence_of_tf}`} target={'_blank'} rel='noreferrer'>Lihat Resi</a>
                                    </div>
                                }
                                 <div className='flex text-sm justify-between w-full mt-3'>
                                    <div>Waktu pemesanan : </div>
                                    <div>{moment(order?.createdAt).format('DD MMM YYYY, HH:mm')}</div>
                                </div>
                                {
                                    order?.paidAt && 
                                    <div className='flex text-sm justify-between w-full mt-3'>
                                        <div>Waktu pembayaran : </div>
                                        <div>{moment(order?.paidAt).format('DD MMM YYYY, HH:mm')}</div>
                                    </div>
                                }
                                {
                                    order?.shipping_method === 'delivery_order'
                                    &&
                                    <div className='text-sm mt-3'>
                                        <div className='font-bold text-base mt-3'>Alamat Pengiriman</div>
                                        <div className="divider my-1"></div>
                                        <div className=''>
                                        {/* <div className='text-sm'>{props?.selectedAddress?.recipient_name}</div> */}
                                            <div className='text-sm'>{`${address[0]} | ${address[1]}`}</div>
                                            <div className='text-sm opacity-70 mt-1'>
                                                {`${address[2]}, ${address[3]}, ${address[4]}, ${address[5]}, ${address[6]}, ${address[7]}`}
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    (order?.evidence_of_tf === null  && order?.pay_method === 'transfer') &&
                                    <div>
                                         <div className='font-bold text-base mt-3'>Pembayaran</div>
                                        <div className="divider my-1"></div>
                                        <div 
                                        className='btn btn-success normal-case w-full text-base-100'
                                        onClick={() => navigate('/payment', {
                                            state : {
                                                orderId : order?.id,
                                                amount : order?.amount
                                            }
                                        })}
                                        >
                                        
                                            Upload Resi Transfer
                                        </div>
                                    </div>
                                }
                                <div className="collapse">
                                    <input type="checkbox" className="peer" /> 
                                    <div className="collapse-title bg-transparent mt-3
                                    text-neutral font-bold flex justify-between items-center
                                    px-0 peer:checked:px-3">
                                        Produk dibeli
                                        <FontAwesomeIcon icon={faCaretDown}/>
                                    </div>
                                    <div className="collapse-content bg-transparent text-neutral px-0 peer-checked:bg-base-200 peer-checked:text-base-content"> 
                                        {
                                            order?.Products.map((data, idx) => {
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
                                                                    { data?.On_orders_detail?.qty}
                                                                        x Rp{rupiahFormat(data?.sell_price)}
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div className='flex justify-between items-center'>
                                                                    <p className='mt-3 font-bold'>Rp{rupiahFormat(data?.sell_price * data?.On_orders_detail?.qty)}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        error && <div>Something wrong happen</div>
                    }
            </div>
        </>
    )
}
