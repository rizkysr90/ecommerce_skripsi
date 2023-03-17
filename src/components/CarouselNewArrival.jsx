import React from 'react'
import { Link } from 'react-router-dom';
import { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import rupiahFormat from '../utility/rupiahFormat';

function CarouselNewArrival({newProducts}) {
    
  return (
    <>
        <Swiper 
            navigation={true}
            modules={[Navigation, Autoplay]} 
            slidesPerView={6}
            spaceBetween={5}
            autoplay={{
                delay : 5000,
                pauseOnMouseEnter : true,
                }}
            scrollbar={{ draggable: true }}
            className="mt-4 hidden md:block"
            >
            {
                newProducts?.map((data) => {
                    return (
                    <SwiperSlide className='' key={data.id}>
                            <Link to={`/products/${data?.id}`}
                                className="card card-compact basis-[14%] grow mx-2 mb-4 bg-base-100  rounded " 
                                key={data.id}>
                                <figure>
                                    <img src={data?.url_img} alt="Shoes"
                                        className='h-32 w-full object-cover rounded'
                                    />
                                </figure>
                                <div className="flex text-sm flex-col p-2">
                                    {
                                        data.stock < 1 ? 
                                        <div className="badge badge-sm badge-error gap-1 text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                            Stok Habis
                                        </div>
                                        : null
                                    }
                                    <p className=" mt-1 h-12 font-bold text-base uppercase leading-tight text-ellipsis">{data?.name}</p>
                                    <div className='mt-auto'>
                                        <p className='font-bold opacity-90'>Rp{rupiahFormat(data?.sell_price)}</p>
                                        <div className='btn btn-success btn-sm text-base-100 normal-case rounded mt-2 w-full '>Beli</div>
                                    </div>
                                </div>
                            </Link>
                    </SwiperSlide>
                    )
                })
            }
        </Swiper>
        <Swiper 
            modules={[Navigation, Autoplay]} 
            slidesPerView={2}
            spaceBetween={5}
            autoplay={{
                delay : 5000,
                pauseOnMouseEnter : true,
                }}
            scrollbar={{ draggable: true }}
            className="mt-4 block md:hidden"
            >
            {
                newProducts?.map((data) => {
                    return (
                    <SwiperSlide className='' key={data.id}>
                            <Link to={`/products/${data?.id}`}
                                className="card card-compact basis-[14%] grow mx-2 mb-4 bg-base-100  rounded" 
                                key={data.id}>
                                <figure>
                                    <img src={data?.url_img} alt="Shoes"
                                        className='h-32  w-full object-cover rounded'
                                    />
                                </figure>
                                <div className="flex text-sm flex-col p-2">
                                    {
                                        data.stock < 1 ? 
                                        <div className="badge badge-sm badge-error gap-1 text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                            Stok Habis
                                        </div>
                                        : null
                                    }
                                    <p className=" mt-1 h-11 font-bold  overflow-hidden text-base uppercase leading-tight text-ellipsis">{data?.name}</p>
                                    <div className='mt-auto'>
                                        <p className='font-bold opacity-90'>Rp{rupiahFormat(data?.sell_price)}</p>
                                        <div className='btn btn-success btn-sm text-base-100 normal-case rounded mt-2 w-full '>Beli</div>
                                    </div>
                                </div>
                            </Link>
                    </SwiperSlide>
                    )
                })
            }
        </Swiper>
    </>
  )
}

export default CarouselNewArrival