import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import LoadSpinner from '../components/LoadSpinner';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export default function ShippingAddress() {
    const [isLoading, setIsLoading] = useState(false);
    const [address, setAddress] = useState('');
    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(`${process.env.REACT_APP_API_HOST}/customers/address`)
                setAddress(res.data.data);
                console.log(res.data.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        }
        getData();

    }, [])
  return (
    <>
     <LoadSpinner isLoading={isLoading}/>    
      <div className=''>
            <div className='mt-4 mx-44 bg-base-100 rounded shadow py-4 px-8'>
                <div className='flex justify-between mt-4'>
                    <div className='text-lg font-bold'>Alamat Saya</div>
                    <Link 
                    className='btn btn-primary text-base-100 btn-sm normal-case'
                    to="/customers/address/new">
                        <FontAwesomeIcon icon={faPlusCircle} className="mr-2"></FontAwesomeIcon>
                        Tambah Alamat</Link>
                </div>
                <div className="divider"></div>
                {
                    address ? address.map((address => {
                        return (
                            <>
                            <div className='text-sm' key={address.id}>
                                <div className='flex justify-between'>
                                    {/* 1 */}
                                    <div className="flex w-full">
                                        <div className='font-bold '>{address.recipient_name}</div>
                                        <div className="divider divider-horizontal mx-1"></div>
                                        <div>{address.recipient_phone_number}</div>
                                    </div>
                                    <div className='text-info btn btn-ghost btn-xs normal-case'>
                                            Ubah
                                    </div>
                                </div>
                                <div className='flex'>
                                    {/* 2 */}
                                    <div className='grow-1'>
                                            <div>{address.street}</div>
                                            <div>{address.village}, {address.district}, {address.state}, {address.province}, {address.postal_code}</div>

                                    </div>
                                
                                </div>
                            </div>
                            <div className="divider"></div>
                            </>
                        )
                    }))
                    
                    : 
                    <div className='flex justify-center'>Belum ada data alamat pengiriman</div>
                }
            </div>

      </div>
    </>
  )
}
