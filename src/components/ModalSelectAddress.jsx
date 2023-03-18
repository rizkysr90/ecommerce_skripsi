import React, { useState } from 'react'
import { faClose,faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShipAddress from './../components/ShipAddress';

export default function ModalSelectAddress(props) {
    // const [selectedAddress, setSelectedAddress] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
        <label htmlFor="my-modal-6" 
            className="btn btn-outline w-full btn-secondary normal-case"
            onClick={() =>  setIsModalOpen((prev) => !prev)}
            >
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2"
            />
            Pilih Alamat Pengiriman
        </label>
        
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
                            />
                        )
                    })
                }
            </div>
        </div>
    </>
  )
}
