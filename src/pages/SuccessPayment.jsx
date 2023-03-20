import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function SuccessPayment() {
  return (
    <div className='bg-base-200 mx-3 md:mx-20 mt-4 pt-20'>
        <div className='flex flex-col bg-base-100 rounded-lg px-3 py-8 items-center'>
            <FontAwesomeIcon icon={faCheckCircle} className="text-success text-6xl"/>
            <div className='font-bold mt-1'>Sukses mengirim resi pembayaran</div>
        </div>
    </div>
  )
}

export default SuccessPayment