import axios from 'axios';
import React from 'react';
import useSWR from 'swr';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function MyOrders() {
  const fetchOrders = async (url) => await axios.get(url).then((res) => res.data.data);
  const { data : myorders, error } = useSWR(`${process.env.REACT_APP_API_HOST}/onOrders`, fetchOrders);
  return (
    <>
      <div className='mt-8'>
          <div className='mx-24'>
              <div className='font-bold text-lg'>Daftar Pesanan Saya</div>
              <div className=''>
                  {
                    myorders && 
                    myorders.map((data, idx) => {
                      return (
                        <div key={idx} className="my-2 shadow-lg p-4">
                            <div className='flex text-xs items-center'>
                                <div className=''>No Pesanan : <span className='font-bold'>{data?.id}</span></div>
                                <div className="divider divider-horizontal mx-1"></div>
                                <div>{moment(data?.createdAt).format('D MMMM YYYY, h:mm:ss a')}</div>
                            </div>
                            {data?.status === 'belum dibayar' ? 
                              <div className="badge badge-warning badge-sm">Belum Dibayar</div>
                              : null
                            }
                            <div className='flex'>
                              <figure className='w-16 h-16 bg-black mt-2'>
                                  <img src={`${data?.Products[0]?.url_img}`} className='object-cover' alt='gambar produk'/>
                              </figure>
                              <div className='grow flex flex-col ml-4 mt-4 text-xs'>
                                  <div className='font-bold text-sm'>{data?.Products[0]?.name}</div>
                                  <div className='opacity-70'>
                                    {`${data?.Products[0]?.On_orders_detail?.qty} barang x Rp${new Intl.NumberFormat(['ban', 'id']).format(
                                      data?.Products[0]?.On_orders_detail?.sum_price_each 
                                      / data?.Products[0]?.On_orders_detail?.qty )}`}
                                  </div>
                                  {
                                    data?.Products.length > 1 ?
                                    <div className='opacity-70 mt-3'>
                                      {`+${data?.Products.length - 1} produk lainnya`}
                                    </div>
                                    : null
                                  }
                              </div>
                              <div className='flex'>
                                  <div className="divider divider-horizontal"></div>
                                  <div className='flex flex-col'>
                                      <div className='text-sm opacity-70'>Total Belanja</div>
                                      <div className='font-bold'>{`Rp${new Intl.NumberFormat(['ban', 'id']).format(data?.amount)}`}</div>
                                  </div>
                              </div>
                            </div>
                            <div className='flex justify-end mt-2'>
                                  <Link 
                                  to={data?.id}
                                  className='btn btn-primary btn-outline btn-sm text-base-100 normal-case'>
                                  Lihat Detail Transaksi</Link>
                            </div>
                        </div>
                      )
                    })

                  }
              </div>
              {
                error && <div>Something error</div>
              }
          </div>
      </div>
    </>
  )
}
