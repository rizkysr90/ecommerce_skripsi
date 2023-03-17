import React from 'react'
import { Link, useOutletContext } from 'react-router-dom';
import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

function CarouselCategories() {
    const { categories } = useOutletContext();

    return (
        <>
            <Swiper 
                pagination={{ clickable: true }} 
                modules={[Pagination, Autoplay]} 
                autoplay={{
                    delay : 5000,
                    pauseOnMouseEnter : true,
                }}
                scrollbar={{ draggable: true }}
                slidesPerView={12}
                spaceBetween={5}
                className="pb-10 mt-4 hidden md:block"
                >
                
                {
                    categories?.map((elm) => {
                        return (
                        <SwiperSlide className='flex justify-center items-center ' key={elm.id}>
                            <Link to={`/category/${elm.name}/${elm.id}`} 
                            className='rounded-full w-20 flex items-center justify-center h-20
                                        normal-case btn-outline btn btn-secondary bg-base-100 text-neutral
                                '>
                                    <span className='font-bold'>{elm.name}</span>
                            </Link>
                        </SwiperSlide>
                        )
                    })
                }
                
            </Swiper>
            <Swiper 
                pagination={{ clickable: true }} 
                modules={[Pagination, Autoplay]} 
                autoplay={{
                    delay : 5000,
                    pauseOnMouseEnter : true,
                }}
                scrollbar={{ draggable: true }}
                slidesPerView={4}
                spaceBetween={5}
                className="pb-10 mt-4 block md:hidden"
                >
                
                {
                    categories?.map((elm) => {
                        return (
                        <SwiperSlide className='flex justify-center items-center ' key={elm.id}>
                            <Link to={`/category/${elm.name}/${elm.id}`} 
                            className='rounded-full w-[60px] sm:w-[75px] flex items-center justify-center h-[60px] sm:h-[75px]
                                        normal-case btn-outline btn btn-secondary bg-base-100 text-neutral
                                '>
                                    <span className='font-bold'>{elm.name}</span>
                            </Link>
                        </SwiperSlide>
                        )
                    })
                }
                
            </Swiper>
        </>
    )
}

export default CarouselCategories