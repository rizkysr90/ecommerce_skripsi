import React from 'react'

export default function ShipAddress({address, onSelected, isNoAction}) {
  return (
        
    <>
         <div className='text-sm my-4' key={address.id}>
              <div className='flex justify-between'>
                  {/* 1 */}
                  <div className="flex w-full">
                      <div className='font-bold '>{address.recipient_name}</div>
                      <div className="divider divider-horizontal mx-1"></div>
                      <div>{address.recipient_phone_number}</div>
                  </div>
                  {
                    isNoAction ? null :
                    <div className='text-info btn btn-ghost btn-xs normal-case'>
                            Ubah
                    </div>
                  }
              </div>
              <div className='flex'>
                  {/* 2 */}
                  <div className='grow-1'>
                          <div>{address.street}</div>
                          <div>{address.village}, {address.district}, {address.state}, {address.province}, {address.postal_code}</div>
                  </div>
              
              </div>
              {
                    isNoAction ? null :
                    <div className='mt-2 flex justify-end'>
                      <div className='btn btn-sm btn-primary normal-case'
                        onClick={() => onSelected(address)}
                      >Pilih</div>
                    </div>

              }
        </div>
    </>
  
  )
}
