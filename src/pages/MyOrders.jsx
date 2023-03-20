import axios from 'axios';
import React from 'react';
import useSWR from 'swr';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

moment.locale('id');

export default function MyOrders() {
  const fetchOrders = async (url) => await axios.get(url).then((res) => res.data.data);
  const { data : myorders, error } = useSWR(`${process.env.REACT_APP_API_HOST}/onOrders`, fetchOrders);
  console.log(myorders);
  return (
    <>
        <div className='pt-20 bg-base-200 mx-3 md:mx-20 '>
          <div className=' rounded p-3'>
              <div className='font-bold'>Daftar Pesanan Saya</div>
              <div className="divider my-1"></div>
              <div className=''>
                  {
                    myorders && 
                    myorders.map((data, idx) => {
                      return (
                        <div key={idx} className="my-3 p-4 bg-base-100 rounded-lg">
                            <div className='flex justify-between'>
                              <div className='text-xs items-center'>
                                  <div className=''>No Pesanan : <span className='font-bold'>{data?.id}</span></div>
                                  <div>
                                    <FontAwesomeIcon icon={faClock} className='opacity-70 mr-1'/>
                                    {moment(data?.createdAt).format('DD MMM YYYY, HH:mm')}
                                  </div>
                              </div>
                              <div className='flex flex-col items-end'>
                               
                                  {
                                      data?.status === 'belum dibayar' &&
                                      <div className="badge badge-success badge-outline badge-sm">Belum Dibayar</div>
                                  }
                                  {
                                      data?.status === 'dibayar' &&
                                      <div className='badge badge-success badge-outline badge-sm'>Menunggu verifikasi</div>
                                  }
                                    {
                                      data?.status === 'cod' &&
                                      <div className='badge badge-success badge-outline badge-sm'>Belum dibayar</div>
                                  }
                                <div className='flex'>
                                  <div className='badge badge-info badge-outline badge-sm mt-2'>{data?.pay_method}</div>
                                  <div className='badge badge-info badge-outline badge-sm ml-1 mt-2'>{data?.shipping_method}</div>
                                </div>

                              </div>
                            </div>
                            <div className="divider my-1"></div>
                            <div className='flex'>
                                <img src={`${data?.Products[0]?.url_img}`} 
                                className='object-cover h-14 rounded'
                                alt='gambar produk'/>
                              <div className='grow flex flex-col ml-4 text-xs'>
                                  <div className='font-bold text-sm'>{data?.Products[0]?.name}</div>
                                  <div className='opacity-70'>
                                    {`${data?.Products[0]?.On_orders_detail?.qty} x Rp${new Intl.NumberFormat(['ban', 'id']).format(
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
                            </div>
                            <div className='flex justify-between mt-2 items-center'>
                                <div className='font-bold text-lg'>{`Rp${new Intl.NumberFormat(['ban', 'id']).format(data?.amount)}`}</div>
                                <div className='flex justify-end'>
                                      <Link 
                                      to={data?.id}
                                      className='btn btn-secondary btn-outline btn-sm text-base-100 normal-case'>
                                      Lihat Detail Transaksi</Link>
                                </div>
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
