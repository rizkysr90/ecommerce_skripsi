import React, { useState } from 'react'
import { faArrowAltCircleDown, faChevronCircleDown, faClose,faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShipAddress from './../components/ShipAddress';

export default function ModalSelectAddress(props) {
    // const [selectedAddress, setSelectedAddress] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
        {
            props.selectedAddress ? 
            <label 
                htmlFor='my-modal-6'
                onClick={() =>  setIsModalOpen((prev) => !prev)}
                className='flex flex-col bg-base-100 border-primary border p-3 w-full rounded mb-3'>
                <div className='text-sm font-bold'>Tujuan :</div>
                <div className="divider my-0"></div>
                <div className='flex justify-between items-center'>
                    <div className=''>
                        <div className='text-sm'>{props?.selectedAddress?.recipient_name}</div>
                        <div className='text-xs opacity-70'>
                            {`${props?.selectedAddress?.street}, ${props?.selectedAddress?.village}, ${props?.selectedAddress?.district}, ${props?.selectedAddress?.state}, ${props?.selectedAddress?.province}, ${props?.selectedAddress?.postal_code}`}
                        </div>
                    </div>
                    <div><FontAwesomeIcon icon={faChevronCircleDown}/></div>
                </div>

            </label>
            :
            <label htmlFor="my-modal-6" 
                className="btn btn-outline w-full btn-secondary normal-case"
                onClick={() =>  setIsModalOpen((prev) => !prev)}
                >
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2"
                />
                Pilih Alamat Pengiriman
            </label>
        }   
        
        <input type="checkbox" id="my-modal-6" className="modal-toggle" checked={isModalOpen} readOnly/>
        <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <div className='flex justify-end'>
                    <label htmlFor="my-modal-6" className="btn btn-ghost px-4 py-2 text-lg"
                        onClick={() => setIsModalOpen((prev) => !prev)}
                    >
                        <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                    </label>
                </div>
                <h3 className="font-bold text-lg text-center">Pilih Alamat Pengiriman</h3>
                {
                    props?.address?.map((data) => {
                        return (
                            <ShipAddress 
                            key={data.id}
                            address={data}
                            onSelected={props.onSelected}
                            close={setIsModalOpen}
                            validOrder={props.validOrder}
                            />
                        )
                    })
                }
            </div>
        </div>
    </>
  )
}
