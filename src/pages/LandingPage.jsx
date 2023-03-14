import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useOutletContext } from 'react-router-dom';
import LoadSpinner from '../components/LoadSpinner';
import rupiahFormat from '../utility/rupiahFormat';
import { Pagination, Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import useSWR from 'swr';

import Banner from '../components/Banner';
import CarouselCategories from '../components/CarouselCategories';
import CarouselNewArrival from '../components/CarouselNewArrival';

export default function LandingPage() {
    const { categories } = useOutletContext();
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
   
    const fetchNewProducts = async (url) => await axios.get(url).then((res) => res.data.data);
    const urlNewProducts = `${process.env.REACT_APP_API_HOST}/products/new`
    const { data: newProducts , error : errNewProducts} = useSWR(urlNewProducts,fetchNewProducts);
    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true)
                const res = await axios.get(`${process.env.REACT_APP_API_HOST}/products`);
                setProducts(res.data.data.products);
                // console.log(res.data.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        }
        getData();
    }, [])
  return (
    <>
        <LoadSpinner isLoading = {isLoading}/>
        <div className='mx-3 md:mx-14 pt-16'>
            <div className="mt-4 bg-base-100">
                        
            </div>
            <div className='mt-4'>
                <Swiper 
                    pagination={{ clickable: true }} 
                    modules={[Pagination, Autoplay]} 
                    autoplay={{
                        delay : 5000,
                        pauseOnMouseEnter : true,
                    }}
                    scrollbar={{ draggable: true }}
                    >
                    <SwiperSlide><Banner/></SwiperSlide>
                    <SwiperSlide><Banner/></SwiperSlide>
                    <SwiperSlide><Banner/></SwiperSlide>
                    <SwiperSlide><Banner/></SwiperSlide>
                    <SwiperSlide><Banner/></SwiperSlide>
                    <SwiperSlide><Banner/></SwiperSlide>
                    <SwiperSlide><Banner/></SwiperSlide>
                    <SwiperSlide><Banner/></SwiperSlide>
                    <SwiperSlide><Banner/></SwiperSlide>
                </Swiper>
            </div>
            <div className='mt-4  p-4 rounded-lg bg-base-100'>
                <div className='ml-2 font-bold text-base md:text-xl'>Kategori Produk</div>
                <div className="divider my-1"></div>
                <CarouselCategories/>
            </div>
            <div className='mt-4  p-4 rounded-lg bg-base-100'>
                <div className='ml-2 font-bold text-xl'>New Arrival</div>
                <div className="divider my-1"></div>
                <CarouselNewArrival newProducts={newProducts}/>
            </div>
           
            <div className='mt-4 bg-base-100 p-4 rounded'>
                <div className='flex justify-between items-center'>
                    <div className='ml-2 font-bold text-xl'>Semua Produk</div>
                    <div className='btn btn-outline btn-secondary font-bold md:px-8 normal-case btn-sm rounded mr-2'>Lihat Semua</div>
                </div>
                <div className="divider my-1 mb-4"></div>
                <div className='flex flex-wrap'>
                {
                    products ? products.map((data) => {
                        return (
                            <Link to={`/products/${data?.id}`}
                                className="card card-compact basis-5/12 lg:basis-[14%]  grow mx-2 mb-4 bg-base-100  rounded drop-shadow-lg" 
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
                                    <p className="  mt-1 h-11 font-bold  overflow-hidden text-base uppercase leading-tight text-ellipsis">{data?.name}</p>
                                    <div className='mt-auto'>
                                        <p className='font-bold opacity-90'>Rp{rupiahFormat(data?.sell_price)}</p>
                                        <div className='btn btn-success btn-sm text-base-100 normal-case rounded mt-2 w-full '>Beli</div>
                                    </div>
                                </div>
                            </Link>
                        )
                    }) : <div className='flex justify-center'> 
                            Belum ada produk
                    </div>
                }
                </div>
            </div>
        </div>
    </>
  )
}
