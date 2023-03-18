import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import rupiahFormat from '../utility/rupiahFormat';
function Payment() {
    const location = useLocation();
    const [previewImg, setPreviewImg] = useState('');
    const handlePreviewImg = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setPreviewImg(e.target.files[0])
        }
    }
    return (
        <>
            <div className="mt-16 flex bg-info items-center w-full p-1 text-xs text-base-100 mt-4 text-left">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span className='ml-2'>Pastikan nominal transfer sesuai dengan jumlah pembelian.</span>
                    </div>
            <div className='bg-base-200 mx-3 md:mx-20 mt-4 '>
                <div className='flex flex-col bg-base-100 rounded-lg p-3 items-center'>
                    <div>Transaksi ID : {location.state?.orderId} </div>
                    <div className='font-bold text-lg'>Menunggu pembayaran</div>
                    <div className='text-4xl font-bold mt-3'>Rp{rupiahFormat(location.state?.amount)}</div>
                    <div className='mt-4'>
                        Transfer ke alamat berikut :
                    </div>
                    <div className='flex'>
                        BNI : 0909xxxx a.n Rizki Susilo Ramadhan
                    </div>
                    <div className='flex'>
                        Shopeepay : 081283902294 a.n Rizki Plastik
                    </div>
                    <div className='w-full'>
                        <label className='flex flex-col my-4' htmlFor='evidence_of_tf w-full'>
                            <span className='mb-2 text-success text-sm underline cursor-button'>Upload bukti transfer kamu disini</span>
                            <input type="file" 
                            id='evidence_of_tf'
                            onChange={handlePreviewImg}
                            accept="image/png, image/jpeg"
                            className="file-input file-input-bordered file-input-success w-full " />
                        </label>
                    </div>
                    {
                        previewImg && (
                            
                            <div className="indicator">
                                <span className="indicator-item cursor-pointer badge badge-error"
                                    onClick={() => setPreviewImg('')}
                                >
                                    <FontAwesomeIcon icon={faTrash} className="text-neutral"/>    
                                </span> 
                                <div className="avatar">
                                    <div className="w-24 rounded">
                                        <img src={URL.createObjectURL(previewImg)} alt="foto produk"/>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div className='btn btn-success normal-case text-base-100 w-full mb-3'>Kirim Bukti Transfer</div>
                </div>
            
            </div>
        </>
    )
}

export default Payment