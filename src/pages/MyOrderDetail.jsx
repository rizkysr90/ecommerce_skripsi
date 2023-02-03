import axios from 'axios';
import React from 'react';
import useSWR from 'swr';
import { useParams } from 'react-router-dom';

export default function MyOrderDetail() {
    const { id } = useParams();  
    const fetchOrder = async (url) => await axios.get(url).then((res) => res.data.data);
    const {error, data : order} = useSWR(`${process.env.REACT_APP_API_HOST}/onOrders/${id}`, fetchOrder);
    console.log(order);
    return (
        <>
            <div className='mt-8'>
                <div className='mx-24'>
                    {
                        order && 
                        <>
                            <div className='font-bold text-lg'>Detail Transaksi</div>
                            <div className='p-4 shadow mt-3 '>
                                <div className='flex text-sm items-center'>
                                    <div>ID Transaksi : <span className='font-bold'>{order?.id}</span></div>
                                    <div className="divider divider-horizontal mx-1"></div>
                                    {
                                        order?.status === 'belum dibayar' ?
                                        <div className="badge badge-warning badge-sm">Belum Dibayar</div>
                                        : null
                                    }
                                </div>
                            </div>
                        </>
                    }
                    {
                        error && <div>Something wrong happen</div>
                    }
                </div>
            </div>
        </>
    )
}
